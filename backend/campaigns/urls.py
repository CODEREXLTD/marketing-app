from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from campaigns.views import CampaignCreateView, CampaignViewSet

router = routers.DefaultRouter()
router.register('campaign',CampaignViewSet)

urlpatterns = [
    # path('create/', CampaignCreateView.as_view(),name='create'),
    path('', include(router.urls)),
    # path('all/', CampaignsGetView.as_view(),name='get'),
]