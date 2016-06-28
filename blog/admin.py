from django.contrib import admin
from .models import BlogPost, Quote, Limit, Comment

# Register your models here.


class BlogPostAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['title', 'text', 'url', 'tags']}),
    ]
    list_display = ('title', 'text', 'date')
    list_filter = ['date']
    search_fields = ['title', 'text', 'tags']

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Quote)
admin.site.register(Limit)
admin.site.register(Comment)
