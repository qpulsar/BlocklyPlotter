"""
URL configuration for BlocklyPlotter project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from blockly import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('blockly/save/', views.save_workspace, name='save_workspace'),
    path('blockly/load/', views.get_workspace, name='get_workspace'),
    path('blockly/project/<int:project_id>/delete/', views.delete_project, name='delete_project'),
    path('blockly/project/<int:project_id>/share-status/', views.get_share_status, name='get_share_status'),
    path('blockly/project/<int:project_id>/update-share-status/', views.update_share_status, name='update_share_status'),
    path('blockly/project/<int:project_id>/update-name/', views.update_project_name, name='update_project_name'),
    path('blockly/project/<int:project_id>/update-description/', views.update_project_description, name='update_project_description'),
    path('blockly/project/<int:project_id>/', views.project_detail, name='project_detail'),
    path('blockly/shared/<int:project_id>/', views.view_shared_project, name='view_shared_project'),
    path('blockly/get_project_info/<int:project_id>/', views.get_project_info, name='get_project_info'),
    path("", include("users.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Medya dosyalarına erişim için (sadece geliştirme ortamında)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
