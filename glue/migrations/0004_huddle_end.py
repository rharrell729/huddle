# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.utils.timezone import utc
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('glue', '0003_huddle_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='huddle',
            name='end',
            field=models.TimeField(default=datetime.datetime(2015, 4, 21, 9, 16, 55, 976443, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
