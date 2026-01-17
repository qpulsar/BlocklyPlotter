/**
 * Modal Utility Fonksiyonları
 * Modern, şık modal diyalogları için yardımcı fonksiyonlar
 */

// Modal container'ı oluştur (sayfa başına bir kere)
function createModalContainer() {
    if (document.getElementById('modalContainer')) return;

    const container = document.createElement('div');
    container.id = 'modalContainer';
    document.body.appendChild(container);
}

/**
 * Bilgilendirme modal'ı göster
 * @param {string} title - Modal başlığı
 * @param {string} message - Modal mesajı
 * @param {string} type - Modal tipi: 'success', 'error', 'info', 'warning'
 */
function showModal(title, message, type = 'info') {
    createModalContainer();

    const container = document.getElementById('modalContainer');

    // Renk ve ikon belirleme
    const config = {
        success: {
            color: '#4caf50',
            icon: '✓',
            bgGradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))'
        },
        error: {
            color: '#e94560',
            icon: '✗',
            bgGradient: 'linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(233, 69, 96, 0.05))'
        },
        warning: {
            color: '#ff9800',
            icon: '⚠',
            bgGradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05))'
        },
        info: {
            color: '#4cc9f0',
            icon: 'ℹ',
            bgGradient: 'linear-gradient(135deg, rgba(76, 201, 240, 0.1), rgba(76, 201, 240, 0.05))'
        }
    };

    const currentConfig = config[type] || config.info;

    // Modal HTML
    const modalHTML = `
        <div class="custom-modal-backdrop" onclick="this.parentElement.remove()">
            <div class="custom-modal" onclick="event.stopPropagation()" style="background: ${currentConfig.bgGradient}">
                <div class="custom-modal-header">
                    <div class="custom-modal-icon" style="color: ${currentConfig.color}">
                        ${currentConfig.icon}
                    </div>
                    <h3 class="custom-modal-title">${title}</h3>
                </div>
                <div class="custom-modal-body">
                    <p class="custom-modal-message">${message}</p>
                </div>
                <div class="custom-modal-footer">
                    <button class="custom-modal-btn custom-modal-btn-primary" style="background: ${currentConfig.color}" onclick="this.closest('.custom-modal-backdrop').remove()">
                        Tamam
                    </button>
                </div>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', modalHTML);

    // ESC tuşu ile kapatma
    const backdrop = container.lastElementChild;
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            backdrop.remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    // Animasyon için küçük gecikme
    setTimeout(() => backdrop.classList.add('show'), 10);
}

/**
 * Onay modal'ı göster (Promise döndürür)
 * @param {string} title - Modal başlığı
 * @param {string} message - Modal mesajı
 * @param {string} confirmText - Onay butonu metni (varsayılan: "Tamam")
 * @param {string} cancelText - İptal butonu metni (varsayılan: "İptal")
 * @returns {Promise<boolean>} - Kullanıcı onayladıysa true, iptal ettiyse false
 */
function showConfirmModal(title, message, confirmText = 'Tamam', cancelText = 'İptal') {
    createModalContainer();

    return new Promise((resolve) => {
        const container = document.getElementById('modalContainer');

        // Modal HTML
        const modalHTML = `
            <div class="custom-modal-backdrop">
                <div class="custom-modal" onclick="event.stopPropagation()">
                    <div class="custom-modal-header">
                        <div class="custom-modal-icon" style="color: #ff9800">
                            ?
                        </div>
                        <h3 class="custom-modal-title">${title}</h3>
                    </div>
                    <div class="custom-modal-body">
                        <p class="custom-modal-message">${message}</p>
                    </div>
                    <div class="custom-modal-footer">
                        <button class="custom-modal-btn custom-modal-btn-secondary" data-action="cancel">
                            ${cancelText}
                        </button>
                        <button class="custom-modal-btn custom-modal-btn-primary" data-action="confirm" style="background: #4caf50">
                            ${confirmText}
                        </button>
                    </div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', modalHTML);
        const backdrop = container.lastElementChild;

        // Buton event handler'ları
        backdrop.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', () => {
                const confirmed = btn.dataset.action === 'confirm';
                backdrop.remove();
                document.removeEventListener('keydown', escHandler);
                resolve(confirmed);
            });
        });

        // Backdrop click ile iptal
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.remove();
                document.removeEventListener('keydown', escHandler);
                resolve(false);
            }
        });

        // ESC tuşu ile iptal
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                backdrop.remove();
                document.removeEventListener('keydown', escHandler);
                resolve(false);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Animasyon
        setTimeout(() => backdrop.classList.add('show'), 10);
    });
}

// Stil tanımlamaları (sayfa yüklendiğinde ekle)
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('customModalStyles')) return;

    const styles = document.createElement('style');
    styles.id = 'customModalStyles';
    styles.textContent = `
        .custom-modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .custom-modal-backdrop.show {
            opacity: 1;
        }
        
        .custom-modal {
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 32px;
            min-width: 320px;
            max-width: 500px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            transform: translateY(20px);
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .custom-modal-backdrop.show .custom-modal {
            transform: translateY(0);
        }
        
        .custom-modal-header {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 20px;
        }
        
        .custom-modal-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            background: rgba(255, 255, 255, 0.1);
            flex-shrink: 0;
        }
        
        .custom-modal-title {
            color: #fff;
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        
        .custom-modal-body {
            margin-bottom: 24px;
        }
        
        .custom-modal-message {
            color: rgba(255, 255, 255, 0.9);
            font-size: 15px;
            line-height: 1.6;
            margin: 0;
            font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        
        .custom-modal-footer {
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }
        
        .custom-modal-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Inter', 'Segoe UI', sans-serif;
        }
        
        .custom-modal-btn-primary {
            background: #4cc9f0;
            color: #fff;
        }
        
        .custom-modal-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(76, 201, 240, 0.4);
        }
        
        .custom-modal-btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.9);
        }
        
        .custom-modal-btn-secondary:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
        
        .custom-modal-btn:active {
            transform: scale(0.98);
        }
    `;

    document.head.appendChild(styles);
});

console.log('modal-utils.js: Modal utility fonksiyonları yüklendi');
