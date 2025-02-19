from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import os
from .utils import (
    handle_json_response,
    get_blocks_file_path,
    DEFAULT_WORKSPACE
)


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def save_workspace(request):
    if request.method != 'POST':
        return handle_json_response(success=False, error='Geçersiz istek metodu!', status=405)
    
    try:
        data = json.loads(request.body)
        blocks_xml = data.get('blocks')
        if not blocks_xml:
            return handle_json_response(success=False, error='Blok verisi bulunamadı!', status=400)
        
        with open(get_blocks_file_path(), 'w', encoding='utf-8') as f:
            f.write(blocks_xml)
        
        return handle_json_response()
    except json.JSONDecodeError:
        return handle_json_response(success=False, error='Geçersiz JSON verisi!', status=400)
    except Exception as e:
        return handle_json_response(success=False, error=f'Bir hata oluştu: {str(e)}', status=500)


@csrf_exempt
def get_workspace(request):
    if request.method != 'GET':
        return handle_json_response(success=False, error='Geçersiz istek metodu!', status=405)
    
    try:
        blocks_file = get_blocks_file_path()
        
        if os.path.exists(blocks_file):
            with open(blocks_file, 'r', encoding='utf-8') as f:
                blocks_xml = f.read()
        else:
            blocks_xml = DEFAULT_WORKSPACE
            
        return handle_json_response(data={'blocks': blocks_xml})
                
    except Exception as e:
        return handle_json_response(success=False, error=f'Bir hata oluştu: {str(e)}', status=500)
