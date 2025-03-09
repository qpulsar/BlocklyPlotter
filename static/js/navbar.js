function generateUniqueFilename() {
    let counter = 1;
    let filename = 'isimsiz';
    while (localStorage.getItem(filename + (counter > 1 ? ' ' + ('0' + counter).slice(-2) : ''))) {
        counter++;
    }
    return filename + (counter > 1 ? ' ' + ('0' + counter).slice(-2) : '');
}

document.addEventListener('DOMContentLoaded', function() {
    // Proje adını al
    var projectNameInput = document.getElementById('projectName');
    if (projectNameInput) {
        // URL'den proje ID'sini al
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('project_id');
        
        if (projectId) {
            // Önce localStorage'dan proje adını kontrol et
            const storedProjectName = localStorage.getItem('currentProjectName');
            if (storedProjectName) {
                projectNameInput.value = storedProjectName;
                // Kullandıktan sonra localStorage'dan kaldır
                localStorage.removeItem('currentProjectName');
            }
            
            // Proje ID'si varsa, proje bilgilerini ve XML verisini al
            fetch(`/blockly/get_project_info/${projectId}/`)
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Proje adını ayarla
                        projectNameInput.value = data.project_name;
                        
                        // Proje XML verisini al ve workspace'e yükle
                        if (data.xml_data) {
                            try {
                                // Workspace'i temizle
                                Blockly.getMainWorkspace().clear();
                                
                                // XML verisini parse et
                                const xml = Blockly.Xml.textToDom(data.xml_data);
                                
                                // XML'i workspace'e yükle
                                Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
                                
                                console.log('Proje XML verisi başarıyla yüklendi');
                            } catch (error) {
                                console.error('XML verisi yüklenirken hata oluştu:', error);
                            }
                        } else {
                            console.warn('Proje XML verisi bulunamadı');
                        }
                    } else {
                        console.error('Proje bilgileri alınamadı:', data.error);
                    }
                })
                .catch(error => console.error('Error fetching project info:', error));
        }
    }
    
    // Dosya kaydetme işlemi
    document.getElementById('saveFile').addEventListener('click', function() {
        // Get the workspace XML
        var workspace = Blockly.getMainWorkspace();
        var xml = Blockly.Xml.workspaceToDom(workspace);
        var xmlText = Blockly.Xml.domToText(xml);
        
        // Get project name
        var projectName = document.getElementById('projectName').value || 'Isimsiz Proje';

        // Get canvas thumbnail as base64
        const outputCanvas = document.getElementById('outputCanvas');
        let canvasThumbnail = '';
        
        try {
            // Canvas'ı doğrudan thumbnail olarak kullan
            canvasThumbnail = outputCanvas.toDataURL('image/png');
            console.log('Canvas thumbnail oluşturuldu');
        } catch (error) {
            console.error('Error generating canvas thumbnail:', error);
        }
        
        // Get blocks thumbnail as base64
        let blockThumbnail = '';
        
        try {
            console.log('Blockly kod bloklarının ekran görüntüsü alınıyor...');
            
            // Doğrudan Blockly'nin SVG elementini bul
            const blocklySvg = document.querySelector('.blocklySvg');
            
            if (blocklySvg) {
                console.log('Blockly SVG elementi bulundu:', blocklySvg);
                
                // SVG'yi bir string'e dönüştür
                const svgData = new XMLSerializer().serializeToString(blocklySvg);
                // SVG'yi data URL'e dönüştür
                blockThumbnail = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                console.log('SVG data URL oluşturuldu, boyut:', blockThumbnail.length);
                
                // SVG'yi PNG'ye dönüştür
                const img = new Image();
                img.src = blockThumbnail;
                
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = blocklySvg.getBoundingClientRect().width;
                    canvas.height = blocklySvg.getBoundingClientRect().height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    blockThumbnail = canvas.toDataURL('image/png');
                    console.log('PNG olarak block thumbnail oluşturuldu, boyut:', blockThumbnail.length);
                    
                    // Veriyi sunucuya gönder
                    sendDataToServer(xmlText, projectName, canvasThumbnail, blockThumbnail);
                };
                
                // img.onload içinde sendDataToServer çağrılacağı için burada return
                return;
            } else {
                console.error('Blockly SVG elementi bulunamadı!');
                
                // SVG bulunamadığında alternatif bir yaklaşım
                const workspace = Blockly.getMainWorkspace();
                if (workspace) {
                    console.log('Blockly workspace bulundu, doğrudan SVG oluşturuluyor...');
                    
                    try {
                        // Workspace'den SVG oluştur
                        const svg = workspace.svgBlockCanvas_.cloneNode(true);
                        svg.removeAttribute("transform");
                        
                        const svgData = new XMLSerializer().serializeToString(svg);
                        blockThumbnail = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                        console.log('Workspace SVG data URL oluşturuldu, boyut:', blockThumbnail.length);
                        
                        // SVG'yi PNG'ye dönüştür
                        const img = new Image();
                        img.src = blockThumbnail;
                        
                        img.onload = function() {
                            const canvas = document.createElement('canvas');
                            canvas.width = 600;
                            canvas.height = 400;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                            blockThumbnail = canvas.toDataURL('image/png');
                            console.log('PNG olarak block thumbnail oluşturuldu, boyut:', blockThumbnail.length);
                            
                            // Veriyi sunucuya gönder
                            sendDataToServer(xmlText, projectName, canvasThumbnail, blockThumbnail);
                        };
                        
                        // img.onload içinde sendDataToServer çağrılacağı için burada return
                        return;
                    } catch (svgError) {
                        console.error('SVG oluşturma hatası:', svgError);
                    }
                } else {
                    console.error('Blockly workspace de bulunamadı!');
                }
            }
        } catch (error) {
            console.error('Error generating block thumbnail:', error);
        }
        
        console.log('Canvas thumbnail boyutu:', canvasThumbnail.length);
        console.log('Block thumbnail boyutu:', blockThumbnail.length);
        
        // Veriyi sunucuya gönder
        sendDataToServer(xmlText, projectName, canvasThumbnail, blockThumbnail);
    });
    
    // Veriyi sunucuya gönderen fonksiyon
    function sendDataToServer(xmlText, projectName, canvasThumbnail, blockThumbnail) {
        console.log('Veriler sunucuya gönderiliyor...');
        console.log('Canvas thumbnail boyutu:', canvasThumbnail.length);
        console.log('Block thumbnail boyutu:', blockThumbnail.length);
        
        // Thumbnail'lerin varlığını kontrol et
        if (!blockThumbnail || blockThumbnail.length < 100) {
            console.warn('Block thumbnail oluşturulamadı veya çok küçük!');
        }
        
        // Send the XML data to the server
        fetch('/blockly/save/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({
                blocks: xmlText,
                name: projectName,
                canvas_thumbnail: canvasThumbnail,
                block_thumbnail: blockThumbnail
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Proje başarıyla kaydedildi!');
                console.log('Proje ID:', data.project_id);
            } else {
                alert('Proje kaydedilirken bir hata oluştu: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error saving project:', error);
            alert('Proje kaydedilirken bir hata oluştu. Lütfen tekrar deneyin.');
        });
    }
    
    // Yeni dosya oluşturma
    document.getElementById('newFile').addEventListener('click', function() {
        if (confirm('Yeni bir proje oluşturmak istediğinizden emin misiniz? Kaydedilmemiş değişiklikler kaybolacaktır.')) {
            // Workspace'i temizle
            Blockly.getMainWorkspace().clear();
            // Dosya adını 'untitled' olarak ayarla
            document.getElementById('projectName').value = 'untitled';
            // Output canvas'ı temizle
            const canvas = document.getElementById('outputCanvas');
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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
