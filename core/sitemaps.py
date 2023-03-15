from django.contrib.sitemaps import Sitemap
from core.models import *

class ProjectSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5
    
    def items(self):
        return Project.objects.filter(status=1)

    def lastmod(self, obj):
        return obj.created_on