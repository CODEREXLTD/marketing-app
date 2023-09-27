from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView, UserVerifyView, UserLoginView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('verify-token/', UserVerifyView.as_view(),name='verify'),
]
