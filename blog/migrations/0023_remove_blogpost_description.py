# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-28 20:17
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0022_blogpost_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogpost',
            name='description',
        ),
    ]
