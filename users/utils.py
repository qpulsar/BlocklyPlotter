from django.shortcuts import redirect
from django.contrib import messages

def handle_user_messages(request, message, level='info'):
    """Kullanıcı mesajlarını yönetmek için yardımcı fonksiyon"""
    message_func = getattr(messages, level)
    message_func(request, message)

def handle_auth_redirect(request, success=True, username=None):
    """Kimlik doğrulama yönlendirmelerini yönetmek için yardımcı fonksiyon"""
    if success:
        if username:
            handle_user_messages(request, f"{username} olarak giriş yaptınız.")
        return redirect('home')
    handle_user_messages(request, "Geçersiz kullanıcı adı veya şifre.", 'error')
    return None
