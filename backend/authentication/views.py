import imp
from urllib import request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from authentication.serializers import UserRegistrationSerializer


class UserRegistrationView(APIView):
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response({'msg': 'Registration successfull'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserView(APIView):
    def get(self, request, format=None):
        return Response({'msg': 'Fetch users successfully'}, status=status.HTTP_201_CREATED)