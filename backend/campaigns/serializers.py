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
    class Meta:
        model = SequenceEmailChannel
        fields = '__all__'

    def create( self, validateData ):
        sequenceEmailChannel  = SequenceEmailChannel.objects.create(**validateData)
        return sequenceEmailChannel

    def update(self, instance, validated_data):
        # Update the fields of the existing sequenceEmailChannel instance with the new data
        instance.subject = validated_data.get("subject", instance.subject)
        instance.preview_text = validated_data.get("preview_text", instance.preview_text)
        instance.body = validated_data.get("body", instance.body)
        instance.save()
        return instance

# Serializer for the Sequence model
class SequenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sequence
        fields = '__all__'

    def create( self, validateData ):
        sequence  = Sequence.objects.create(**validateData)
        return sequence

    def update(self, instance, validated_data):
        # Update the fields of the existing Sequence instance with the new data
        instance.step_id = validated_data.get("step_id", instance.step_id)
        instance.data = validated_data.get("data", instance.data)
        instance.delay = validated_data.get("delay", instance.delay)
        instance.next_step = validated_data.get("next_step", instance.next_step)
        instance.type = validated_data.get("type", instance.type)
        instance.save()
        return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['channel'] = SequenceEmailChannelSerializer(instance.sequenceemailchannel).data
        return data

class CampaignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = '__all__'
    def create( self, validateData ):
        campaign  = Campaign.objects.create(**validateData)
        return campaign
        
    def update(self, instance, validateData):
        instance.name = validateData.get("name", instance.name)
        instance.description = validateData.get("description", instance.name)
        instance.status = validateData.get("status", instance.status)
        instance.isActive = validateData.get("isActive", instance.isActive)
        instance.scheduled_at = validateData.get("scheduled_at", instance.scheduled_at)
        instance.created_at = validateData.get("created_at", instance.created_at)
        instance.updated_at = validateData.get("updated_at", instance.updated_at)
        instance.user = validateData.get("user", instance.user)
        instance.save()
        return instance
class CampaignCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields='__all__'
        
    def create(self, validateData):
        return Campaign.objects.create_campaign(**validateData)
