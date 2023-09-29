import email
import imp
from urllib import request

from django.contrib.auth import authenticate
from django.http import HttpRequest
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

from authentication.renderers import UserRenderer
from authentication.serializers import (UserLoginSerializer,
                                        UserRegistrationSerializer,
                                        UserVerifySerializer)


#Generate token
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'token': str(refresh.access_token),
        'refreshToken': str(refresh),
    }

class UserRegistrationView(APIView):
    rednerer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserVerifyView(APIView):
    rednerer_class = [UserRenderer]
    permission_class = [IsAuthenticated]

    def get(self, request, format=None):
        serializer = UserVerifySerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        refresh_token = request.data.get('refresh')
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        # refresh_request = HttpRequest()
        # refresh_request.method = 'POST'
        # refresh_request._body = request.body
        # # Custom view to refresh an access token using a valid refresh token
        # refresh_view = TokenRefreshView.as_view()
        # response = refresh_view(refresh_request)
        
        # if response.status_code == status.HTTP_200_OK:
        #     return Response({
        #         'token': response.data['access'],
        #         'refreshToken': response.data['refresh']
        #     })
        
        return Response({"token": access_token}, status=status.HTTP_200_OK)
    

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
                return Response(token, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': {'non_field_errors' : ['Email or password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        
