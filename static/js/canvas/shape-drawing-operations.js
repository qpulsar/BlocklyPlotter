/**
 * Şekil Çizim İşlemleri
 * Geometrik şekiller ve kalem ayarları için canvas işlemleri
 */

// =====================================================
// GLOBAL DEĞİŞKENLER (canvas-operations.js'den erişilir)
// =====================================================

// Kalem ayarları
let penColor = '#000000';
let penSize = 2;
let backgroundColor = '#FFFFFF';

// =====================================================
// KALEM AYARLARI FONKSİYONLARI
// =====================================================

/**
 * Kalem rengini ayarla
 * @param {string} color - Renk (hex formatında)
 */
function setPenColor(color) {
    penColor = color;
    if (ctx) {
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
    }
    console.log('Kalem rengi ayarlandı:', color);
}

/**
 * Kalem kalınlığını ayarla
 * @param {number} size - Kalınlık (piksel)
 */
function setPenSize(size) {
    penSize = Math.max(1, size);
    if (ctx) {
        ctx.lineWidth = penSize;
    }
    console.log('Kalem kalınlığı ayarlandı:', penSize);
}

/**
 * RGB değerleri ile kalem rengini ayarla
 * @param {number} r - Kırmızı (0-255)
 * @param {number} g - Yeşil (0-255)
 * @param {number} b - Mavi (0-255)
 */
function setPenColorRGB(r, g, b) {
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));
    const color = `rgb(${r}, ${g}, ${b})`;
    setPenColor(color);
}

/**
 * Arkaplan rengini ayarla
 * @param {string} color - Renk (hex formatında)
 */
function setBackgroundColor(color) {
    backgroundColor = color;
    if (ctx && canvas) {
        // Arkaplanı çiz
        ctx.save();
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Koordinat sistemini ve çizimleri yeniden çiz
        drawCoordinateSystem();
        redrawAllDrawings();
        drawCursor();
    }
    console.log('Arkaplan rengi ayarlandı:', color);
}

/**
 * Mevcut kalem rengini döndür
 * @returns {string} Kalem rengi
 */
function getPenColor() {
    return penColor;
}

/**
 * Mevcut kalem kalınlığını döndür
 * @returns {number} Kalem kalınlığı
 */
function getPenSize() {
    return penSize;
}

// =====================================================
// GEOMETRİK ŞEKİL ÇİZİM FONKSİYONLARI
// =====================================================

/**
 * Daire çiz
 * @param {number} x - Merkez X koordinatı (Kartezyen)
 * @param {number} y - Merkez Y koordinatı (Kartezyen)
 * @param {number} radius - Yarıçap
 */
function drawCircle(x, y, radius) {
    if (!ctx || !canvas) return;

    const coords = toCanvasCoords(x, y);

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    // Çizimi kaydet
    saveShapeDrawing('circle', { x, y, radius, color: penColor, size: penSize });

    console.log('Daire çizildi:', x, y, radius);
}

/**
 * İçi dolu daire çiz
 * @param {number} x - Merkez X koordinatı (Kartezyen)
 * @param {number} y - Merkez Y koordinatı (Kartezyen)
 * @param {number} radius - Yarıçap
 */
function drawFilledCircle(x, y, radius) {
    if (!ctx || !canvas) return;

    const coords = toCanvasCoords(x, y);

    ctx.save();
    ctx.fillStyle = penColor;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    saveShapeDrawing('filledCircle', { x, y, radius, color: penColor });

    console.log('Dolu daire çizildi:', x, y, radius);
}

/**
 * Dikdörtgen çiz
 * @param {number} x - Sol üst köşe X koordinatı (Kartezyen)
 * @param {number} y - Sol üst köşe Y koordinatı (Kartezyen)
 * @param {number} width - Genişlik
 * @param {number} height - Yükseklik
 */
function drawRectangle(x, y, width, height) {
    if (!ctx || !canvas) return;

    const coords = toCanvasCoords(x, y);

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.strokeRect(coords.x, coords.y, width, -height);
    ctx.restore();

    saveShapeDrawing('rectangle', { x, y, width, height, color: penColor, size: penSize });

    console.log('Dikdörtgen çizildi:', x, y, width, height);
}

/**
 * İçi dolu dikdörtgen çiz
 * @param {number} x - Sol üst köşe X koordinatı (Kartezyen)
 * @param {number} y - Sol üst köşe Y koordinatı (Kartezyen)
 * @param {number} width - Genişlik
 * @param {number} height - Yükseklik
 */
function drawFilledRectangle(x, y, width, height) {
    if (!ctx || !canvas) return;

    const coords = toCanvasCoords(x, y);

    ctx.save();
    ctx.fillStyle = penColor;
    ctx.fillRect(coords.x, coords.y, width, -height);
    ctx.restore();

    saveShapeDrawing('filledRectangle', { x, y, width, height, color: penColor });

    console.log('Dolu dikdörtgen çizildi:', x, y, width, height);
}

/**
 * Düzgün çokgen çiz
 * @param {number} sides - Kenar sayısı
 * @param {number} x - Merkez X koordinatı (Kartezyen)
 * @param {number} y - Merkez Y koordinatı (Kartezyen)
 * @param {number} radius - Yarıçap
 */
function drawPolygon(sides, x, y, radius) {
    if (!ctx || !canvas) return;
    if (sides < 3) {
        console.warn('Çokgen en az 3 kenarlı olmalıdır');
        return;
    }

    const coords = toCanvasCoords(x, y);
    const angleStep = (2 * Math.PI) / sides;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2; // Üstten başla
        const px = coords.x + radius * Math.cos(angle);
        const py = coords.y + radius * Math.sin(angle);

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }

    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    saveShapeDrawing('polygon', { sides, x, y, radius, color: penColor, size: penSize });

    console.log('Çokgen çizildi:', sides, 'kenarlı', x, y, radius);
}

/**
 * Çizgi çiz
 * @param {number} x1 - Başlangıç X koordinatı (Kartezyen)
 * @param {number} y1 - Başlangıç Y koordinatı (Kartezyen)
 * @param {number} x2 - Bitiş X koordinatı (Kartezyen)
 * @param {number} y2 - Bitiş Y koordinatı (Kartezyen)
 */
function drawLine(x1, y1, x2, y2) {
    if (!ctx || !canvas) return;

    const start = toCanvasCoords(x1, y1);
    const end = toCanvasCoords(x2, y2);

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();

    saveShapeDrawing('line', { x1, y1, x2, y2, color: penColor, size: penSize });

    console.log('Çizgi çizildi:', x1, y1, '->', x2, y2);
}

/**
 * Yay çiz
 * @param {number} x - Merkez X koordinatı (Kartezyen)
 * @param {number} y - Merkez Y koordinatı (Kartezyen)
 * @param {number} radius - Yarıçap
 * @param {number} startAngle - Başlangıç açısı (derece)
 * @param {number} endAngle - Bitiş açısı (derece)
 */
function drawArc(x, y, radius, startAngle, endAngle) {
    if (!ctx || !canvas) return;

    const coords = toCanvasCoords(x, y);

    // Dereceyi radyana çevir
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, -startRad, -endRad, true);
    ctx.stroke();
    ctx.restore();

    saveShapeDrawing('arc', { x, y, radius, startAngle, endAngle, color: penColor, size: penSize });

    console.log('Yay çizildi:', x, y, radius, startAngle + '° -', endAngle + '°');
}

// =====================================================
// YARDIMCI FONKSİYONLAR
// =====================================================

// Şekil çizimlerini sakla
let shapeDrawings = [];

/**
 * Şekil çizimini kaydet
 * @param {string} type - Şekil tipi
 * @param {object} params - Şekil parametreleri
 */
function saveShapeDrawing(type, params) {
    shapeDrawings.push({ type, params });
}

/**
 * Tüm çizimleri yeniden çiz (arkaplan temizlendikten sonra)
 */
function redrawAllDrawings() {
    // Mevcut drawings dizisini çiz (canvas-operations.js'den)
    if (typeof drawings !== 'undefined') {
        drawings.forEach(drawing => {
            ctx.beginPath();
            if (drawing.penDown) {
                ctx.setLineDash([]);
            } else {
                ctx.setLineDash([5, 5]);
            }
            ctx.moveTo(drawing.from.x, drawing.from.y);
            ctx.lineTo(drawing.to.x, drawing.to.y);
            ctx.stroke();
            ctx.setLineDash([]);
        });
    }

    // Şekil çizimlerini yeniden çiz
    shapeDrawings.forEach(shape => {
        const savedColor = penColor;
        const savedSize = penSize;

        if (shape.params.color) penColor = shape.params.color;
        if (shape.params.size) penSize = shape.params.size;

        switch (shape.type) {
            case 'circle':
                drawCircleInternal(shape.params.x, shape.params.y, shape.params.radius);
                break;
            case 'filledCircle':
                drawFilledCircleInternal(shape.params.x, shape.params.y, shape.params.radius);
                break;
            case 'rectangle':
                drawRectangleInternal(shape.params.x, shape.params.y, shape.params.width, shape.params.height);
                break;
            case 'filledRectangle':
                drawFilledRectangleInternal(shape.params.x, shape.params.y, shape.params.width, shape.params.height);
                break;
            case 'polygon':
                drawPolygonInternal(shape.params.sides, shape.params.x, shape.params.y, shape.params.radius);
                break;
            case 'line':
                drawLineInternal(shape.params.x1, shape.params.y1, shape.params.x2, shape.params.y2);
                break;
            case 'arc':
                drawArcInternal(shape.params.x, shape.params.y, shape.params.radius, shape.params.startAngle, shape.params.endAngle);
                break;
        }

        penColor = savedColor;
        penSize = savedSize;
    });
}

// Internal versiyonları (kaydetme yapmadan çiz)
function drawCircleInternal(x, y, radius) {
    const coords = toCanvasCoords(x, y);
    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

function drawFilledCircleInternal(x, y, radius) {
    const coords = toCanvasCoords(x, y);
    ctx.save();
    ctx.fillStyle = penColor;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

function drawRectangleInternal(x, y, width, height) {
    const coords = toCanvasCoords(x, y);
    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.strokeRect(coords.x, coords.y, width, -height);
    ctx.restore();
}

function drawFilledRectangleInternal(x, y, width, height) {
    const coords = toCanvasCoords(x, y);
    ctx.save();
    ctx.fillStyle = penColor;
    ctx.fillRect(coords.x, coords.y, width, -height);
    ctx.restore();
}

function drawPolygonInternal(sides, x, y, radius) {
    const coords = toCanvasCoords(x, y);
    const angleStep = (2 * Math.PI) / sides;
    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const px = coords.x + radius * Math.cos(angle);
        const py = coords.y + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
}

function drawLineInternal(x1, y1, x2, y2) {
    const start = toCanvasCoords(x1, y1);
    const end = toCanvasCoords(x2, y2);
    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
}

function drawArcInternal(x, y, radius, startAngle, endAngle) {
    const coords = toCanvasCoords(x, y);
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, radius, -startRad, -endRad, true);
    ctx.stroke();
    ctx.restore();
}

/**
 * Şekil çizimlerini temizle
 */
function clearShapeDrawings() {
    shapeDrawings = [];
}

// clearCanvas fonksiyonunu güncelle - original fonksiyona hook ekle
const originalClearCanvas = typeof clearCanvas === 'function' ? clearCanvas : null;

// Sayfa yüklendiğinde clearCanvas'ı genişlet
document.addEventListener('DOMContentLoaded', function () {
    if (originalClearCanvas) {
        const oldClearCanvas = window.clearCanvas;
        window.clearCanvas = function () {
            oldClearCanvas();
            clearShapeDrawings();
            // Kalem ayarlarını sıfırla
            penColor = '#000000';
            penSize = 2;
            if (ctx) {
                ctx.strokeStyle = penColor;
                ctx.lineWidth = penSize;
            }
        };
    }
});

console.log('shape-drawing-operations.js: Şekil çizim işlemleri yüklendi');
