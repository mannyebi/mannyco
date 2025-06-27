from django.shortcuts import render, HttpResponse
from django.views import View
from django.views.generic import DetailView
from django.http import JsonResponse
from .services import creat_contant_record
from base.models import Partnership

# Create your views here.

class Index(View):
    def get(self, request):
        return render(request, "base/index.html")
    

class Contact(View):
    def post(self, request):
        name = request.POST.get("name")
        phone_number = request.POST.get("phone_number")
        message = request.POST.get("message")
        if name and phone_number and message:
            func_response = creat_contant_record(name=name, phone_number=phone_number, message=message)
            if func_response["status"]:
                return JsonResponse({"status": "success", "message":"درخواست شما ثبت شد"})
            else:
                return JsonResponse({"status":"error", "message":"oh"}, status=400)
        return JsonResponse({"status":"error", "message":"Invalid data"}, status=400)
    

class Partnership(DetailView):
    model = Partnership
    template_name = "base/partnership.html"
    context_object_name = "partnership"
    slug_field = "slug"
    slug_url_kwarg = "slug"