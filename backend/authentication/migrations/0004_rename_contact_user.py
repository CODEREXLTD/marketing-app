# Generated by Django 4.0.10 on 2023-09-27 05:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('authentication', '0003_rename_user_contact'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Contact',
            new_name='User',
        ),
    ]
