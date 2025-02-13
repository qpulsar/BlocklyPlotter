// Canvas çekirdek işlemleri
let canvas = null;
let ctx = null;
let penPosition = null;
let penDown = true;
let direction = 0;

// Değişken depolama sistemi
const variables = new Map();

// Canvas ve değişkenleri başlat
function initCanvas() {
    canvas = document.getElementById('outputCanvas');
    if (!canvas) {
        console.error('Canvas bulunamadı!');
        return;
    }
    
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context alınamadı!');
        return;
    }

    // Canvas boyutlarını ayarla
    canvas.width = 600;
    canvas.height = 600;
    
    // Çizgi stilini ayarla
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // Başlangıç pozisyonunu ayarla
    penPosition = {x: canvas.width / 2, y: canvas.height / 2}; // Canvas merkezi
    direction = 0; // Sağa doğru
    penDown = false; // Başlangıçta kalem yukarıda
    
    // Canvas'ı hazırla
    clearCanvas();
}

// Canvas'ı temizle
function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings = []; // Çizim geçmişini temizle
    drawCoordinateSystem();
}

// Değişken atama fonksiyonu
function setVariable(name, value) {
    variables.set(name, value);
    updateCanvas();
}

// Değişken değerini alma fonksiyonu
function getVariable(name) {
    return variables.get(name);
}

function updateCanvas() {
    if (!ctx) return;
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Koordinat sistemini çiz
    drawCoordinateSystem();
    
    // Kayıtlı çizimleri tekrar çiz
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
    
    // Değişkenleri çiz
    drawVariables();
    
    // İmleci çiz
    drawCursor();
}

export { canvas, ctx, penPosition, penDown, direction, initCanvas, clearCanvas, setVariable, getVariable };
