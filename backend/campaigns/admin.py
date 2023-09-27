from django.contrib import admin
from .models import Campaign

# for test purpose. It will be removed
from .models import Sequence, SequenceEmailChannel


class SequenceInline(admin.TabularInline):
    model = Sequence
    extra = 0


class CampaignAdmin(admin.ModelAdmin):
    inlines = [SequenceInline]
    readonly_fields = ("created_at", "updated_at")
    list_display = ('name', 'status', 'isActive')


# Register your models here.
admin.site.register(Campaign, CampaignAdmin)
