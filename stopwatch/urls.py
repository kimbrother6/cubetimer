from django.urls import path
from . import views

urlpatterns = [
    path('', views.stop_watch),
    path('create_solve/', views.create_solve)
]
