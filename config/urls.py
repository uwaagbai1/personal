from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

admin.site.site_header  =  "Uwa Agbai"
admin.site.site_title  =  "Uwa Agbai"
admin.site.index_title  =  "Uwa Agbai"
admin.site.empty_value_display = '**Empty**'

handler404 = 'core.views.error_404'
handler500 = 'core.views.error_500'