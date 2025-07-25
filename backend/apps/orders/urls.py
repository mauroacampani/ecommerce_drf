from django.urls import path
from .views import ListOrdersView, ListOrderDetailView

app_name='orders'

urlpatterns = [
    path('get-orders', ListOrdersView.as_view()),
    path('get-orders/<transactionId>', ListOrderDetailView.as_view())
]