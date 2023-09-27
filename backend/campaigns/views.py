from django.shortcuts import render
from rest_framework import viewsets
from .models import Campaign, Sequence, SequenceEmailChannel
from .serializers import CampaignSerializer, SequenceSerializer, SequenceEmailChannelSerializer

# Create your views here.

class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class SequenceViewSet(viewsets.ModelViewSet):
    queryset = Sequence.objects.all()
    serializer_class = SequenceSerializer

class SequenceEmailChannelViewSet(viewsets.ModelViewSet):
    queryset = SequenceEmailChannel.objects.all()
    serializer_class = SequenceEmailChannelSerializer