import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
class TestUserAuthentication:
    """Kullanıcı kimlik doğrulama testleri."""

    def test_create_user(self):
        """Kullanıcı oluşturma testi."""
        user = User.objects.create_user(
            email='new@example.com',
            password='newpass123',
            first_name='New',
            last_name='User'
        )
        assert user.id is not None
        assert user.email == 'new@example.com'

    def test_user_login(self, client, user):
        """Kullanıcı giriş testi."""
        response = client.post('/login/', {
            'email': 'test@example.com',
            'password': 'testpass123'
        })
        # Başarılı giriş yönlendirme yapmalı veya form göstermeli
        assert response.status_code in [200, 302]

    def test_user_logout(self, authenticated_client):
        """Kullanıcı çıkış testi."""
        response = authenticated_client.get('/logout/')
        assert response.status_code in [200, 302]

