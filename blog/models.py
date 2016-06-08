from django.db import models
import datetime


class BlogPost(models.Model):

    def get_date_string():
        return datetime.datetime.now().strftime('%B %d, %Y')

    title = models.CharField(max_length=255, null=True, blank=True)
    subtitle = models.CharField(max_length=255, null=True, blank=True)
    text = models.TextField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    datestr = models.CharField(max_length=127, default=get_date_string())
    updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title


class Quote(models.Model):

    quote = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=127, null=True, blank=True)

    def __str__(self):
        return self.quote
