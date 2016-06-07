from django.conf.urls import include, url
from . import views

urlpatterns = [
    url(r'^$', views.all_posts, name='allposts'),
    url(r'(?P<pk>\d+)/$', views.post, name='detail'),
]
