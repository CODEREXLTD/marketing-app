from typing_extensions import Required
from rest_framework import serializers
from .models import Campaign, Sequence, SequenceEmailChannel
from django.db import connection
from rest_framework.response import Response
from rest_framework import status
import logging
logger = logging.getLogger(__name__)

# Serializer for the SequenceEmailChannel model
class SequenceEmailChannelSerializer(serializers.ModelSerializer):
    id = serializers.ImageField(required=False)
    class Meta:
        model = SequenceEmailChannel
        fields = '__all__'

# Serializer for the Sequence model
class SequenceSerializer(serializers.ModelSerializer):
    # email_channels = SequenceEmailChannelSerializer(allow_null=True)
    class Meta:
        model = Sequence
        fields = '__all__'

    def create( self, validateData ):
        sequence  = Sequence.objects.create(**validateData)
        return sequence

# Serializer for the Campaign model
class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'
    def create( self, validateData ):
        campaign  = Campaign.objects.create(**validateData)
        return campaign
        
    def update(self, instance, validateData):
        # sequences = validateData.pop('sequences',None)
        instance.name = validateData.get("name", instance.name)
        instance.description = validateData.get("description", instance.name)
        instance.status = validateData.get("status", instance.status)
        instance.isActive = validateData.get("isActive", instance.isActive)
        instance.scheduled_at = validateData.get("scheduled_at", instance.scheduled_at)
        instance.created_at = validateData.get("created_at", instance.created_at)
        instance.updated_at = validateData.get("updated_at", instance.updated_at)
        instance.user = validateData.get("user", instance.user)
        instance.save()
        # keep_sequences = [];
        # exisitng_ids = [s.id for s in instance.sequences];
        # for sequence in sequences:
        #     if "id" in sequence.key:
        #         if Sequence.objects.filter(id=sequence["id"]).exists():
        #             s = Sequence.objects.get(id=sequence["id"])
        #             s.step_id = sequence.get('step_id', s.step_id)
        #             s.data = sequence.get('data', s.data)
        #             s.delay = sequence.get('delay', s.delay)
        #             s.next_step = sequence.get('next_step', s.next_step)
        #             s.type = sequence.get('next_step', s.type)
        #             s.save()
        #             keep_sequences.append(s.id)
        #         else:
        #             s = Sequence.objects.create(**sequence, campaign=instance)
        #             keep_sequences.append(s.id)
        
        # for sequence in instance.sequences:
        #     if sequence.id not in keep_sequences:
        #         sequence.delete()
        return instance


class CampaignCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields='__all__'
        
    def create(self, validateData):
        return Campaign.objects.create_campaign(**validateData)

# class CampaignsGetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Campaign
#         fields=['name','description']