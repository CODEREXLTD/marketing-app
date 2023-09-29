# Generated by Django 4.0.10 on 2023-09-29 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='status',
            field=models.CharField(choices=[('draft', 'Draft'), ('published', 'Published'), ('completed', 'Completed'), ('scheduled', 'Scheduled'), ('running', 'Running')], default='draft', max_length=20),
        ),
    ]
