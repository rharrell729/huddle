__author__ = 'Daniel'
from rest_framework import serializers
from glue.models import *


class VotesSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Vote
        fields = ('id', 'user')


class OptionSerializer(serializers.ModelSerializer):
    votes = VotesSerializer(many=True)

    class Meta:
        model = Option
        fields = ('id', 'title', 'votes')


class HuddleSerializer(serializers.ModelSerializer):

    creator = serializers.StringRelatedField()
    recipients = serializers.StringRelatedField(many=True)
    options = OptionSerializer(many=True)

    class Meta:
        model = Huddle
        fields = ('id', 'title', 'creator', 'recipients', 'options')