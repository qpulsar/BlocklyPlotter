from django.db import models

# Create your models here.

class BlocklyProject(models.Model):
    user = models.ForeignKey('users.CustomUser', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=255, help_text="Name of the project")
    description = models.TextField(blank=True, null=True, help_text="Description of the project")
    block_data = models.TextField(help_text="Serialized block data")
    
    # Dosya olarak thumbnail'ler
    canvas_thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True, help_text="Thumbnail of the canvas")
    block_thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True, help_text="Thumbnail of the blocks")
    
    # Base64 olarak thumbnail'ler
    canvas_thumbnail_base64 = models.TextField(blank=True, null=True, help_text="Base64 encoded thumbnail of the canvas")
    block_thumbnail_base64 = models.TextField(blank=True, null=True, help_text="Base64 encoded thumbnail of the blocks")
    
    is_public = models.BooleanField(default=False, help_text="Is the project public?")

    def __str__(self):
        return f'Project {self.id}'

    class Meta:
        verbose_name = "Blockly Project"
        verbose_name_plural = "Blockly Projects"
        
    def get_canvas_thumbnail_url(self):
        """Canvas thumbnail URL'sini döndürür. Dosya varsa dosyayı, yoksa base64'ü kullanır."""
        if self.canvas_thumbnail and hasattr(self.canvas_thumbnail, 'url'):
            return self.canvas_thumbnail.url
        elif self.canvas_thumbnail_base64:
            return self.canvas_thumbnail_base64
        return None
        
    def get_block_thumbnail_url(self):
        """Block thumbnail URL'sini döndürür. Dosya varsa dosyayı, yoksa base64'ü kullanır."""
        if self.block_thumbnail and hasattr(self.block_thumbnail, 'url'):
            return self.block_thumbnail.url
        elif self.block_thumbnail_base64:
            return self.block_thumbnail_base64
        return None
