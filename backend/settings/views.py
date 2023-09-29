import imp
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.conf import settings
from .models import SmtpSettings
from settings.serializers import SmtpSettingsSerializer
import logging
logger = logging.getLogger(__name__)
from settings.renderers import SettingsRenderer

# EmailViewSet
class SettingsViewSet(viewsets.ModelViewSet):
    queryset = SmtpSettings.objects.all()
    serializer_class = SmtpSettingsSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False)
    def get_smtp_settings_by_user(self, request, user_id=None):
        smtpSettings = SmtpSettings.objects.filter(user=user_id).first()
        if smtpSettings:
            serializer = SmtpSettingsSerializer(smtpSettings)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "SMTP settings not found for the user"}, status=status.HTTP_404_NOT_FOUND)

    def create(self, request, format=None):
        serializer = SmtpSettingsSerializer(data=request.data)
        if serializer.is_valid():
            smtp = serializer.save(user=request.user)
            response_data = {
                "host": smtp.host,
                "port": smtp.port,
                "host_user": smtp.host_user,
                "host_password": smtp.host_password,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_smtp_settings(user_id):
        smtpSettings = SmtpSettings.objects.filter(user=user_id).first()
        if smtpSettings:
            serializer = SmtpSettingsSerializer(smtpSettings)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "SMTP settings not found for the user"}, status=status.HTTP_404_NOT_FOUND)
    