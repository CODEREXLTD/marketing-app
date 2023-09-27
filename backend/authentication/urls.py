from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView, UserVerify, UserLoginView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('verify-token/', UserVerify.as_view(),name='profile'),
]
