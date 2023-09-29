from celery import shared_task

from django.utils import timezone

from .models import Campaign, Sequence, SequenceEmailChannel
from campaigns.serializers import (CampaignCreateSerializer,
                                   CampaignSerializer,
                                   SequenceEmailChannelSerializer,
                                   SequenceSerializer)
from django.core.mail import send_mass_mail
from django.core.mail import send_mail
from django.conf import settings
import logging
logger = logging.getLogger(__name__)

@shared_task
def schedule_campaigns():
    current_datetime = timezone.now()
    campaigns = Campaign.objects.filter(
        scheduled_at__lte=current_datetime,
    )

    campaigns = Campaign.objects.filter(scheduled_at__lte=current_datetime,status='running',isActive=True)
    serialized_campaigns = []
    for campaign in campaigns:
        serialized_campaign = CampaignSerializer(campaign).data
        sequences = campaign.sequence_set.all()
        serialized_sequences = []

        for sequence in sequences:
            serialized_sequence = SequenceSerializer(sequence).data
            try:
                channel = SequenceEmailChannel.objects.get(sequence=sequence)
                serialized_channel = SequenceEmailChannelSerializer(channel).data
                serialized_sequence['channel'] = serialized_channel
            except SequenceEmailChannel.DoesNotExist:
                pass

            serialized_sequences.append(serialized_sequence)

        serialized_campaign['sequences'] = serialized_sequences
        serialized_campaigns.append(serialized_campaign)
    
    for serialized_campaign in serialized_campaigns:
        
        for sequence in serialized_campaign['sequences']:
            if 'email' == sequence['type']:
                email_channel_data = sequence['channel']
                from_email = settings.EMAIL_HOST_USER
                recipient_list = ['nasim@coderex.co','shahin@coderex.co','sadi@coderex.co','tohin@coderex.co']
                logger.error(email_channel_data)
                formatted_data = (
                    email_channel_data['subject'],
                    email_channel_data['body'],
                    from_email,
                    recipient_list
                )
                try:
                    send_mass_mail( (formatted_data,) )
                    logger.error('sent successfully')
                except:
                    logger.error('fail')

        campaign_id = serialized_campaign['id']
        campaign = Campaign.objects.get(id=campaign_id)
        campaign.status = 'completed'  # Update to your desired status
        campaign.save()
    
    