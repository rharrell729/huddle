from django.conf.urls import include, url
from django.contrib import admin
from glue.views import *
from glue.api import *

urlpatterns = [
    # Examples:
    # url(r'^$', 'server.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^api/huddle/list/', view=huddle_list),
    url(r'^api/huddle/create/', view=huddle_create),
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^', AngularView.as_view())
]

