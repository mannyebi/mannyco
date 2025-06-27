from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=120)
    phone_number = models.CharField(max_length=120)
    message = models.TextField()

    def __str__(self):
        return f"a message from {self.name}"
    

class Partnership(models.Model):
    brand_fr = models.CharField(max_length=120)
    brand_en = models.CharField(max_length=120)
    owner_full_name = models.CharField(max_length=120)
    page_title = models.CharField(max_length=120)
    page_description = models.TextField()
    file = models.FileField(
        upload_to="partnership_videos",
        validators=[FileExtensionValidator(allowed_extensions=['mp4', 'mov', 'avi', 'webm', 'mkv'])]
    )
    slug = models.SlugField(default="", null=False)

    def __str__(self):
        return f"Partner ship with {self.brand_en}"
