from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import BlogPost, Quote, Comment
from rest_framework import generics, viewsets
from .serializers import BlogSerializer
from django.core import serializers
from django.db.models import Max, Count
from mwbresnan.contactcontroller import send_new_comment_message
import json


archive_dates = [['June', '06', '2016'], ['July', '07', '2016'],
                 ['August', '08', '2016'], ['September', '09', '2016'],
                 ['October', '10', '2016'], ['November', '11', '2016'],
                 ['December', '12', '2016'], ['January', '01', '2017'],
                 ['February', '02', '2017'], ['March', '03', '2017'],
                 ['April', '04', '2017'], ['May', '5', '2017'],
                 ['June', '6', '2017'], ['July', '7', '2017']]


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


def get_archive_dates(req):
    month_info = []
    for date_arr in archive_dates:
        num_entries = BlogPost.objects.filter(date__year=date_arr[2],
                                              date__month=date_arr[1]).count()
        month_info.append({'datestr': "{} {}".format(date_arr[0],
                                                     date_arr[2]),
                           'month': date_arr[1],
                           'year': date_arr[2],
                           'count': num_entries})
    return HttpResponse(json.dumps(month_info))


def all_posts(req):
    data = BlogPost.objects.all().order_by('-date')
    tag_data = {}
    for item in data:
        tags = serializers.serialize("json", item.tags.all())
        tag_data[item.pk] = json.loads(tags)
    data = serializers.serialize("json", data)
    data = json.loads(data)
    pkg_data = {
      'posts': data,
      'tags': tag_data
    }
    return HttpResponse(json.dumps(pkg_data))


def recent(req):
    data = BlogPost.objects.all().order_by('-date')[:3]
    tag_data = {}
    for item in data:
        tags = serializers.serialize("json", item.tags.all())
        tag_data[item.pk] = json.loads(tags)
    data = serializers.serialize("json", data)
    data = json.loads(data)
    pkg_data = {
      'posts': data,
      'tags': tag_data
    }

    return HttpResponse(json.dumps(pkg_data))


def get_post_count(req):
    data = BlogPost.objects.count()
    return HttpResponse(data)


def first_ten(req):
    data = BlogPost.objects.all().order_by('-date')[:10]
    tag_data = {}
    for item in data:
        tags = serializers.serialize("json", item.tags.all())
        tag_data[item.pk] = json.loads(tags)
    data = serializers.serialize("json", data)
    data = json.loads(data)
    pkg_data = {
      'posts': data,
      'tags': tag_data
    }

    return HttpResponse(json.dumps(pkg_data))


def next_ten(req):
    start = int(req.GET.get('count', 1))
    data = BlogPost.objects.all().order_by('-date')[start:start + 10]
    tag_data = {}
    for item in data:
        tags = serializers.serialize("json", item.tags.all())
        tag_data[item.pk] = json.loads(tags)
    data = serializers.serialize("json", data)
    data = json.loads(data)
    pkg_data = {
      'posts': data,
      'tags': tag_data
    }

    return HttpResponse(json.dumps(pkg_data))


def quote(req):
    random_quote = [Quote.objects.order_by('?').first()]
    quote = serializers.serialize("json", random_quote)
    return HttpResponse(quote)


def single(req, url):
    post = BlogPost.objects.get(url=url)
    post.get_tags()
    post = serializers.serialize("json", [post])
    return HttpResponse(post)


def get_tag_posts(req, tag):
    posts = BlogPost.objects.filter(tags__name__in=[tag])
    posts = serializers.serialize("json", posts)
    return HttpResponse(posts)


# def get_comments(req, pk):
#     selectedPost = get_object_or_404(BlogPost, pk=pk)
#     data = Comment.objects.filter(post_id=selectedPost).order_by('-date')
#     data = serializers.serialize("json", data)
#     return HttpResponse(data)


# def add_comment(req, pk):
#     selectedPost = get_object_or_404(BlogPost, pk=pk)
#     send_new_comment_message(selectedPost.title)
#     Comment.objects.create(post_id=selectedPost, name=req.POST['name'], text=req.POST['text'])
#     return HttpResponse()
