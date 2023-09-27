from django.db import models

# Campaign model
class Campaign(models.Model):
   STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('completed', 'Completed'),
   )
   name         = models.CharField(max_length=100)
   description  = models.TextField()
   status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',  # You can set a default value if needed
   )
   isActive     = models.BooleanField(default=False)
   user         = models.ForeignKey('auth.User', on_delete=models.CASCADE)
   scheduled_at = models.DateTimeField(null=True, blank=True)
   created_at   = models.DateTimeField(auto_now_add=True)
   updated_at   = models.DateTimeField(auto_now=True)

   def _str_(self):
     return self.name
   


# Sequence model
class Sequence(models.Model):
   campaign     = models.ForeignKey(Campaign, on_delete=models.CASCADE)
   step_id      = models.CharField(max_length=20)
   data         = models.TextField(null=True, blank=True)
   delay        = models.PositiveIntegerField(default=0)
   next_step    = models.CharField(max_length=20, null=True, blank=True)
   type         = models.CharField(max_length=20)
   created_at   = models.DateTimeField(auto_now_add=True)
   updated_at   = models.DateTimeField(auto_now=True)



# Sequence email channel model
class SequenceEmailChannel(models.Model):
   sequence     = models.OneToOneField(Sequence, on_delete=models.CASCADE)
   subject      = models.CharField(max_length=100)
   preview_text = models.CharField(max_length=100)
   body         = models.TextField(null=True, blank=True)
   created_at   = models.DateTimeField(auto_now_add=True)
   updated_at   = models.DateTimeField(auto_now=True)
   