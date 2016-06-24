from django.db import models
from django.conf import settings
import datetime
from ckeditor.fields import RichTextField


def get_date_string():
    return datetime.datetime.now().strftime('%B %d, %Y')


def get_date_string_long():
    return datetime.datetime.now().strftime('%B %d, %Y %-I:%M %p PST')


class BlogPost(models.Model):

    title = models.CharField(max_length=255, null=True, blank=True)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    text = RichTextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    datestr = models.CharField(max_length=127, default=get_date_string())
    updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):

    post_id = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, null=True, blank=True, default="Anonymous")
    text = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    datestr = models.CharField(max_length=127, default=get_date_string_long())

    def __str__(self):
        return "{}-{}".format(self.post_id, self.text)


class Quote(models.Model):

    quote = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=127, null=True, blank=True)

    def __str__(self):
        return self.quote


class Limit(models.Model):
    count = models.IntegerField(default=0)
