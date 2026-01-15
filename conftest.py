import pytest
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.fixture
def user(db):
    """Test kullanıcısı oluşturur."""
    return User.objects.create_user(
        email='test@example.com',
        password='testpass123',
        first_name='Test',
        last_name='User'
    )


@pytest.fixture
def authenticated_client(client, user):
    """Oturum açmış bir test istemcisi döndürür."""
    client.force_login(user)
    return client

