from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # get_thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'photo',
            'description',
            'price',
            'compare_price',
            'category',
            'quantity',
            'sold',
            'date_created',
            # 'get_thumbnail'
        ]

    # def get_get_thumbnail(self, obj):
    #     request = self.context.get('request')
    #     if obj.photo and request:
    #         return request.build_absolute_uri(obj.photo.url)
    #     elif obj.photo:
    #         return obj.photo.url  # fallback
    #     return ''