import email
import imp
from urllib import request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from authentication.serializers import UserRegistrationSerializer
from authentication.serializers import UserLoginSerializer
from authentication.serializers import UserVerifySerializer
from authentication.renderers import UserRenderer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

#Generate token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    rednerer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'token': token, 'msg': 'Registration successfull'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserVerifyView(APIView):
    rednerer_class = [UserRenderer]
    permission_class = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserVerifySerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserLoginView(APIView):
    rednerer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get("email")
            password = serializer.data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token,'msg': 'Login successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': {'non_field_errors' : ['Email or password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        