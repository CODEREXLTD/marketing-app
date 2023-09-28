from django.shortcuts import render
from rest_framework import viewsets
from .models import Campaign, Sequence, SequenceEmailChannel
from campaigns.serializers import CampaignSerializer, SequenceSerializer, SequenceEmailChannelSerializer, CampaignCreateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from campaigns.renderers import UserRenderer
from rest_framework.response import Response
from rest_framework import status
import logging
logger = logging.getLogger(__name__)
# Create your views here.

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    permission_classes = [IsAuthenticated]
    def create(self, request, format=None):
        # Create a CampaignSerializer instance with request data
        serializer = CampaignSerializer(data=request.data)
        # Check if the data is valid
        if serializer.is_valid():
            # Save the serializer to create a Campaign and associated Sequences
            campaign = serializer.save(user=request.user)
            sequences_data = request.data.get('sequences', [])

            for sequence_data in sequences_data:
                sequence_data['campaign'] = campaign.id 
                sequence_serializer = SequenceSerializer(data=sequence_data)
                if sequence_serializer.is_valid():
                    sequence_serializer.save()
                else:
                     return Response(sequence_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
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
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    