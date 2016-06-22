from django.conf.urls import include, url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.main_posts, name='allposts'),
    url(r'^(?P<pk>\d+)/$', views.post_detail, name='detail'),
    url(r'^api/recent$', views.recent),
    url(r'^api/all$', views.all),
    url(r'^api/quote$', views.quote),
    url(r'^api/single/(?P<pk>\d+)/$', views.single),
    url(r'^api/contact/$', views.contact),
]


urlpatterns = format_suffix_patterns(urlpatterns)
