import datetime
from django.utils import timezone
from django.test import TestCase
from .models import BlogPost, Limit
from django.core.urlresolvers import reverse
from .contactcontroller import increment_count, check_limit, reset_count


def create_blog_post(title, subtitle, text):
    BlogPost.objects.create(title=title, subtitle=subtitle, text=text)


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


# def create_question(question_text, days):
#     """
#     Creates a question with the given `question_text` and published the
#     given number of `days` offset to now (negative for questions published
#     in the past, positive for questions that have yet to be published).
#     """
#     time = timezone.now() + datetime.timedelta(days=days)
#     return Question.objects.create(question_text=question_text, pub_date=time)


# class QuestionViewTests(TestCase):
#     def test_index_view_with_no_questions(self):
#         """
#         If no questions exist, an appropriate message should be displayed.
#         """
#         response = self.client.get(reverse('polls:index'))
#         self.assertEqual(response.status_code, 200)
#         self.assertContains(response, "No polls are available.")
#         self.assertQuerysetEqual(response.context['latest_question_list'], [])

#     def test_index_view_with_a_past_question(self):
#         """
#         Questions with a pub_date in the past should be displayed on the
#         index page.
#         """
#         create_question(question_text="Past question.", days=-30)
#         response = self.client.get(reverse('polls:index'))
#         self.assertQuerysetEqual(
#             response.context['latest_question_list'],
#             ['<Question: Past question.>']
#         )

#     def test_index_view_with_a_future_question(self):
#         """
#         Questions with a pub_date in the future should not be displayed on
#         the index page.
#         """
#         create_question(question_text="Future question.", days=30)
#         response = self.client.get(reverse('polls:index'))
#         self.assertContains(response, "No polls are available.")
#         self.assertQuerysetEqual(response.context['latest_question_list'], [])

#     def test_index_view_with_future_question_and_past_question(self):
#         """
#         Even if both past and future questions exist, only past questions
#         should be displayed.
#         """
#         create_question(question_text="Past question.", days=-30)
#         create_question(question_text="Future question.", days=30)
#         response = self.client.get(reverse('polls:index'))
#         self.assertQuerysetEqual(
#             response.context['latest_question_list'],
#             ['<Question: Past question.>']
#         )

#     def test_index_view_with_two_past_questions(self):
#         """
#         The questions index page may display multiple questions.
#         """
#         create_question(question_text="Past question 1.", days=-30)
#         create_question(question_text="Past question 2.", days=-5)
#         response = self.client.get(reverse('polls:index'))
#         self.assertQuerysetEqual(
#             response.context['latest_question_list'],
#             ['<Question: Past question 2.>', '<Question: Past question 1.>']
#         )


# class QuestionIndexDetailTests(TestCase):
#     def test_detail_view_with_a_future_question(self):
#         """
#         The detail view of a question with a pub_date in the future should
#         return a 404 not found.
#         """
#         future_question = create_question(question_text='Future question.', days=5)
#         url = reverse('polls:detail', args=(future_question.id,))
#         response = self.client.get(url)
#         self.assertEqual(response.status_code, 404)

#     def test_detail_view_with_a_past_question(self):
#         """
#         The detail view of a question with a pub_date in the past should
#         display the question's text.
#         """
#         past_question = create_question(question_text='Past Question.', days=-5)
#         url = reverse('polls:detail', args=(past_question.id,))
#         response = self.client.get(url)
#         self.assertContains(response, past_question.question_text)
