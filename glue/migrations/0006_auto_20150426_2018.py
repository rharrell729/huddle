# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('glue', '0005_auto_20150426_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='huddle',
            name='options',
            field=models.ManyToManyField(to='glue.Option', blank=True, related_name='options'),
        ),
    ]
