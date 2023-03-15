from django.contrib import admin

from core.models import *

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'status', 'date', 'created_on')
    list_display_links = ('id', 'title')
    list_filter = ('status',)
    search_fields = ['title']

admin.site.register(Project, ProjectAdmin)




