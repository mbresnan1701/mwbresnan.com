# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-28 18:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0019_blogpost_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='url',
            field=models.CharField(max_length=127, unique=True),
        ),
    ]