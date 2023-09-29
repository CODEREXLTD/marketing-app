from celery import shared_task
from celery.utils.log import get_task_logger
from django.utils import timezone

from .models import Campaign

logger = get_task_logger(__name__)

@shared_task
def schedule_campaigns():
    # current_datetime = timezone.now()
    # campaigns = Campaign.objects.filter(
    #     scheduled_at__lte=current_datetime,
    #     published=False
    # )
    logger.info("The sample task just ran.")