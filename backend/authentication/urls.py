from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView, UserView, UserLoginView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserView.as_view(),name='profile'),
]
