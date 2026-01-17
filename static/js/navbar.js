function generateUniqueFilename() {
    let counter = 1;
    let filename = 'isimsiz';
    while (localStorage.getItem(filename + (counter > 1 ? ' ' + ('0' + counter).slice(-2) : ''))) {
        counter++;
    }
    return filename + (counter > 1 ? ' ' + ('0' + counter).slice(-2) : '');
}

// Global proje durumu
window.currentProjectId = null;

document.addEventListener('DOMContentLoaded', function () {
    // Proje adını al
    var projectNameInput = document.getElementById('projectName');
    var codePreviewPanel = document.getElementById('codePreviewPanel');
    var togglePreviewBtn = document.getElementById('togglePreview');
    var closePreviewBtn = document.getElementById('closePreview');
    var generatedCodePre = document.getElementById('generatedCode');

    if (projectNameInput) {
        // URL'den proje ID'sini al
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');

        if (projectId) {
            window.currentProjectId = projectId;

            // Proje bilgilerini al
            fetch(`/blockly/get_project_info/${projectId}/`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        projectNameInput.value = data.project_name;

                        // Proje verisini al ve workspace'e yükle
                        if (data.xml_data) {
                            try {
                                const workspace = Blockly.getMainWorkspace();
                                workspace.clear();

                                // JSON denemesi (Yeni sistem)
                                try {
                                    const state = JSON.parse(data.xml_data);
                                    Blockly.serialization.workspaces.load(state, workspace);
                                    console.log('Proje JSON verisi yüklendi');
                                } catch (e) {
                                    // Eski XML sistemi fallback (v12 uyumlu)
                                    var parser = new DOMParser();
                                    var xmlDoc = parser.parseFromString(data.xml_data, "text/xml");
                                    Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);
                                    console.log('Proje XML verisi yüklendi (fallback)');
                                }

                                // Yükleme sonrası kod üret
                                updateCodePreview();
                            } catch (error) {
                                console.error('Veri yüklenirken hata oluştu:', error);
                            }
                        }
                    }
                });
        }
    }

    // Kod Önizleme Toggle
    function updateCodePreview() {
        if (!codePreviewPanel.classList.contains('d-none')) {
            const workspace = Blockly.getMainWorkspace();
            const code = Blockly.JavaScript.workspaceToCode(workspace);
            generatedCodePre.textContent = code;
        }
    }

    togglePreviewBtn.addEventListener('click', () => {
        codePreviewPanel.classList.toggle('d-none');
        updateCodePreview();
    });

    closePreviewBtn.addEventListener('click', () => {
        codePreviewPanel.classList.add('d-none');
    });

    // Workspace değişikliklerini dinle (Önizleme için)
    setTimeout(() => {
        Blockly.getMainWorkspace().addChangeListener((event) => {
            if (event.isUiEvent) return;
            updateCodePreview();
        });
    }, 1000);

    // Dosya kaydetme işlemi
    document.getElementById('saveFile').addEventListener('click', function () {
        const workspace = Blockly.getMainWorkspace();

        // Modern Serialization (JSON)
        const state = Blockly.serialization.workspaces.save(workspace);
        const stateText = JSON.stringify(state);

        // Proje adını al
        const projectName = document.getElementById('projectName').value.trim() || 'isimsiz';

        // Thumbnail'ler için spinner başlatılabilir (Gelecek özellik)
        const saveBtn = document.getElementById('saveFile');
        const originalBtnContent = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i> Kaydediliyor...';
        saveBtn.disabled = true;

        // Canvas thumbnail (Saf JS ile)
        const outputCanvas = document.getElementById('outputCanvas');
        let canvasThumbnail = '';
        try {
            canvasThumbnail = outputCanvas.toDataURL('image/png', 0.8);
        } catch (e) {
            console.error('Canvas thumbnail hatası:', e);
        }

        // Block thumbnail (SVG capture)
        captureBlockThumbnail().then(blockThumbnail => {
            sendDataToServer(stateText, projectName, canvasThumbnail, blockThumbnail, () => {
                saveBtn.innerHTML = originalBtnContent;
                saveBtn.disabled = false;
            });
        });
    });

    async function captureBlockThumbnail() {
        const workspace = Blockly.getMainWorkspace();
        const svg = workspace.getParentSvg();

        try {
            // SVG'yi clone'la ve boyutlandır (Sadece blokların olduğu alan)
            const clonedSvg = svg.cloneNode(true);
            const bBox = workspace.getBlocksBoundingBox();

            // Padding ekleyelim
            const padding = 20;
            const width = bBox.right - bBox.left + padding * 2;
            const height = bBox.bottom - bBox.top + padding * 2;

            clonedSvg.setAttribute('width', width);
            clonedSvg.setAttribute('height', height);
            clonedSvg.setAttribute('viewBox', `${bBox.left - padding} ${bBox.top - padding} ${width} ${height}`);

            // Stilleri dahil et (CSS kopyalama)
            const style = document.createElement('style');
            style.textContent = Array.from(document.styleSheets)
                .map(sheet => {
                    try { return Array.from(sheet.cssRules).map(rule => rule.cssText).join(''); }
                    catch (e) { return ''; }
                }).join('');
            clonedSvg.insertBefore(style, clonedSvg.firstChild);

            const svgData = new XMLSerializer().serializeToString(clonedSvg);
            const svgUrl = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

            return new Promise(resolve => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.min(width, 1000); // Çok büyükse sınırla
                    canvas.height = Math.min(height, 1000);
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = 'white'; // Şeffaf olmasın
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/png', 0.8));
                };
                img.onerror = () => resolve('');
                img.src = svgUrl;
            });
        } catch (error) {
            console.error('Blok thumbnail hatası:', error);
            return '';
        }
    }

    // Veriyi sunucuya gönderen fonksiyon
    function sendDataToServer(blocksData, projectName, canvasThumbnail, blockThumbnail, callback) {
        fetch('/blockly/save/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                blocks: blocksData,
                name: projectName,
                project_id: window.currentProjectId, // ID'yi gönder (Varsa güncelleme yapacak)
                canvas_thumbnail: canvasThumbnail,
                block_thumbnail: blockThumbnail
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.currentProjectId = data.project_id; // ID'yi güncelle
                    showToast('Başarı', 'Proje kaydedildi!', 'success');
                } else {
                    showToast('Hata', 'Kayıt başarısız: ' + data.error, 'danger');
                }
            })
            .catch(error => {
                console.error('Error saving project:', error);
                showToast('Hata', 'Sunucu hatası oluştu.', 'danger');
            })
            .finally(() => {
                if (callback) callback();
            });
    }

    // Toast/bildirim fonksiyonu - Modern modal kullanıyor
    function showToast(title, message, type) {
        // type: 'success' veya 'danger' -> modal tipleri: 'success' veya 'error'
        const modalType = type === 'danger' ? 'error' : type;
        showModal(title, message, modalType);
    }

    // Yeni dosya oluşturma
    document.getElementById('newFile').addEventListener('click', async function () {
        const confirmed = await showConfirmModal(
            'Yeni Proje',
            'Yeni bir proje oluşturmak istediğinizden emin misiniz? Kaydedilmemiş değişiklikler kaybolacaktır.',
            'Evet, Oluştur',
            'İptal'
        );

        if (confirmed) {
            Blockly.getMainWorkspace().clear();
            document.getElementById('projectName').value = 'isimsiz';
            window.currentProjectId = null; // ID'yi sıfırla

            // Canvas temizle
            const canvas = document.getElementById('outputCanvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // URL'deki proje_id'yi temizle (Opsiyonel: refresh yapmadan)
            const url = new URL(window.location);
            url.searchParams.delete('project_id');
            window.history.pushState({}, '', url);
        }
    });
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
