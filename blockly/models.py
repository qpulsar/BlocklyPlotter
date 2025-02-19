from django.db import models

# Create your models here.

class BlocklyProject(models.Model):
    project_data = models.JSONField()
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, help_text="Name of the project")
    description = models.TextField(help_text="Description of the project")
    block_data = models.TextField(help_text="Serialized block data")
    canvas_thumbnail = models.ImageField(upload_to='thumbnails/', help_text="Thumbnail of the canvas")
    block_thumbnail = models.ImageField(upload_to='thumbnails/', help_text="Thumbnail of the blocks")
    is_public = models.BooleanField(default=False, help_text="Is the project public?")

    def __str__(self):
        return f'Project {self.id}'

    class Meta:
        verbose_name = "Blockly Project"
        verbose_name_plural = "Blockly Projects"
