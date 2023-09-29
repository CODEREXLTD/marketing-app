from django.contrib import admin
from django.urls import include, path

from sendEmail.views import (EmailViewSet)
from rest_framework import routers


urlpatterns = [
    path('emails/send/', EmailViewSet.as_view({'post': 'send_mass_email'}), name='send_mass_email'),
    path('email/send/', EmailViewSet.as_view({'post': 'send_email'}), name='send_email'),
]
