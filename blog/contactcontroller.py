# import requests

from .models import Limit


# def send_message():
#     return request.post(
#         "https://api.mailgun.net/v3/samples.mailgun.org/messages",
#         auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
#         data={"from": "Excited User <excited@samples.mailgun.org>",
#               "to": ["devs@mailgun.net"],
#               "subject": "Hello",
#               "text": "Testing some Mailgun awesomeness!"})


def check_limit():
    limit = Limit.objects.all()[0]
    return limit.count < 50


def increment_count():
    limit = Limit.objects.all()[0]
    limit.count = limit.count + 1
    limit.save()
