import requests
from blog.models import Limit

MAX_MESSAGE_COUNT = 50


def send_message():
    if check_limit() is True:
        requests.post(
          "https://api.mailgun.net/v3/samples.mailgun.org/messages",
          auth=("api", "key-3ax6xnjp29jd6fds4gc373sgvjxteol0"),
          data={"from": "Excited User <excited@samples.mailgun.org>",
                "to": ["captobviouz@gmail.com"],
                "subject": "Hello",
                "text": "Testing some Mailgun awesomeness!"})
        return True
    else:
        return False


def check_limit():
    limit = Limit.objects.all()[0]
    return limit.count < MAX_MESSAGE_COUNT


def increment_count():
    limit = Limit.objects.all()[0]
    limit.count = limit.count + 1
    limit.save()


def reset_count():
    limit = Limit.objects.all()[0]
    limit.count = 0
    limit.save()
