// Blokları kaydetme ve yükleme işlemleri
document.getElementById('saveButton').addEventListener('click', function() {
    var xmlDom = Blockly.serialization.workspaces.save(workspace);
    var xmlText = JSON.stringify(xmlDom);
    
    fetch('/blockly/save/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            blocks: xmlText
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Bloklar başarıyla kaydedildi!');
        } else {
            alert('Bloklar kaydedilirken bir hata oluştu: ' + (data.error || 'Bilinmeyen hata'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Bloklar kaydedilirken bir hata oluştu.');
    });
});

document.getElementById('loadButton').addEventListener('click', function() {
    fetch('/blockly/load/')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            try {
                // Mevcut workspace'i temizle
                workspace.clear();
                
                // JSON'dan blokları yükle
                const blocks = JSON.parse(data.blocks);
                Blockly.serialization.workspaces.load(blocks, workspace);
                
                alert('Bloklar başarıyla yüklendi!');
            } catch (e) {
                console.error('Parsing error:', e);
                alert('Bloklar yüklenirken bir hata oluştu: ' + e.message);
            }
        } else {
            alert('Bloklar yüklenirken bir hata oluştu: ' + (data.error || 'Bilinmeyen hata'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Bloklar yüklenirken bir hata oluştu.');
    });
});

// CSRF token'ı almak için yardımcı fonksiyon
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
