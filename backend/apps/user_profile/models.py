from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from apps.orders.countries import Countries

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address_line_1 = models.CharField(max_length=255, default='')
    address_line_2 = models.CharField(max_length=255, default='')
    city = models.CharField(max_length=255, default='')
    state_province_region = models.CharField(max_length=255, default='')
    zipcode = models.CharField(max_length=255, default='')
    phone = models.CharField(max_length=255, default='')
    country_region = models.CharField(max_length=255, choices=Countries.choices, default=Countries.Argentina)

    def __str__(self):
        return self.user
