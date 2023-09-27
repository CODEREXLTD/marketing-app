from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='resgister'),
]
