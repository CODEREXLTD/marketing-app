from django.contrib import admin
from django.urls import include, path

from authentication.views import UserLoginView, UserRegistrationView, UserView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='register'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('profile/', UserView.as_view(),name='profile'),
]
