from django.urls import path
from . import views
from django.contrib.sitemaps.views import sitemap 
from core.sitemaps import ProjectSitemap


sitemaps = {
    'items': ProjectSitemap,
}

urlpatterns = [

    path('', views.homeview, name = 'index'),
    path('about-me/', views.about, name = 'about'),
    path('my-projects/', views.ProjectsView.as_view(), name = 'project'),
    path('my-project/<uuid:id>/', views.project_single, name = 'single'),
    path('contact-me/', views.contact, name = 'contact'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('download/', views.download_resume, name='download_resume'),

]
