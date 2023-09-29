from django.contrib import admin
from django.urls import include, path

from settings.views import (SettingsViewSet)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'settings',SettingsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('settings/user/<int:user_id>/', SettingsViewSet.as_view({'get': 'get_smtp_settings_by_user'}), name='get_smtp_settings_by_user'),
]
