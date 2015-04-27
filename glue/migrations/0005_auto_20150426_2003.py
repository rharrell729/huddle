# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('glue', '0004_huddle_end'),
    ]

    operations = [
        migrations.AlterField(
            model_name='huddle',
            name='recipients',
            field=models.ManyToManyField(related_name='recipients', blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='option',
            name='votes',
            field=models.ManyToManyField(related_name='votes', blank=True, to='glue.Vote'),
        ),
    ]
