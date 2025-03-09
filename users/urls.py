from django.urls import path
from . import views
from .views import my_projects, signup, login_view, logout_view, register_view, save_project

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'), 
    path('logout/', logout_view, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('my_projects/', my_projects, name='my_projects'),
    path('save_project/', save_project, name='save_project'),
]