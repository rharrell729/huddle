__author__ = 'Daniel'
import simplejson as json
from django.http import HttpResponse
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
    huddles = Huddle.objects.all()  # TODO scope to user
    serializer = HuddleSerializer(huddles, many=True)
    return JSONResponse(serializer.data)


def huddle_create(request):
    if request.method == "POST":
        data = json.loads(request.body)
        options = []

        for option in data['options']:
            vote = Vote(user=request.user)
            vote.save()

            option = Option(title=option['title'], votes=[])
            options.append(option)
            option.save()
        huddle = Huddle(title=data['title'], creator=request.user, recipients=[request.user], options=options,
                        end=datetime.now() + datetime.timedelta(minutes=data['lifetime']['value']))
        huddle.save()
