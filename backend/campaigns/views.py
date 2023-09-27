from django.shortcuts import render
from rest_framework import viewsets
from .models import Campaign, Sequence, SequenceEmailChannel
from .serializers import CampaignSerializer, SequenceSerializer, SequenceEmailChannelSerializer
from rest_framework.permissions import IsAuthenticated

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