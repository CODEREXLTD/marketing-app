from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView
from authentication.views import UserView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='resgister'),
    path('users/', UserView.as_view(),name='getuser'),
]
