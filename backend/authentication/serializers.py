from rest_framework import serializers
from authentication.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields=['email', 'firstName', 'lastName','password', 'confirmPassword']
    
    def validate( self, attrs):
        password = attrs.get('password')
        confirmPassword = attrs.get('confirmPassword')
        if password != confirmPassword:
            raise serializers.ValidationError("Password and Confrim Password does not match")
        return attrs
    
    def create(self, validateData):
        return User.objects.create_user(**validateData)

