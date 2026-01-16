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
            <div class="header-left">
                <span class="variable-watcher-title">📊 Değişkenler</span>
                <button id="addWatchBtn" class="btn-icon" title="Değişken Ekle">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="header-right">
                <button id="clearWatchBtn" class="btn-icon danger" title="Hepsini Temizle">
                    <i class="fas fa-trash-alt"></i>
                </button>
                <div class="divider-vertical"></div>
                <button id="toggleWatcherBtn" class="btn-icon" title="Küçült/Büyüt">
                    <i class="fas fa-chevron-down"></i>
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
            width: 260px;
            max-height: 450px;
            background: rgba(26, 26, 46, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            font-family: 'Inter', 'Segoe UI', sans-serif;
            overflow: hidden;
            transition: width 0.3s ease, max-height 0.3s ease, opacity 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        
        .variable-watcher.minimized {
            max-height: 46px;
        }
        
        .variable-watcher-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            background: rgba(255, 255, 255, 0.03);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            cursor: grab;
            user-select: none;
        }
        
        .variable-watcher-header:active {
            cursor: grabbing;
        }
        
        .header-left, .header-right {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .variable-watcher-title {
            color: #fff;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.3px;
            margin-right: 4px;
        }

        .btn-icon {
            background: transparent;
            border: none;
            color: rgba(255, 255, 255, 0.6);
            width: 28px;
            height: 28px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }

        .btn-icon:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            transform: translateY(-1px);
        }

        .btn-icon.danger:hover {
            background: rgba(233, 69, 96, 0.2);
            color: #e94560;
        }
        
        .divider-vertical {
            width: 1px;
            height: 16px;
            background: rgba(255, 255, 255, 0.1);
            margin: 0 4px;
        }
        
        .variable-watcher-body {
            padding: 12px;
            overflow-y: auto;
            flex: 1;
        }
        
        .variable-watcher-empty {
            text-align: center;
            color: rgba(255, 255, 255, 0.4);
            padding: 30px 10px;
        }
        
        .variable-watcher-empty p {
            margin: 0 0 5px 0;
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
            padding: 10px 14px;
            margin-bottom: 8px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border-left: 3px solid #e94560;
            transition: all 0.2s ease;
        }
        
        .variable-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(2px);
        }
        
        .variable-name {
            color: rgba(255, 255, 255, 0.9);
            font-weight: 500;
            font-size: 13px;
        }
        
        .variable-value {
            color: #4cc9f0;
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: 13px;
            font-weight: 500;
            background: rgba(0, 0, 0, 0.3);
            padding: 3px 8px;
            border-radius: 6px;
            min-width: 40px;
            text-align: center;
        }
        
        .variable-remove {
            margin-left: 10px;
            color: rgba(233, 69, 96, 0.6);
            cursor: pointer;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
        }
        
        .variable-remove:hover {
            color: #e94560;
            background: rgba(233, 69, 96, 0.1);
        }

        /* Scrollbar */
        .variable-watcher-body::-webkit-scrollbar {
            width: 6px;
        }
        
        .variable-watcher-body::-webkit-scrollbar-track {
            background: transparent;
        }
        
        .variable-watcher-body::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
        }

        .variable-watcher-body::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        /* Modal stili */
        .add-variable-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.2s ease-out;
        }
        
        .add-variable-modal-content {
            background: #1a1a2e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 24px;
            width: 320px;
            max-height: 450px;
            overflow-y: auto;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .add-variable-modal-title {
            color: #fff;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
        }
        
        .variable-list-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            margin-bottom: 8px;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid transparent;
            border-radius: 10px;
            cursor: pointer;
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.2s;
        }
        
        .variable-list-item:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: translateY(-1px);
        }
        
        .variable-list-item.selected {
            background: rgba(233, 69, 96, 0.15);
            border-color: rgba(233, 69, 96, 0.5);
            color: #fff;
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
        const icon = this.querySelector('i');
        if (watcher.classList.contains('minimized')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });

    // Değişken ekle butonu
    document.getElementById('addWatchBtn').addEventListener('click', showAddVariableModal);

    // Temizle butonu
    document.getElementById('clearWatchBtn').addEventListener('click', function () {
        watchedVariables.clear();
        updateWatcherDisplay();
    });

    // Event-based güncelleme (Anlık Tepki)
    document.addEventListener('blockly-variable-changed', function (e) {
        const { name, value } = e.detail;

        // Eğer değişken izleniyorsa güncelle
        if (watchedVariables.has(name)) {
            // Tüm listeyi güncellemek yerine sadece ilgili elemanı bulup güncelleyebiliriz
            // Ama şimdilik basit tutmak için updateWatcherDisplay çağırıyoruz
            // Performans sorunu olursa burası optimize edilebilir
            updateWatcherDisplay();
        }
    });
}

/**
 * Paneli sürüklenebilir yap
 */
/**
 * Paneli sürüklenebilir yap (Optimize edilmiş)
 */
function makeWatcherDraggable() {
    const watcher = document.getElementById('variableWatcher');
    const header = watcher.querySelector('.variable-watcher-header');

    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;
    let rafId = null;

    header.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;
        isDragging = true;

        startX = e.clientX;
        startY = e.clientY;

        const rect = watcher.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        watcher.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none'; // Metin seçimini engelle
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();

        if (rafId) return; // Zaten bir güncelleme sıradaysa bekle

        rafId = requestAnimationFrame(() => {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            watcher.style.left = (initialLeft + dx) + 'px';
            watcher.style.top = (initialTop + dy) + 'px';
            watcher.style.right = 'auto'; // Right özelliğini sıfırla

            rafId = null;
        });
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        watcher.style.cursor = '';
        document.body.style.userSelect = '';
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
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
        // window.runtimeVariables üzerinden erişim sağla
        const value = window.runtimeVariables ? window.runtimeVariables[varName] : undefined;
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
/**
 * Otomatik güncellemeyi başlat
 * Event-driven yapı asıl yöntemdir, ancak fallback olarak polling de ekliyoruz.
 */
function startWatcherUpdates() {
    updateWatcherDisplay();

    // Fallback polling (Her 500ms'de bir kontrol et)
    if (!watcherUpdateInterval) {
        watcherUpdateInterval = setInterval(() => {
            if (watchedVariables.size > 0) {
                updateWatcherDisplay();
            }
        }, 500);
    }
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
