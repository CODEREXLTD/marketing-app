from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from campaigns.views import CampaignCreateView, CampaignViewSet

router = routers.DefaultRouter()
router.register(r'campaigns',CampaignViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('campaigns/user/<int:user_id>/', CampaignViewSet.as_view({'get': 'get_campaigns_by_user'}), name='get_campaigns_by_user'),
    path('campaigns/<int:user_id>/<int:pk>/', CampaignViewSet.as_view({'get': 'get_specific_campaign_by_user'}), name='get_specific_campaign_by_user'),
]
