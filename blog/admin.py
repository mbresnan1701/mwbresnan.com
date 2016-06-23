from django.contrib import admin
from .models import BlogPost, Quote, Limit, Comment

# Register your models here.


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 4


class BlogPostAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['title', 'text']}),
    ]
    inlines = [CommentInline]
    list_display = ('title', 'text', 'date')
    list_filter = ['date']
    search_fields = ['title', 'text']

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Quote)
admin.site.register(Limit)
admin.site.register(Comment)
