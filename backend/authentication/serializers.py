from dataclasses import fields
from tkinter.ttk import Style
from rest_framework import serializers
from authentication.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(Style={'imput_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields=['email', 'firstName', 'lastName','password', 'confirmPassword']
        extra_kwargs = {
            'password': {'write_only':True}
        }
    
    def validate( self, attrs):
        password = attrs.get('password')
        confirmPassword = attrs.get('confirmPassword')
        if password != confirmPassword:
            raise serializers.ValidationError("Password and Confrim Password does not match")
        return attrs
    
    def create(self, validateData):
        return User.objects.create_user(**validateData)

