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
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from users import views as users_views
from blockly import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('blockly/save/', views.save_workspace, name='save_workspace'),
    path('blockly/load/', views.get_workspace, name='get_workspace'),
    path('register/', users_views.register, name='register'),
    path('login/', users_views.login, name='login'),
    path('logout/', users_views.logout, name='logout'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
