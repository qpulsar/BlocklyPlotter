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
            workspace_xml = data.get('workspace')
            if not workspace_xml:
                return JsonResponse({'error': 'Workspace verisi bulunamadı!'}, status=400)
            
            # TODO: Workspace XML'i veritabanında saklanabilir
            # Şimdilik sadece başarılı yanıt dönüyoruz
            return JsonResponse({'message': 'Bloklar başarıyla kaydedildi!'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Geçersiz JSON verisi!'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Bir hata oluştu: {str(e)}'}, status=500)
    return JsonResponse({'error': 'Geçersiz istek metodu!'}, status=405)


@csrf_exempt
def get_workspace(request):
    if request.method == 'GET':
        try:
            # TODO: Veritabanından son kaydedilen workspace XML'i çekilebilir
            # Şimdilik boş bir workspace dönüyoruz
            default_workspace = '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
            return JsonResponse({'workspace': default_workspace})
        except Exception as e:
            return JsonResponse({'error': f'Bir hata oluştu: {str(e)}'}, status=500)
    return JsonResponse({'error': 'Geçersiz istek metodu!'}, status=405)
