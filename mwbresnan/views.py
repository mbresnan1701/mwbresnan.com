from django.shortcuts import render
from django.http import HttpResponse
from .contactcontroller import send_message


def index(req):
    return render(req, 'main/index.html')


def about(req):
    return render(req, 'main/about.html')


def contact(req):
    return render(req, 'main/contact.html')


def contact_send(req):
    success = send_message(req.POST)
    print(success)
    if success is True:
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=503)
