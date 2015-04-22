# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('glue', '0002_auto_20150420_2348'),
    ]

    operations = [
        migrations.AddField(
            model_name='huddle',
            name='title',
            field=models.TextField(default=''),
        ),
    ]
