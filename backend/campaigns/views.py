import logging

from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from campaigns.renderers import UserRenderer
from campaigns.serializers import (CampaignCreateSerializer,
                                   CampaignSerializer,
                                   SequenceEmailChannelSerializer,
                                   SequenceSerializer)

from .models import Campaign, Sequence, SequenceEmailChannel

logger = logging.getLogger(__name__)
# Create your views here.

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]
    
    # Inside your CampaignViewSet class
    @action(detail=False)
    def all(self, request):
        # Retrieve all campaigns with their associated sequences and channels
        campaigns = Campaign.objects.all()
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

        return Response(serialized_campaigns, status=status.HTTP_200_OK)

    # Inside your CampaignViewSet class
    @action(detail=False)
    def get_campaigns_by_user(self, request, user_id=None):
        # Retrieve all campaigns with their associated sequences and channels
        campaigns = Campaign.objects.filter(user=user_id)
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

        return Response(serialized_campaigns, status=status.HTTP_200_OK)

    # Inside your CampaignViewSet class
    @action(detail=False)
    def get_specific_campaign_by_user(self, request, user_id=None, pk=None):
        # Retrieve all campaigns with their associated sequences and channels
        campaigns = Campaign.objects.filter(id=pk, user=user_id)
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

        return Response(serialized_campaigns, status=status.HTTP_200_OK)

    def create(self, request, format=None):
        # Create a CampaignSerializer instance with request data
        serializer = CampaignSerializer(data=request.data)
        # Check if the data is valid
        if serializer.is_valid():
            # Save the serializer to create a Campaign and associated Sequences
            campaign = serializer.save(user=request.user)
            sequences_data = request.data.get('sequences', [])
            serialized_sequences = []

            for sequence_data in sequences_data:
                sequence_data['campaign'] = campaign.id 
                sequence_serializer = SequenceSerializer(data=sequence_data)
                if sequence_serializer.is_valid():
                    sequence = sequence_serializer.save()

                    # Check if "channel" data is provided in the sequence_data
                    channel_data = sequence_data.get('channel')
                    if channel_data:
                        # Create a SequenceEmailChannel instance associated with the sequence
                        channel_data['sequence'] = sequence.id
                        channel_serializer = SequenceEmailChannelSerializer(data=channel_data)
                        if channel_serializer.is_valid():
                            channel = channel_serializer.save()
                            # Include channel_id in channel_data
                            channel_data['id'] = channel.id
                        else:
                            return Response(channel_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

                    # Serialize the sequence data with the associated channel data
                    serialized_sequence = SequenceSerializer(sequence).data
                    if channel_data:
                        serialized_sequence['channel'] = channel_data

                    serialized_sequences.append(serialized_sequence)
                else:
                    return Response(sequence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            # Serialize the campaign data with the associated sequences (including channels) in the desired format
            response_data = {
                "sequences": serialized_sequences,
                "name": serializer.data["name"],
                "description": serializer.data["description"],
                "status": serializer.data["status"],
                "isActive": serializer.data["isActive"],
                "scheduled_at": serializer.data["scheduled_at"],
                "user": serializer.data["user"],
                "id": campaign.id,
                "created_at": campaign.created_at,
                "updated_at": campaign.updated_at,
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        try:
            # Retrieve the campaign instance by ID
            campaign = Campaign.objects.get(id=pk)
        except Campaign.DoesNotExist:
            return Response({"error": "Campaign not found"}, status=status.HTTP_404_NOT_FOUND)

        # Deserialize the JSON data into the campaign instance
        serializer = CampaignSerializer(campaign, data=request.data)

        if serializer.is_valid():
            serializer.save()

            # Extract sequences data from the request data
            sequences_data = request.data.get('sequences', [])

            # Get the existing sequences associated with the campaign
            existing_sequences = campaign.sequence_set.all()

            # Create a set of existing sequence IDs
            existing_sequence_ids = set(sequence.id for sequence in existing_sequences)
            updated_sequences = []
            for sequence_data in sequences_data:
                sequence_id = sequence_data.get('id')  # Assuming you have an 'id' field in Sequence model
                if sequence_id:
                    # If sequence_id is provided, update the existing sequence
                    sequence = Sequence.objects.get(id=sequence_id)
                    sequence_serializer = SequenceSerializer(sequence, data=sequence_data)
                else:
                    # If no sequence_id is provided, create a new sequence
                    sequence_data['campaign'] = campaign.id  # Associate with the campaign
                    sequence_serializer = SequenceSerializer(data=sequence_data)

                if sequence_serializer.is_valid():
                    sequence_serializer.save()
                    sequence = sequence_serializer.instance 
                    if sequence_id:
                        # Mark this existing sequence as not to be deleted
                        existing_sequence_ids.discard(sequence_id)
                else:
                    return Response(sequence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                # # Check if "channel" data is provided in the sequence_data
                channel_data = sequence_data.get('channel')

                if channel_data:
                    channel_id = channel_data.get('id')
                    # Retrieve the associated SequenceEmailChannel instance (if it exists)
                    try:
                        channel = SequenceEmailChannel.objects.get(sequence=sequence)
                    except SequenceEmailChannel.DoesNotExist:
                        channel = None
                    
                    if channel:
                        # Update the existing SequenceEmailChannel instance
                        channel_serializer = SequenceEmailChannelSerializer(channel, data=channel_data)
                    else:
                        # Create a new SequenceEmailChannel instance
                        channel_data['sequence'] = sequence.id
                        channel_serializer = SequenceEmailChannelSerializer(data=channel_data)

                    
                    if channel_serializer.is_valid():
                        channel_serializer.save()
                    else:
                        return Response(channel_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Delete sequences that were not included in the request data
            Sequence.objects.filter(id__in=existing_sequence_ids).delete()

            # Serialize the campaign and its associated sequences in the desired format
            response_data = {
                "sequences": SequenceSerializer(campaign.sequence_set.all(), many=True).data,
                "name": serializer.data["name"],
                "description": serializer.data["description"],
                "status": serializer.data["status"],
                "isActive": serializer.data["isActive"],
                "scheduled_at": serializer.data["scheduled_at"],
                "user": serializer.data["user"]
            }
            return Response(response_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            # Retrieve the campaign instance by ID
            campaign = Campaign.objects.get(id=pk)
        except Campaign.DoesNotExist:
            return Response({"error": "Campaign not found"}, status=status.HTTP_404_NOT_FOUND)

        # Delete the campaign
        campaign.delete()

        return Response({"message": "Campaign deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    

class SequenceViewSet(viewsets.ModelViewSet):
    queryset = Sequence.objects.all()
    serializer_class = SequenceSerializer

class SequenceEmailChannelViewSet(viewsets.ModelViewSet):
    queryset = SequenceEmailChannel.objects.all()
    serializer_class = SequenceEmailChannelSerializer


class CampaignCreateView(APIView):
    rednerer_class = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = CampaignCreateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Campaign created successfull'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# class CampaignsGetView(APIView):
#     rednerer_class = [UserRenderer]
#     permission_classes = [IsAuthenticated]
#     def get(self, request, format=None):
#         serializer = CampaignsGetSerializer(request.ca)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    