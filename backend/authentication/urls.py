from django.contrib import admin
from django.urls import include, path

from authentication.views import UserRegistrationView, UserView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='resgister'),
    path('users/', UserView.as_view(),name='getuser'),
]
