from django.urls import path, include
from django.contrib import admin
from authentication.views import UserRegistrationView, UserView, UserLoginView
from authentication.views import UserView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(),name='resgister'),
    path('login/', UserLoginView.as_view(),name='login'),
    path('users/', UserView.as_view(),name='getuser'),
]
