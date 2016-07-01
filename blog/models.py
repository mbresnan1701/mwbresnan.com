from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from taggit.managers import TaggableManager
import datetime, re


def get_date_string():
    return datetime.datetime.now().strftime('%B %d, %Y')


def get_date_string_long():
    return datetime.datetime.now().strftime('%B %d, %Y %-I:%M %p PST')


class BlogPost(models.Model):

    title = models.CharField(max_length=255, null=True, blank=True)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    url = models.CharField(max_length=127, unique=True)
    description = models.TextField(null=True, blank=True)
    tags = TaggableManager()
    text = RichTextField(null=True, blank=True)
    date = models.DateTimeField()
    datestr = models.CharField(max_length=127)
    updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.id:
            self.date = timezone.now()
            self.datestr = get_date_string_long()
        return super(BlogPost, self).save(*args, **kwargs)

    def get_tags(self):
        return self.tags.all()


class Comment(models.Model):

    post_id = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    name = models.CharField(max_length=64, default="Anonymous")
    text = models.TextField(null=True, blank=True)
    date = models.DateTimeField()
    datestr = models.CharField(max_length=127)

    def __str__(self):
        return "{}-{}".format(self.post_id, self.text)

    def save(self, *args, **kwargs):
        if not self.id:
            self.date = timezone.now()
            self.datestr = get_date_string_long()
        return super(Comment, self).save(*args, **kwargs)


class Quote(models.Model):

    quote = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=127, null=True, blank=True)

    def __str__(self):
        return self.quote


class Limit(models.Model):
    count = models.IntegerField(default=0)
