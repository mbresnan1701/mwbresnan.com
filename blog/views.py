from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import BlogPost
# Create your views here.


def all_posts(req):
    return render(req, 'blog/index.html', {
                                          'posts': BlogPost.objects.all()
                                         })


def post(req, pk):
    return render(req, 'blog/detail.html', {
                                           'post': get_object_or_404(BlogPost, pk=pk)
                                           })
