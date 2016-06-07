from django.db import models


class BlogPost(models.Model):

    title = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title


class Comment(models.Model):
    name = models.CharField(max_length=255)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
