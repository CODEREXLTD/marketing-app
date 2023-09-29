from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

# Create your models here.
class SmtpSettings(models.Model):
    host        = models.CharField(max_length=100)
    port        = models.CharField(max_length=100)
    host_user   = models.CharField(max_length=100)
    host_password = models.CharField(max_length=100)
    user = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)