from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from authentication.views import (UserLoginView, UserRegistrationView,
                                  UserVerifyView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('verify-token/', UserVerifyView.as_view(),name='verify'),
    path('refresh-token/', UserVerifyView.as_view(), name='refresh'),
]
