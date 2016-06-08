from django.conf.urls import include, url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.main_posts, name='allposts'),
    url(r'^(?P<pk>\d+)/$', views.post_detail, name='detail'),
    url(r'^api/(?P<pk>\d+)/$', views.PostsData.as_view()),
    url(r'^api/recent$', views.recent),
    url(r'^api/all$', views.all),
    url(r'^api/quote$', views.quote),
]


urlpatterns = format_suffix_patterns(urlpatterns)
