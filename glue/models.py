from django.db import models
from django.contrib.auth.models import User


class Vote(models.Model):
    user = models.ForeignKey(User)


class Option(models.Model):
    title = models.TextField()
    votes = models.ManyToManyField(Vote, related_name='votes', blank=True)


class Huddle(models.Model):
    title = models.TextField(default='')
    creator = models.ForeignKey(User, related_name='creator')
    recipients = models.ManyToManyField(User, related_name='recipients', blank=True)
    options = models.ManyToManyField(Option, related_name='options')
    end = models.TimeField()




