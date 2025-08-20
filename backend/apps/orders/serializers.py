from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    # get_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__' 