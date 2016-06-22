import requests
from blog.models import Limit
import os

MAILGUN_API_KEY = os.environ.get('MAILGUN_API_KEY')
MAX_MESSAGE_COUNT = 50


def send_message():
    print(MAILGUN_API_KEY)
    if check_limit() is True:
        requests.post(
          "https://api.mailgun.net/v3/djdeploy.com/messages",
          auth=("api", MAILGUN_API_KEY),
          data={"from": "Captain Bresnan <mwbresnan@djdeploy.com>",
                "to": ["captobviouz@gmail.com"],
                "subject": "You\'re awesome",
                "text": "Testing some MATT awesomeness!"})
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
