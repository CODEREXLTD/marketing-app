from django.shortcuts import render
from rest_framework import viewsets
from .models import Campaign, Sequence, SequenceEmailChannel
from campaigns.serializers import CampaignSerializer, SequenceSerializer, SequenceEmailChannelSerializer, CampaignCreateSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from campaigns.renderers import UserRenderer
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Associate the authenticated user with the task
        serializer.save(user=self.request.user)

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
    