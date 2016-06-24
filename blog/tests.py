import datetime, json
from django.utils import timezone
from django.test import TestCase
from .models import BlogPost, Limit, Comment
from django.core.urlresolvers import reverse
from mwbresnan.contactcontroller import increment_count, check_limit, reset_count
from .views import get_comments

def create_blog_post(title, subtitle, text):
    return BlogPost.objects.create(title=title, subtitle=subtitle, text=text)


def create_blog_comment(text):
    p = create_blog_post('Thing', 'other', 'asdasdasdasdas')
    Comment.objects.create(post_id=p, name='Obama', text=text)


def create_limit(x):
    Limit.objects.create(count=x)


class BlogPostMethodTests(TestCase):

    def test_can_create_blog_post(self):
        ''' Should be able to create a post model'''
        create_blog_post('Millenium Falcon vs U.S.S. Enterprise', 'Who wins?', 'Tie')
        post = BlogPost.objects.all()[0]
        self.assertEqual(post.text, 'Tie')

    def test_can_get_single_entry(self):
        ''' should be able to retrieve single entry'''
        create_blog_post('Millenium Falcon vs U.S.S. Enterprise', 'Who wins?', 'Tie')
        post = BlogPost.objects.all()[0]
        self.assertEqual(post.text, 'Tie')

    def test_can_get_all_entries(self):
        ''' should be able to get all entries'''
        create_blog_post('Millenium Falcon vs U.S.S. Enterprise', 'Who wins?', 'Tie')
        create_blog_post('Millenium Falcon vs U.S.S. Enterprise', 'Who wins?', 'Tie')
        create_blog_post('Millenium Falcon vs U.S.S. Enterprise', 'Who wins?', 'Tie')

        posts = BlogPost.objects.all()
        self.assertEqual(len(posts), 3)


class MailMethodsTests(TestCase):

    def test_can_create_count(self):
        ''' Should be able to create a count model'''
        create_limit(48)
        limit = Limit.objects.all()[0]
        self.assertEqual(limit.count, 48)

    def test_increment_count(self):
        '''Should be able to increment counter'''
        create_limit(48)
        increment_count()
        limit = Limit.objects.all()[0]
        self.assertEqual(limit.count, 49)

    def test_count_check_limit_under_limit(self):
        '''Should return True if under limit'''
        create_limit(48)
        self.assertEqual(check_limit(), True)

    def test_count_check_limit_over_limit(self):
        '''Should return False if at or over limit'''
        create_limit(50)
        self.assertEqual(check_limit(), False)

    def test_limit_reset(self):
        '''Should be able to reset limit to 0'''
        create_limit(45)
        reset_count()
        limit = Limit.objects.all()[0]
        self.assertEqual(limit.count, 0)


class CommentMethodsTests(TestCase):

    def test_can_create_comments(self):
        ''' Should be able to create a comment model'''
        create_blog_comment('Do, or do not. There is no try.')
        self.assertEqual(len(Comment.objects.all()), 1)

    def test_gets_comments_for_id(self):
        '''Should retrieve all comments for 1 post'''
        create_blog_comment('Do, or do not. There is no try.')
        post = BlogPost.objects.all()[0].pk
        comments = get_comments('fake req', post).content
        self.assertEqual(len(comments), 198)



