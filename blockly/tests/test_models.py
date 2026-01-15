import pytest
from django.contrib.auth import get_user_model
from blockly.models import BlocklyProject

User = get_user_model()


@pytest.mark.django_db
class TestBlocklyProjectModel:
    """BlocklyProject modeli için testler."""

    def test_create_project(self, user):
        """Proje oluşturma testi."""
        project = BlocklyProject.objects.create(
            user=user,
            name="Test Projesi",
            block_data="<xml></xml>"
        )
        assert project.id is not None
        assert project.name == "Test Projesi"
        assert project.user == user

    def test_project_str_representation(self, user):
        """Proje string temsili testi."""
        project = BlocklyProject.objects.create(
            user=user,
            name="Test Projesi",
            block_data="<xml></xml>"
        )
        assert str(project) == f"Project {project.id}"

    def test_project_default_values(self, user):
        """Varsayılan değerler testi."""
        project = BlocklyProject.objects.create(
            user=user,
            name="Test",
            block_data="<xml></xml>"
        )
        assert project.is_public is False

