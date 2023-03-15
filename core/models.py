from django.db import models
from django.urls import reverse
from taggit.managers import TaggableManager 

import uuid

STATUS = (

    (0,"Draft"),
    (1,"Publish")

)

class BaseModel(models.Model):

    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Project(BaseModel):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100, unique=True)
    short_info = models.TextField(null=True, blank=True)
    project_url = models.URLField(null=True, blank=True)
    github_url = models.URLField(null=True, blank=True)
    tags = TaggableManager()
    date = models.DateField()
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title




