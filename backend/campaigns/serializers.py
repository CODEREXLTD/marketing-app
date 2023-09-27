from rest_framework import serializers
from .models import Campaign, Sequence, SequenceEmailChannel
from django.db import connection
from rest_framework.response import Response
from rest_framework import status


# Serializer for the SequenceEmailChannel model
class SequenceEmailChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SequenceEmailChannel
        fields = '__all__'

# Serializer for the Sequence model
class SequenceSerializer(serializers.ModelSerializer):
    email_channels = SequenceEmailChannelSerializer(allow_null=True)

    class Meta:
        model = Sequence
        fields = '__all__'


# Serializer for the Campaign model
class CampaignSerializer(serializers.ModelSerializer):
    sequences = SequenceSerializer( many=True, read_only=True, source='sequence_set' )
    class Meta:
        model = Campaign
        fields = '__all__'

    def create( self, validated_data ):
        name        = 'YO YO'
        description = 'YO YO TES'
        # user = self.context['user']
        task        = Campaign.objects.create(name=name, description=description, user_id=1)
        return task
    