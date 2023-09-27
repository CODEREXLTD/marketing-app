import email
import imp
from urllib import request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from authentication.serializers import UserRegistrationSerializer
from authentication.serializers import UserLoginSerializer
from authentication.renderers import UserRenderer
from django.contrib.auth import authenticate


class UserRegistrationView(APIView):
    rednerer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({'msg': 'Registration successfull'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):
    def get(self, request, format=None):
        return Response({'msg': 'Fetch users successfully'}, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    rednerer_class = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get("email")
            password = serializer.data.get("password")
            user = authenticate(email=email, password=password)
            if user is not None:
                return Response({'msg': 'Login successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': {'non_field_errors' : ['Email or password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        