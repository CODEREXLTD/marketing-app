from django.contrib import admin
from django.urls import include, path

from campaigns.views import (CampaignCreateView)

urlpatterns = [
    path('create/', CampaignCreateView.as_view(),name='create'),
    # path('all/', CampaignsGetView.as_view(),name='get'),
]
