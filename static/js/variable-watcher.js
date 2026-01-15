/**
 * Değişken İzleme Paneli (Variable Watcher)
 * Değişken değerlerini gerçek zamanlı olarak gösterir
 */

// =====================================================
// GLOBAL DEĞİŞKENLER
// =====================================================

let variableWatcherVisible = false;
let watchedVariables = new Set();
let watcherUpdateInterval = null;

// =====================================================
// UI OLUŞTURMA
// =====================================================

/**
 * Değişken izleme paneli UI'ını oluştur
 */
function createVariableWatcherUI() {
    // Zaten varsa tekrar oluşturma
    if (document.getElementById('variableWatcher')) {
        return;
    }

    // Ana container
    const watcher = document.createElement('div');
    watcher.id = 'variableWatcher';
    watcher.className = 'variable-watcher';
    watcher.innerHTML = `
        <div class="variable-watcher-header">
            <span class="variable-watcher-title">📊 Değişken İzleme</span>
            <div class="variable-watcher-controls">
                <button id="addWatchBtn" class="btn btn-sm btn-outline-primary" title="Değişken Ekle">
                    <i class="fas fa-plus"></i>
                </button>
                <button id="clearWatchBtn" class="btn btn-sm btn-outline-danger" title="Temizle">
                    <i class="fas fa-trash"></i>
                </button>
                <button id="toggleWatcherBtn" class="btn btn-sm btn-outline-secondary" title="Küçült">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
        <div class="variable-watcher-body" id="variableWatcherBody">
            <div class="variable-watcher-empty">
                <p>İzlenecek değişken yok</p>
                <small>Değişken eklemek için + butonuna tıklayın</small>
            </div>
        </div>
    `;

    // Stiller
    const styles = document.createElement('style');
    styles.textContent = `
        .variable-watcher {
            position: fixed;
            top: 70px;
            right: 20px;
            width: 250px;
            max-height: 400px;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid #0f3460;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .variable-watcher.minimized {
            max-height: 42px;
        }
        
        .variable-watcher.minimized .variable-watcher-body {
            display: none;
        }
        
        .variable-watcher-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid #0f3460;
            cursor: move;
        }
        
        .variable-watcher-title {
            color: #e94560;
            font-weight: 600;
            font-size: 14px;
        }
        
        .variable-watcher-controls button {
            margin-left: 5px;
            padding: 2px 6px;
            font-size: 12px;
        }
        
        .variable-watcher-body {
            padding: 10px;
            max-height: 350px;
            overflow-y: auto;
        }
        
        .variable-watcher-empty {
            text-align: center;
            color: #888;
            padding: 20px;
        }
        
        .variable-watcher-empty p {
            margin: 0;
            font-size: 14px;
        }
        
        .variable-watcher-empty small {
            font-size: 11px;
            opacity: 0.7;
        }
        
        .variable-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            margin-bottom: 6px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border-left: 3px solid #e94560;
            transition: all 0.2s ease;
        }
        
        .variable-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .variable-name {
            color: #fff;
            font-weight: 500;
            font-size: 13px;
        }
        
        .variable-value {
            color: #53cff5;
            font-family: 'Fira Code', 'Courier New', monospace;
            font-size: 13px;
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 8px;
            border-radius: 4px;
        }
        
        .variable-remove {
            margin-left: 8px;
            color: #e94560;
            cursor: pointer;
            opacity: 0.6;
            transition: opacity 0.2s;
        }
        
        .variable-remove:hover {
            opacity: 1;
        }
        
        /* Modal stili */
        .add-variable-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .add-variable-modal-content {
            background: #1a1a2e;
            border: 1px solid #0f3460;
            border-radius: 12px;
            padding: 20px;
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .add-variable-modal-title {
            color: #e94560;
            margin-bottom: 15px;
            font-size: 16px;
        }
        
        .variable-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin-bottom: 5px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            cursor: pointer;
            color: #fff;
            transition: background 0.2s;
        }
        
        .variable-list-item:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .variable-list-item.selected {
            background: rgba(233, 69, 96, 0.3);
            border: 1px solid #e94560;
        }
    `;

    document.head.appendChild(styles);
    document.body.appendChild(watcher);

    // Event listeners
    setupWatcherEventListeners();

    // Sürükleme özelliği
    makeWatcherDraggable();
}

/**
 * Event listener'ları ayarla
 */
function setupWatcherEventListeners() {
    // Toggle butonu
    document.getElementById('toggleWatcherBtn').addEventListener('click', function () {
        const watcher = document.getElementById('variableWatcher');
        watcher.classList.toggle('minimized');
        this.innerHTML = watcher.classList.contains('minimized')
            ? '<i class="fas fa-plus"></i>'
            : '<i class="fas fa-minus"></i>';
    });

    // Değişken ekle butonu
    document.getElementById('addWatchBtn').addEventListener('click', showAddVariableModal);

    // Temizle butonu
    document.getElementById('clearWatchBtn').addEventListener('click', function () {
        watchedVariables.clear();
        updateWatcherDisplay();
    });
}

/**
 * Paneli sürüklenebilir yap
 */
function makeWatcherDraggable() {
    const watcher = document.getElementById('variableWatcher');
    const header = watcher.querySelector('.variable-watcher-header');

    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;
        isDragging = true;
        offsetX = e.clientX - watcher.offsetLeft;
        offsetY = e.clientY - watcher.offsetTop;
        watcher.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        watcher.style.left = (e.clientX - offsetX) + 'px';
        watcher.style.top = (e.clientY - offsetY) + 'px';
        watcher.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        watcher.style.cursor = '';
    });
}

// =====================================================
// DEĞİŞKEN EKLEME MODAL
// =====================================================

/**
 * Değişken ekleme modalını göster
 */
function showAddVariableModal() {
    // Mevcut değişkenleri al
    const variables = workspace.getVariableMap().getAllVariables();

    const modal = document.createElement('div');
    modal.className = 'add-variable-modal';
    modal.id = 'addVariableModal';

    let variableListHTML = '';
    if (variables.length === 0) {
        variableListHTML = '<p style="color: #888; text-align: center;">Henüz değişken oluşturulmamış</p>';
    } else {
        variables.forEach(variable => {
            const isWatched = watchedVariables.has(variable.name);
            variableListHTML += `
                <div class="variable-list-item ${isWatched ? 'selected' : ''}" 
                     data-var-name="${variable.name}">
                    <span>${variable.name}</span>
                    ${isWatched ? '<i class="fas fa-check" style="color: #4caf50;"></i>' : ''}
                </div>
            `;
        });
    }

    modal.innerHTML = `
        <div class="add-variable-modal-content">
            <h4 class="add-variable-modal-title">İzlenecek Değişken Seç</h4>
            <div id="variableListContainer">
                ${variableListHTML}
            </div>
            <div style="margin-top: 15px; text-align: right;">
                <button class="btn btn-sm btn-secondary" id="closeModalBtn">Kapat</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.remove();
    });

    // Değişken seçimi
    modal.querySelectorAll('.variable-list-item').forEach(item => {
        item.addEventListener('click', () => {
            const varName = item.dataset.varName;

            if (watchedVariables.has(varName)) {
                watchedVariables.delete(varName);
                item.classList.remove('selected');
                item.querySelector('i')?.remove();
            } else {
                watchedVariables.add(varName);
                item.classList.add('selected');
                item.innerHTML += '<i class="fas fa-check" style="color: #4caf50;"></i>';
            }

            updateWatcherDisplay();
        });
    });
}

// =====================================================
// GÖRÜNTÜLEME GÜNCELLEMESİ
// =====================================================

/**
 * İzleme panelini güncelle
 */
function updateWatcherDisplay() {
    const body = document.getElementById('variableWatcherBody');
    if (!body) return;

    if (watchedVariables.size === 0) {
        body.innerHTML = `
            <div class="variable-watcher-empty">
                <p>İzlenecek değişken yok</p>
                <small>Değişken eklemek için + butonuna tıklayın</small>
            </div>
        `;
        return;
    }

    let html = '';
    watchedVariables.forEach(varName => {
        const value = runtimeVariables[varName];
        const displayValue = value !== undefined ? formatValue(value) : 'tanımsız';

        html += `
            <div class="variable-item">
                <span class="variable-name">${varName}</span>
                <span class="variable-value">${displayValue}</span>
                <span class="variable-remove" data-var="${varName}" title="Kaldır">
                    <i class="fas fa-times"></i>
                </span>
            </div>
        `;
    });

    body.innerHTML = html;

    // Kaldır butonlarına event listener ekle
    body.querySelectorAll('.variable-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            watchedVariables.delete(btn.dataset.var);
            updateWatcherDisplay();
        });
    });
}

/**
 * Değeri formatlı şekilde göster
 */
function formatValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'tanımsız';
    if (typeof value === 'number') {
        return Number.isInteger(value) ? value.toString() : value.toFixed(2);
    }
    if (typeof value === 'boolean') return value ? 'doğru' : 'yanlış';
    if (typeof value === 'string') return `"${value}"`;
    if (Array.isArray(value)) return `[${value.length} öğe]`;
    return String(value);
}

// =====================================================
// OTOMATIK GÜNCELLEME
// =====================================================

/**
 * Otomatik güncellemeyi başlat
 */
function startWatcherUpdates() {
    if (watcherUpdateInterval) return;

    watcherUpdateInterval = setInterval(() => {
        if (watchedVariables.size > 0) {
            updateWatcherDisplay();
        }
    }, 100); // Her 100ms'de güncelle
}

/**
 * Otomatik güncellemeyi durdur
 */
function stopWatcherUpdates() {
    if (watcherUpdateInterval) {
        clearInterval(watcherUpdateInterval);
        watcherUpdateInterval = null;
    }
}

// =====================================================
// İZLEME PANELİNİ TOGGLE
// =====================================================

/**
 * İzleme panelini göster/gizle
 */
function toggleVariableWatcher() {
    const watcher = document.getElementById('variableWatcher');
    if (!watcher) {
        createVariableWatcherUI();
        startWatcherUpdates();
        variableWatcherVisible = true;
    } else {
        watcher.style.display = watcher.style.display === 'none' ? 'block' : 'none';
        variableWatcherVisible = watcher.style.display !== 'none';

        if (variableWatcherVisible) {
            startWatcherUpdates();
        } else {
            stopWatcherUpdates();
        }
    }
}

/**
 * İzleme panelini göster
 */
function showVariableWatcher() {
    const watcher = document.getElementById('variableWatcher');
    if (!watcher) {
        createVariableWatcherUI();
    } else {
        watcher.style.display = 'block';
    }
    startWatcherUpdates();
    variableWatcherVisible = true;
}

/**
 * İzleme panelini gizle
 */
function hideVariableWatcher() {
    const watcher = document.getElementById('variableWatcher');
    if (watcher) {
        watcher.style.display = 'none';
    }
    stopWatcherUpdates();
    variableWatcherVisible = false;
}

// =====================================================
// BAŞLATMA
// =====================================================

// Sayfa yüklendiğinde izleme panelini oluştur
document.addEventListener('DOMContentLoaded', function () {
    // Paneli oluştur ama gizli başlat
    createVariableWatcherUI();

    // İzleme güncellemelerini başlat
    startWatcherUpdates();

    console.log('variable-watcher.js: Değişken izleme paneli yüklendi');
});

console.log('variable-watcher.js: Değişken izleme modülü yüklendi');
