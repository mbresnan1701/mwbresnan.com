from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import BlogPost, Quote, Comment
from rest_framework import generics, viewsets
from .serializers import BlogSerializer
from django.core import serializers
from django.db.models import Max
from mwbresnan.contactcontroller import send_new_comment_message


def main_posts(req):
    return render(req, 'main/post.html')


def post_detail(req, url):
    try:
        BlogPost.objects.get(url=url)
        return render(req, 'main/post_detail.html')
    except BlogPost.DoesNotExist:
        return render(req, 'masters/404.html')


def not_found(req):
    return render(req, 'masters/404.html')


def recent(req):
    data = BlogPost.objects.all().order_by('-date')[:3]
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def get_post_count(req):
    data = BlogPost.objects.count()
    return HttpResponse(data)


def first_ten(req):
    data = BlogPost.objects.all().order_by('-date')[:10]
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def next_ten(req):
    start = int(req.GET.get('count', 1))
    data = BlogPost.objects.all().order_by('-date')[start:start + 10]
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def quote(req):
    random_quote = [Quote.objects.order_by('?').first()]
    quote = serializers.serialize("json", random_quote)
    return HttpResponse(quote)


def single(req, url):
    post = BlogPost.objects.get(url=url)
    post.get_tags()
    post = serializers.serialize("json", [post])
    return HttpResponse(post)


def get_comments(req, pk):
    selectedPost = get_object_or_404(BlogPost, pk=pk)
    data = Comment.objects.filter(post_id=selectedPost).order_by('-date')
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def add_comment(req, pk):
    selectedPost = get_object_or_404(BlogPost, pk=pk)
    send_new_comment_message(selectedPost.title)
    Comment.objects.create(post_id=selectedPost, name=req.POST['name'], text=req.POST['text'])
    return HttpResponse()
