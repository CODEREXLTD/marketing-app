# Generated by Django 4.0.10 on 2023-09-27 07:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0007_alter_sequence_next_step'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sequenceemailchannel',
            name='sequence',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='campaigns.sequence'),
        ),
    ]
