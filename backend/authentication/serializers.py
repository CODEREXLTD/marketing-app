from rest_framework import serializers
from authentication.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(style={'imput_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields=['email','password', 'confirmPassword']
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

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['email','password']
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

