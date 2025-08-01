from django.contrib import admin
from .models import Review

# Register your models here.
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'rating', 'comment', )
    list_display_links = ('id', 'rating', 'comment', )
    list_filter = ('rating', )
    list_per_page = 25

admin.site.register(Review, ReviewAdmin)