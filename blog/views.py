from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
from .models import BlogPost
from rest_framework import generics, viewsets
from .serializers import BlogSerializer
from django.core import serializers
import json
# Create your views here.


def main_posts(req):
    return render(req, 'masters/post.html', {
                                          'posts': BlogPost.objects.all()
                                         })


def post_detail(req, pk):
    return render(req, 'masters/post.html', {
                                           'post': get_object_or_404(BlogPost, pk=pk)
                                           })


def recent(req):
    data = BlogPost.objects.all().order_by('-date')[:5]
    data = serializers.serialize("json", data)
    return HttpResponse(data)


def all(req):
    data = BlogPost.objects.all().order_by('-date')
    data = serializers.serialize("json", data)
    return HttpResponse(data)


class PostsData(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer

    # def get_queryset(self):
    #     return BlogPost.objects.get(pk=pk)
