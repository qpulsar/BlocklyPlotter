from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.core.exceptions import ValidationError
from django.contrib import messages
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django import forms
from users.models import CustomUser
import json

from blockly.models import BlocklyProject
from .utils import handle_user_messages, handle_auth_redirect
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, required=True, help_text='Required. Enter a valid email address.')

    class Meta:
        model = CustomUser
        fields = ('email', 'password1', 'password2')

def register_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            handle_user_messages(request, f'Hesap oluşturuldu! Artık giriş yapabilirsiniz.', 'success')
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, 'users/register.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')  # Replace 'home' with your desired redirect URL
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            # Find user by email
            user = CustomUser.objects.get(email=email)
            # Authenticate user
            authenticated_user = authenticate(request, email=email, password=password)

            if authenticated_user is not None:
                login(request, authenticated_user)
                return redirect('index')  # Replace 'index' with your desired redirect URL
            else:
                messages.error(request, 'Geçersiz email veya şifre')
        except CustomUser.DoesNotExist:
            messages.error(request, 'Bu email ile kayıtlı kullanıcı bulunamadı')
        except ValidationError as e:
            messages.error(request, str(e))

    return render(request, 'users/login.html')

def logout_view(request):
    logout(request)
    handle_user_messages(request, "Başarıyla çıkış yaptınız.")
    return redirect('index')

@login_required
def profile(request):
    return render(request, 'profile.html', {'user': request.user})

@login_required
def my_projects(request):
    projects = BlocklyProject.objects.filter(user=request.user)
    return render(request, 'users/my_projects.html', {'projects': projects})

@csrf_exempt
def save_project(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        project_data = data.get('project_data')
        project = BlocklyProject(project_data=project_data)
        project.save()
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=400)