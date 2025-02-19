# Generated by Django 4.2.18 on 2025-02-19 18:45

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('blockly', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blocklyproject',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blocklyproject',
            name='project_data',
            field=models.JSONField(default=datetime.datetime(2025, 2, 19, 18, 45, 28, 720486, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='blocklyproject',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='blocklyproject',
            name='user',
            field=models.ForeignKey(default=datetime.datetime(2025, 2, 19, 18, 45, 51, 86333, tzinfo=datetime.timezone.utc), on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
