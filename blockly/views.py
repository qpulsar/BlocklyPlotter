from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def save_workspace(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            blocks_xml = data.get('blocks')
            if not blocks_xml:
                return JsonResponse({'success': False, 'error': 'Blok verisi bulunamadı!'}, status=400)
            
            # saved klasörünü oluştur (eğer yoksa)
            import os
            saved_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved')
            os.makedirs(saved_dir, exist_ok=True)
            
            # blocks.xml dosyasına kaydet
            blocks_file = os.path.join(saved_dir, 'blocks.xml')
            with open(blocks_file, 'w', encoding='utf-8') as f:
                f.write(blocks_xml)
            
            return JsonResponse({'success': True})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Geçersiz JSON verisi!'}, status=400)
        except Exception as e:
            return JsonResponse({'success': False, 'error': f'Bir hata oluştu: {str(e)}'}, status=500)
    return JsonResponse({'success': False, 'error': 'Geçersiz istek metodu!'}, status=405)


@csrf_exempt
def get_workspace(request):
    if request.method == 'GET':
        try:
            import os
            blocks_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'saved', 'blocks.xml')
            
            if os.path.exists(blocks_file):
                with open(blocks_file, 'r', encoding='utf-8') as f:
                    blocks_xml = f.read()
                return JsonResponse({'success': True, 'blocks': blocks_xml})
            else:
                # Eğer dosya yoksa boş bir workspace döndür
                default_workspace = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
                return JsonResponse({'success': True, 'blocks': default_workspace})
                
        except Exception as e:
            return JsonResponse({'success': False, 'error': f'Bir hata oluştu: {str(e)}'}, status=500)
    return JsonResponse({'success': False, 'error': 'Geçersiz istek metodu!'}, status=405)
