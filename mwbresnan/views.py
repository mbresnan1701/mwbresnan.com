from django.shortcuts import render


def index(req):
    return render(req, 'main/index.html')


def about(req):
    return render(req, 'main/about.html')


def contact(req):
    return render(req, 'main/contact.html')
