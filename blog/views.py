from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from .models import BlogPost, Quote
from rest_framework import generics, viewsets
from .serializers import BlogSerializer
from django.core import serializers
from django.db.models import Max
import random


def main_posts(req):
    return render(req, 'main/post.html')


def post_detail(req, pk):
    try:
        BlogPost.objects.get(pk=pk)
        return render(req, 'main/post.html')
    except BlogPost.DoesNotExist:
        return render(req, 'masters/404.html')


def not_found(req):
    return render(req, 'masters/404.html')


def recent(req):
    data = BlogPost.objects.all().order_by('-date')[:5]
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def all(req):
    data = BlogPost.objects.all().order_by('-date')
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def quote(req):
    random_quote = [Quote.objects.order_by('?').first()]
    quote = serializers.serialize("json", random_quote)
    return HttpResponse(quote)


def single(req, pk):
    post = BlogPost.objects.get(pk=pk)
    post = serializers.serialize("json", [post])
    return HttpResponse(post)


class PostsData(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer

    # def get_queryset(self):
    #     return BlogPost.objects.get(pk=pk)
