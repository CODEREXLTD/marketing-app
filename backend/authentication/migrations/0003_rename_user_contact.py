# Generated by Django 4.0.10 on 2023-09-27 05:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('authentication', '0002_alter_user_created_at_alter_user_updated_at'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='Contact',
        ),
    ]
