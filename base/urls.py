from django.urls import path
from .views import Index, Contact, Partnership


urlpatterns = [
    path("", Index.as_view(), name="home"),
    path("contact-form", Contact.as_view(), name="contact"),
    path("<slug:slug>/", Partnership.as_view(), name="partnership")
]