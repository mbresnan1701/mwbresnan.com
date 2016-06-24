import requests
from blog.models import Limit
import os

MAILGUN_API_KEY = os.environ.get('MAILGUN_API_KEY')
MAX_MESSAGE_COUNT = 50


def send_message(data):
    if check_limit() is True:
        requests.post(
          "https://api.mailgun.net/v3/djdeploy.com/messages",
          auth=("api", MAILGUN_API_KEY),
          data={"from": "Admiral Bresnan <mwbresnan@djdeploy.com>",
                "to": ["captobviouz@gmail.com"],
                "subject": "Priority One message for Captain Bresnan",
                "text": "Name: {}\nEmail: {}\nPhone: {}\n Message: {}".format(data['name'],
                                                   data['email'],
                                                   data['phnum'],
                                                   data['msg'])})
        increment_count()
        return True
    else:
        return False


def send_new_comment_message(post_title):
   requests.post(
     "https://api.mailgun.net/v3/djdeploy.com/messages",
     auth=("api", MAILGUN_API_KEY),
     data={"from": "Admiral Bresnan <mwbresnan@djdeploy.com>",
           "to": ["captobviouz@gmail.com"],
           "subject": "Sensors picking up unusual readings, Captain",
           "text": "New comment in post: {}".format(post_title)})


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
