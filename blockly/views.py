from venv import logger

from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json
from django.core.serializers.json import DjangoJSONEncoder
import os
from django.views import View
from .models import BlocklyProject
from .utils import (
    handle_json_response,
    get_blocks_file_path,
    DEFAULT_WORKSPACE
)
from django.utils import timezone
import base64
from django.core.files.base import ContentFile
from django.urls import reverse
from django.contrib.auth import decorators as auth_decorators
from django.shortcuts import redirect


def index(request):
    return render(request, 'index.html')


class BlocklyProjectView(View):
    def get(self, request, project_id):
        project = get_object_or_404(BlocklyProject, id=project_id)
        return JsonResponse({
            'id': project.id,
            'name': project.name,
            'xml_data': project.xml_data,
            'created_at': project.created_at,
            'updated_at': project.updated_at
        }, encoder=DjangoJSONEncoder, safe=False)

    def post(self, request, project_id):
        try:
            data = json.loads(request.body)
            project = get_object_or_404(BlocklyProject, id=project_id)
            project.xml_data = data.get('blocks', '')
            project.save()
            return JsonResponse({'success': True, 'updated_at': project.updated_at}, encoder=DjangoJSONEncoder)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400, encoder=DjangoJSONEncoder)


@csrf_exempt
def save_workspace(request):
    if request.method != 'POST':
        return handle_json_response(success=False, error='Geçersiz istek metodu!', status=405)

    if not request.user.is_authenticated:
        return handle_json_response(success=False, error='Lütfen önce giriş yapın!', status=401)

    try:
        # Gelen JSON verilerini detaylı logla
        request_body = request.body.decode('utf-8')
        logger.debug(f"Gelen JSON verisi uzunluğu: {len(request_body)} karakter")
        
        data = json.loads(request_body)
        
        # Front-end'den gelen verileri kontrol et
        # 'name' veya 'projectName' parametresini al
        project_name = data.get('name', '') or data.get('projectName', '')
        project_name = project_name.strip()
        
        # 'blocks' parametresini al (workspace verisi)
        block_data = data.get('blocks')
        
        # Thumbnail verilerini al
        canvas_thumbnail_data = data.get('canvas_thumbnail', '')
        block_thumbnail_data = data.get('block_thumbnail', '')
        
        # Thumbnail verilerini kontrol et
        logger.debug(f"Canvas thumbnail verisi mevcut: {'Evet' if canvas_thumbnail_data else 'Hayır'}")
        logger.debug(f"Block thumbnail verisi mevcut: {'Evet' if block_thumbnail_data else 'Hayır'}")
        
        if canvas_thumbnail_data:
            logger.debug(f"Canvas thumbnail veri boyutu: {len(canvas_thumbnail_data)} karakter")
            logger.debug(f"Canvas thumbnail veri başlangıcı: {canvas_thumbnail_data[:50]}...")
        
        if block_thumbnail_data:
            logger.debug(f"Block thumbnail veri boyutu: {len(block_thumbnail_data)} karakter")
            logger.debug(f"Block thumbnail veri başlangıcı: {block_thumbnail_data[:50]}...")
        else:
            logger.error("Block thumbnail verisi bulunamadı!")
        
        # Workspace verilerini kontrol et
        logger.debug(f"Block verisi tipi: {type(block_data)}")
        logger.debug(f"Canvas thumbnail verisi mevcut: {'Evet' if canvas_thumbnail_data else 'Hayır'}")
        logger.debug(f"Block thumbnail verisi mevcut: {'Evet' if block_thumbnail_data else 'Hayır'}")
        
        # Block verisi boşsa veya None ise hata döndür
        if not block_data:
            return handle_json_response(success=False, error='Block verisi boş olamaz!', status=400)

        # Proje adı belirtilmemişse veya boşsa "untitled" olarak ayarla
        if not project_name:
            # Mevcut "untitled" projelerini kontrol et
            existing_untitled = BlocklyProject.objects.filter(
                user=request.user,
                name__startswith='untitled'
            ).values_list('name', flat=True)
            
            if not existing_untitled or 'untitled' not in existing_untitled:
                project_name = 'untitled'
            else:
                # Numaralandırılmış untitled projelerini bul
                numbered_projects = [name for name in existing_untitled if name.startswith('untitled') and len(name) > 8]
                
                if 'untitled' in existing_untitled and not numbered_projects:
                    # Sadece "untitled" varsa, "untitled01" olarak ayarla
                    project_name = 'untitled01'
                else:
                    # En yüksek numarayı bul ve bir artır
                    max_num = 0
                    for name in numbered_projects:
                        try:
                            num = int(name[8:])
                            max_num = max(max_num, num)
                        except ValueError:
                            continue
                    
                    # Yeni numara oluştur (2 basamaklı format)
                    project_name = f'untitled{max_num + 1:02d}'

        # Debug için tüm request verilerini loglayalım
        logger.debug(f"Kayıt İsteği Detayları:\n"
                     f"Kullanıcı: {request.user}\n"
                     f"Proje Adı: {project_name}\n"
                     f"Block Veri Boyutu: {len(str(block_data)) if block_data else 0} karakter")

        # Block verisini string'e çevir (eğer dict veya list ise)
        if isinstance(block_data, (dict, list)):
            block_data_str = json.dumps(block_data)
        else:
            block_data_str = str(block_data)
            
        logger.debug(f"Kaydedilecek block verisi: {block_data_str[:100]}...")

        # Proje oluştur/güncelle
        project, created = BlocklyProject.objects.get_or_create(
            user=request.user,
            name=project_name,
            defaults={
                'block_data': block_data_str,
                'description': 'Otomatik oluşturuldu'
            }
        )

        if not created:
            project.block_data = block_data_str
            project.updated_at = timezone.now()  # Güncelleme zamanını güncelle
        
        # Canvas thumbnail'i kaydet
        if canvas_thumbnail_data and canvas_thumbnail_data.startswith('data:image/png;base64,'):
            # Base64 önekini kaldır
            image_data = canvas_thumbnail_data.split(',')[1]
            
            # Base64 olarak kaydet
            project.canvas_thumbnail_base64 = canvas_thumbnail_data
            
            try:
                # Base64'ten binary'ye çevir
                binary_data = base64.b64decode(image_data)
                # ContentFile oluştur
                image_file = ContentFile(binary_data)
                # Dosya adını oluştur
                file_name = f"canvas_{project.id}_{int(timezone.now().timestamp())}.png"
                # Thumbnail'i dosya olarak kaydet
                project.canvas_thumbnail.save(file_name, image_file, save=False)
                logger.debug(f"Canvas thumbnail dosya olarak kaydedildi: {file_name}")
            except Exception as e:
                logger.error(f"Canvas thumbnail dosya olarak kaydedilemedi: {str(e)}")
        
        # Block thumbnail'i kaydet
        if block_thumbnail_data and block_thumbnail_data.startswith('data:image/png;base64,'):
            # Base64 önekini kaldır
            image_data = block_thumbnail_data.split(',')[1]
            
            # Base64 olarak kaydet
            project.block_thumbnail_base64 = block_thumbnail_data
            
            try:
                # Base64'ten binary'ye çevir
                binary_data = base64.b64decode(image_data)
                # ContentFile oluştur
                image_file = ContentFile(binary_data)
                # Dosya adını oluştur
                file_name = f"block_{project.id}_{int(timezone.now().timestamp())}.png"
                # Thumbnail'i dosya olarak kaydet
                project.block_thumbnail.save(file_name, image_file, save=False)
                logger.debug(f"Block thumbnail dosya olarak kaydedildi: {file_name}")
            except Exception as e:
                logger.error(f"Block thumbnail dosya olarak kaydedilemedi: {str(e)}")
        
        # Projeyi kaydet
        project.save()
        
        if created:
            logger.debug(f"Yeni Proje Oluşturuldu - ID: {project.id}")
        else:
            logger.debug(f"Proje Güncellendi - ID: {project.id}")

        # Kaydedilen veriyi kontrol et
        saved_project = BlocklyProject.objects.get(id=project.id)
        logger.debug(f"Kaydedilen block_data: {saved_project.block_data[:100]}...")
        logger.debug(f"Canvas thumbnail: {saved_project.canvas_thumbnail}")
        logger.debug(f"Block thumbnail: {saved_project.block_thumbnail}")

        return handle_json_response(
            success=True,
            data={
                'message': 'Proje başarıyla kaydedildi' if created else 'Proje başarıyla güncellendi',
                'project_id': project.id,
                'created_at': project.created_at
            }
        )

    except Exception as e:
        logger.error(f"Kayıt Hatası: {str(e)}", exc_info=True)
        return handle_json_response(success=False, error=str(e), status=500)


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

        return handle_json_response(data={'blocks': blocks_xml}, encoder=DjangoJSONEncoder)

    except Exception as e:
        return handle_json_response(success=False, error=f'Bir hata oluştu: {str(e)}', status=500)


@auth_decorators.login_required
def delete_project(request, project_id):
    """Kullanıcının projesini silmek için view fonksiyonu"""
    project = get_object_or_404(BlocklyProject, id=project_id, user=request.user)
    
    if request.method == 'POST':
        # Proje thumbnail'lerini temizle
        if project.canvas_thumbnail:
            project.canvas_thumbnail.delete(save=False)
        if project.block_thumbnail:
            project.block_thumbnail.delete(save=False)
        
        # Base64 thumbnail'leri de temizle
        project.canvas_thumbnail_base64 = None
        project.block_thumbnail_base64 = None
        
        # Projeyi sil
        project.delete()
        
        return redirect('my_projects')
    
    return HttpResponseRedirect(reverse('my_projects'))


@auth_decorators.login_required
def get_share_status(request, project_id):
    """Projenin paylaşım durumunu döndüren API"""
    project = get_object_or_404(BlocklyProject, id=project_id, user=request.user)
    
    return JsonResponse({
        'is_public': project.is_public if hasattr(project, 'is_public') else False
    })


@auth_decorators.login_required
def update_share_status(request, project_id):
    """Projenin paylaşım durumunu güncelleyen API"""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
    project = get_object_or_404(BlocklyProject, id=project_id, user=request.user)
    
    try:
        data = json.loads(request.body)
        is_public = data.get('is_public', False)
        
        # is_public alanı modelde yoksa, önce modeli güncellememiz gerekiyor
        if not hasattr(project, 'is_public'):
            # Bu durumda modeli güncellememiz gerekiyor, ancak şu an için
            # basit bir çözüm olarak özelliği dinamik olarak ekleyelim
            project.is_public = is_public
        else:
            project.is_public = is_public
        
        project.save()
        
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})


@auth_decorators.login_required
def update_project_name(request, project_id):
    """Proje ismini güncelleyen API"""
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Invalid request method'})
    
    project = get_object_or_404(BlocklyProject, id=project_id, user=request.user)
    
    try:
        data = json.loads(request.body)
        new_name = data.get('name', '').strip()
        
        if not new_name:
            return JsonResponse({'success': False, 'error': 'Proje ismi boş olamaz'})
        
        project.name = new_name
        project.save()
        
        return JsonResponse({'success': True})
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)})


@auth_decorators.login_required
def update_project_description(request, project_id):
    """
    Proje açıklamasını güncelleyen API
    """
    if request.method != 'POST':
        return JsonResponse({'success': False, 'error': 'Sadece POST istekleri kabul edilir'})
    
    try:
        project = get_object_or_404(BlocklyProject, id=project_id, user=request.user)
        data = json.loads(request.body)
        description = data.get('description', '')
        
        # Açıklamayı güncelle
        project.description = description
        project.updated_at = timezone.now()
        project.save()
        
        return JsonResponse({'success': True})
    except Exception as e:
        logger.error(f"Proje açıklaması güncellenirken hata oluştu: {str(e)}")
        return JsonResponse({'success': False, 'error': str(e)})


@auth_decorators.login_required
def view_shared_project(request, project_id):
    """Paylaşılan projeyi görüntülemek için view fonksiyonu"""
    project = get_object_or_404(BlocklyProject, id=project_id)
    
    # Proje sahibi değilse ve proje herkese açık değilse erişimi reddet
    if project.user != request.user and not getattr(project, 'is_public', False):
        return HttpResponseRedirect(reverse('index'))
    
    # Burada projeyi görüntülemek için gerekli template'i render edebilirsiniz
    # Şimdilik ana sayfaya yönlendirelim ve proje_id parametresi ekleyelim
    return HttpResponseRedirect(f"{reverse('index')}?project_id={project_id}&view_only=true")


@auth_decorators.login_required
def project_detail(request, project_id):
    """Proje detay sayfasını görüntülemek için view fonksiyonu"""
    project = get_object_or_404(BlocklyProject, id=project_id)
    
    # Proje sahibi değilse ve proje herkese açık değilse erişimi reddet
    if project.user != request.user and not getattr(project, 'is_public', False):
        return HttpResponseRedirect(reverse('index'))
    
    return render(request, 'users/project_detail.html', {'project': project})


def get_project_info(request, project_id):
    """Proje bilgilerini JSON formatında döndüren API"""
    try:
        project = get_object_or_404(BlocklyProject, id=project_id)
        
        # Proje sahibi değilse ve proje herkese açık değilse erişimi reddet
        if request.user.is_authenticated and project.user != request.user and not getattr(project, 'is_public', False):
            return JsonResponse({'success': False, 'error': 'Bu projeye erişim izniniz yok.'}, status=403)
        
        return JsonResponse({
            'success': True,
            'project_id': project.id,
            'project_name': project.name,
            'description': project.description,
            'created_at': project.created_at,
            'updated_at': project.updated_at,
            'is_public': getattr(project, 'is_public', False)
        }, encoder=DjangoJSONEncoder)
    except Exception as e:
        logger.error(f"Proje bilgileri alınırken hata oluştu: {str(e)}")
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
