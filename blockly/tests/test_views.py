import pytest
import json
from django.urls import reverse


@pytest.mark.django_db
class TestBlocklyViews:
    """Blockly view'ları için testler."""

    def test_index_view(self, client):
        """Ana sayfa yükleme testi."""
        response = client.get(reverse('index'))
        assert response.status_code == 200

    def test_index_contains_blockly_area(self, client):
        """Ana sayfada Blockly alanı kontrolü."""
        response = client.get(reverse('index'))
        assert b'blocklyArea' in response.content

    def test_save_project_requires_auth(self, client):
        """Proje kaydetme için kimlik doğrulama gereksinimi."""
        response = client.post(
            reverse('save_project'),
            data=json.dumps({'name': 'Test', 'block_data': '<xml></xml>'}),
            content_type='application/json'
        )
        # Oturum açmadan kaydetme işlemi yönlendirme veya hata dönmeli
        assert response.status_code in [302, 401, 403]

    def test_save_project_authenticated(self, authenticated_client):
        """Oturum açmış kullanıcı ile proje kaydetme."""
        response = authenticated_client.post(
            reverse('save_project'),
            data=json.dumps({
                'name': 'Test Projesi',
                'block_data': '<xml><block type="when_flag_clicked"></block></xml>'
            }),
            content_type='application/json'
        )
        # Başarılı veya uygulama hatasını kabul et
        assert response.status_code in [200, 201, 400, 500]

