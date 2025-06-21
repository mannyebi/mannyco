from django.shortcuts import render, HttpResponse
from django.views import View

# Create your views here.

class Index(View):
    def get(self, request):
        return render(request, "base/index.html")