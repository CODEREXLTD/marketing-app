import imp
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.core.mail import send_mass_mail
from django.core.mail import send_mail
from django.core.mail import get_connection
from django.conf import settings
from settings.models import SmtpSettings
from settings.serializers import SmtpSettingsSerializer

import logging
logger = logging.getLogger(__name__)


# EmailViewSet
class EmailViewSet(viewsets.ModelViewSet):
    
    @action(detail=False)
    def send_mass_email(self, request):
        user_id = request.data.get('user_id', '')
        subject = request.data.get('subject', '')
        message = request.data.get('message', '')
        recipient_list = request.data.get('recipient_list', [])
        from_email = settings.EMAIL_HOST_USER
        formatted_data = (
            subject,
            message,
            from_email,
            recipient_list
        )
        smtpSettings = SmtpSettings.objects.get(user=user_id)
        if smtpSettings:
            try:
                connection = get_connection(
                    host=smtpSettings.host,
                    port=smtpSettings.port,
                    username=smtpSettings.host_user,
                    password=smtpSettings.host_password,
                    use_tls=True,
                )

                send_mass_mail( (formatted_data,), False, None)
                return Response({"message": "Sent successfully"}, status=status.HTTP_200_OK)
            except:
                return Response({"message": "Sending fail"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def send_email(self, request):
        user_id = request.data.get('user_id', '')
        subject = request.data.get('subject', '')
        message = request.data.get('message', '')
        recipient_list = request.data.get('recipient_list', '')
        from_email = settings.EMAIL_HOST_USER
        smtpSettings = SmtpSettings.objects.get(user=user_id)
        if smtpSettings:
            try:
                connection = get_connection(
                    host=smtpSettings.host,
                    port=smtpSettings.port,
                    username=smtpSettings.host_user,
                    password=smtpSettings.host_password,
                    use_tls=True,
                )
                logger.error(connection)
                send_mail( subject, message, from_email, [recipient_list], False, None)
                return Response({"message": "Sent successfully"}, status=status.HTTP_200_OK)
            except:
                return Response({"message": "Sending fail"}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_smtp_settings(user_id):
        smtpSettings = SmtpSettings.objects.get(user=user_id)
