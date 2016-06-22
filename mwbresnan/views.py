from django.shortcuts import render
from django.http import HttpResponse
from mwbresnan.settings import BASE_DIR
from django.template import RequestContext

import os

ctrlPath = os.path.join(BASE_DIR, 'mwbresnan/contactcontroller.py')


def index(req):
    return render(req, 'main/index.html')


def about(req):
    return render(req, 'main/about.html')


def contact(req):
    return render(req, 'main/contact.html')


def contact_send(req):
    print('In contact_send')
    success = ctrlPath.send_message()
    print(success)
    if success is True:
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=503)
