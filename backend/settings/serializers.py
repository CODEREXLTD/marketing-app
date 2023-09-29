from typing_extensions import Required
from rest_framework import serializers
from .models import SmtpSettings
from django.db import connection
import logging
logger = logging.getLogger(__name__)

class SmtpSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmtpSettings
        fields = '__all__'
    def create( self, validateData ):
        user = validateData.get("user")
        # Check if an SMTP setting already exists for the user
        smtp_setting, created = SmtpSettings.objects.get_or_create(user=user)
        smtp_setting.host = validateData.get("host", smtp_setting.host)
        smtp_setting.port = validateData.get("port", smtp_setting.port)
        smtp_setting.host_user = validateData.get("host_user", smtp_setting.host_user)
        smtp_setting.host_password = validateData.get("host_password", smtp_setting.host_password)
        smtp_setting.created_at = validateData.get("created_at", smtp_setting.created_at)
        smtp_setting.updated_at = validateData.get("updated_at", smtp_setting.updated_at)
        smtp_setting.save()
        return smtp_setting

    def update(self, instance, validateData):
        instance.host = validateData.get("host", instance.host)
        instance.port = validateData.get("port", instance.port)
        instance.host_user = validateData.get("host_user", instance.host_user)
        instance.host_password = validateData.get("host_password", instance.host_password)
        instance.created_at = validateData.get("created_at", instance.created_at)
        instance.updated_at = validateData.get("updated_at", instance.updated_at)
        instance.user = validateData.get("user", instance.user)
        instance.save()
        return instance

