from django.contrib import admin
from .models import BlogPost, Quote, Limit

# Register your models here.


class BlogPostAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['title', 'text']}),
        ('Date information', {'fields': ['date'], 'classes': ['collapse']}),
    ]
    list_display = ('title', 'text', 'date')
    list_filter = ['date']

admin.site.register(BlogPost)
admin.site.register(Quote)
admin.site.register(Limit)
