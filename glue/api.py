__author__ = 'Daniel'
import json as simplejson
from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseServerError, HttpResponseRedirect
from rest_framework.renderers import JSONRenderer
from glue.models import *
from glue.serializers import *
from datetime import datetime, timedelta


class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


def huddle_list(request):
    if request.user.is_authenticated():
        huddles = Huddle.objects.filter(creator=request.user)
        serializer = HuddleSerializer(huddles, many=True)
        return JSONResponse(serializer.data)
    return JSONResponse({})


def huddle_create(request):
    if request.method == "POST":
        data = json.loads(request.body)
        options = []

        for data_option in data['options']:
            option = Option(title=data_option['title'])
            option.save()
            options.append(option)

        huddle = Huddle(title=data['title'], creator=request.user,
                        end=datetime.now() + timedelta(minutes=data['lifetime']['value']))

        huddle.save()  # Need to save before you can access many-to-many fields
        huddle.options.add(*options)
        return HttpResponse()
    return HttpResponseNotAllowed()


def user_data(request):
    if request.user.is_authenticated():
        return JSONResponse({'username': request.user.username, 'email': request.user.email})
    else:
        return JSONResponse(False)


def user_signout(request):
    logout(request)
    return HttpResponse()


def user_signin(request):
    data = json.loads(request.body)
    user = authenticate(username=data['username'], password=data['password'])

    if user is not None:
        if user.is_active:
            login(request, user)
            return JSONResponse({'username': user.username, 'email': user.email})
    return HttpResponseServerError()


def user_register(request):

    return HttpResponse()