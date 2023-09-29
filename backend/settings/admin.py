from django.contrib import admin
from .models import SmtpSettings

class SmtpSettingsAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
    list_display = ('host', 'port', 'host_user','host_password')


# Register your models here.
admin.site.register(SmtpSettings, SmtpSettingsAdmin)
