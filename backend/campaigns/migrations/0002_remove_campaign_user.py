# Generated by Django 4.0.10 on 2023-09-28 03:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='campaign',
            name='user',
        ),
    ]
