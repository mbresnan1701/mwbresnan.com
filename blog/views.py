from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import BlogPost
from rest_framework import generics
from .serializers import BlogSerializer
# Create your views here.


def all_posts(req):
    return render(req, 'blog/index.html', {
                                          'posts': BlogPost.objects.all()
                                         })


def post(req, pk):
    return render(req, 'blog/detail.html', {
                                           'post': get_object_or_404(BlogPost, pk=pk)
                                           })


class PostsData(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogSerializer

    # def get_queryset(self):
    #     return BlogPost.objects.get(pk=pk)
