from typing_extensions import Required
from rest_framework import serializers
from .models import Campaign, Sequence, SequenceEmailChannel
from django.db import connection
from rest_framework.response import Response
from rest_framework import status


# Serializer for the SequenceEmailChannel model
class SequenceEmailChannelSerializer(serializers.ModelSerializer):
    id = serializers.ImageField(required=False)
    class Meta:
        model = SequenceEmailChannel
        fields = '__all__'

# Serializer for the Sequence model
class SequenceSerializer(serializers.ModelSerializer):
    email_channels = SequenceEmailChannelSerializer(allow_null=True)
    id = serializers.ImageField(required=False)
    class Meta:
        model = Sequence
        fields = '__all__'


# Serializer for the Campaign model
class CampaignSerializer(serializers.ModelSerializer):
    sequences = SequenceSerializer( many=True, read_only=True, source='sequence_set' )
    class Meta:
        model = Campaign
        fields = '__all__'
    def create( self, validateData ):
        # sequences = validateData.pop('sequences')
        campaign  = Campaign.objects.create(**validateData)
        # if sequences:
        #     for sequence in sequences:
        #         Sequence.objects.create(**sequence, campaign=campaign)
        return campaign
    
    def update(self, instance, validateData):
        # sequences = validateData.pop('sequences')
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

# class CampaignsGetSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Campaign
#         fields=['name','description']