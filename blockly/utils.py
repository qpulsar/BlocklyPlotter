from django.http import JsonResponse
import os
import json

def handle_json_response(success=True, data=None, error=None, status=200):
    """Standart JSON yanıtları için yardımcı fonksiyon"""
    response = {'success': success}
    if data is not None:
        response.update(data)
    if error is not None:
        response['error'] = error
    return JsonResponse(response, status=status)

def get_saved_dir():
    """Kaydedilen dosyaların dizinini döndürür ve oluşturur"""
    saved_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved')
    os.makedirs(saved_dir, exist_ok=True)
    return saved_dir

def get_blocks_file_path():
    """blocks.xml dosyasının tam yolunu döndürür"""
    return os.path.join(get_saved_dir(), 'blocks.xml')

DEFAULT_WORKSPACE = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
