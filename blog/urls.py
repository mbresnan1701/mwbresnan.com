from django.conf.urls import include, url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.main_posts, name='allposts'),
    url(r'^taglist$', views.main_posts, name='tags'),
    url(r'^(?P<url>\w+)$', views.post_detail, name='detail'),
    url(r'^api/recent$', views.recent),
    url(r'^api/all$', views.all_posts),
    url(r'^api/blogstart$', views.first_ten),
    url(r'^api/allposts$', views.all_posts),
    url(r'^api/nextposts', views.next_ten),
    url(r'^api/postcount$', views.get_post_count),
    url(r'^api/quote$', views.quote),
    url(r'^api/single/(?P<url>\w+)$', views.single),
    url(r'^api/dates/(?P<year>\w+)/(?P<month>\w+)$', views.get_date_posts),
    url(r'^api/dates$', views.get_archive_dates),
    url(r'^api/tags/(?P<tag>\w+)$', views.get_tag_posts),
    # url(r'^(?P<pk>\d+)/api/comments/$', views.get_comments),
    # url(r'^(?P<pk>\d+)/api/comments/add/$', views.add_comment),
]


urlpatterns = format_suffix_patterns(urlpatterns)
