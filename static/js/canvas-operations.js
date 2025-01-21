// Canvas işlemleri için yardımcı fonksiyonlar
let canvas = null;
let ctx = null;
let penPosition = null;
let penDown = true;
let direction = 0;

// Canvas ve değişkenleri başlat
function initCanvas() {
    console.log('initCanvas başladı');
    canvas = document.getElementById('outputCanvas');
    if (!canvas) {
        console.error('Canvas bulunamadı!');
        return;
    }
    console.log('Canvas bulundu:', canvas);
    
    ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Canvas context alınamadı!');
        return;
    }
    console.log('Canvas context alındı');

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
    
    console.log('Canvas ayarları yapıldı, çizime başlanıyor');
    
    console.log('Canvas başlatma tamamlandı');
}

// Koordinat sistemi ve cetveli çiz
function drawCoordinateSystem() {
    //console.log('drawCoordinateSystem başladı');
    if (!ctx || !canvas) {
        console.error('Canvas veya context yok!');
        return;
    }

    const TICK_LENGTH = 5;
    const LABEL_OFFSET = 20;
    const GRID_SPACING = 50; // Her 50 piksel için bir işaret
    
    ctx.save();
    ctx.strokeStyle = '#999999';
    ctx.fillStyle = '#999999';
    ctx.lineWidth = 1;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // Yatay ve dikey eksenleri çiz
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // X ekseni işaretleri ve sayıları
    for (let x = GRID_SPACING; x < canvas.width; x += GRID_SPACING) {
        // Merkez noktasının sağı
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + x, canvas.height / 2 - TICK_LENGTH);
        ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 + TICK_LENGTH);
        ctx.stroke();
        ctx.fillText(x, canvas.width / 2 + x, canvas.height / 2 + LABEL_OFFSET);
        
        // Merkez noktasının solu
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - x, canvas.height / 2 - TICK_LENGTH);
        ctx.lineTo(canvas.width / 2 - x, canvas.height / 2 + TICK_LENGTH);
        ctx.stroke();
        ctx.fillText(-x, canvas.width / 2 - x, canvas.height / 2 + LABEL_OFFSET);
    }
    
    // Y ekseni işaretleri ve sayıları
    for (let y = GRID_SPACING; y < canvas.height; y += GRID_SPACING) {
        // Merkez noktasının üstü
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - TICK_LENGTH, canvas.height / 2 - y);
        ctx.lineTo(canvas.width / 2 + TICK_LENGTH, canvas.height / 2 - y);
        ctx.stroke();
        ctx.fillText(y, canvas.width / 2 - LABEL_OFFSET, canvas.height / 2 - y);
        
        // Merkez noktasının altı
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - TICK_LENGTH, canvas.height / 2 + y);
        ctx.lineTo(canvas.width / 2 + TICK_LENGTH, canvas.height / 2 + y);
        ctx.stroke();
        ctx.fillText(-y, canvas.width / 2 - LABEL_OFFSET, canvas.height / 2 + y);
    }
    
    // Merkez noktası (0,0)
    ctx.fillText('0', canvas.width / 2 - LABEL_OFFSET / 2, canvas.height / 2 + LABEL_OFFSET);
    
    ctx.restore();
    //console.log('drawCoordinateSystem tamamlandı');
}

// İmleç boyutu ve rengi
const CURSOR_SIZE = 20;
const CURSOR_COLOR = '#3498db';  // Mavi renk
const CURSOR_LINE_WIDTH = 2;

function drawCursor() {
    if (!ctx || !penPosition) return;

    // İmlecin mevcut durumunu kaydet
    ctx.save();

    // İmleci merkeze taşı ve döndür
    ctx.translate(penPosition.x, penPosition.y);
    ctx.rotate(direction * Math.PI / 180);

    // Ok başını çiz
    ctx.beginPath();
    ctx.fillStyle = CURSOR_COLOR;
    ctx.moveTo(-CURSOR_SIZE, CURSOR_SIZE/2);  // Sol alt
    ctx.lineTo(CURSOR_SIZE, 0);               // Ok ucu
    ctx.lineTo(-CURSOR_SIZE, -CURSOR_SIZE/2); // Sol üst
    ctx.lineTo(-CURSOR_SIZE/2, 0);            // İç girinti
    ctx.closePath();
    ctx.fill();

    // İmlecin durumunu geri yükle
    ctx.restore();
}

// Çizimleri saklamak için global bir dizi
let drawings = [];

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
            // Normal çizgi
            ctx.setLineDash([]); 
        } else {
            // Kesikli çizgi
            ctx.setLineDash([5, 5]); 
        }
        ctx.moveTo(drawing.from.x, drawing.from.y);
        ctx.lineTo(drawing.to.x, drawing.to.y);
        ctx.stroke();
        // Çizgi stilini sıfırla
        ctx.setLineDash([]); 
    });
    
    // İmleci çiz
    drawCursor();
}

function moveSteps(steps) {
    // Önceki konumu kaydet
    const oldX = penPosition.x;
    const oldY = penPosition.y;

    // Yeni konumu hesapla (açıyı saat yönünün tersine çevir)
    const angleRad = (direction) * Math.PI / 180;
    penPosition.x += steps * Math.cos(angleRad);
    penPosition.y += steps * Math.sin(angleRad);

    // Hareketi kaydet (kalem durumu ile birlikte)
    drawings.push({
        from: {x: oldX, y: oldY},
        to: {x: penPosition.x, y: penPosition.y},
        penDown: penDown
    });

    // Canvas'ı güncelle
    updateCanvas();
}

function clearCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings = []; // Çizim geçmişini temizle
    drawCoordinateSystem();
    drawCursor();
}

function gotoXY(x, y) {
    const canvasCoords = toCanvasCoords(x, y);
    penPosition.x = canvasCoords.x;
    penPosition.y = canvasCoords.y;
    updateCanvas();
}

function gotoRandom() {
    const x = Math.random() * outputCanvas.width - outputCanvas.width / 2;
    const y = Math.random() * outputCanvas.height - outputCanvas.height / 2;
    gotoXY(x, y);
}

function setDirection(angle) {
    direction = -angle;
    updateCanvas();
}

function setPenDown() {
    penDown = true;
    updateCanvas();
}

function setPenUp() {
    penDown = false;
    updateCanvas();
}

function turnRight(angle) {
    direction += angle;
    updateCanvas();
}

function turnLeft(angle) {
    direction -= angle;
    updateCanvas();
}

function changeX(x) {
    penPosition.x += x;
    updateCanvas();
}

function changeY(y) {
    penPosition.y += y;
    updateCanvas();
}

function setX(x) {
    penPosition.x = canvas.width / 2 + x;
    updateCanvas();
}

function setY(y) {
    penPosition.y = canvas.height / 2 - y;
    updateCanvas();
}

// Blok çalıştırma fonksiyonu
async function executeBlock(block) {
    if (!block) return;
    
    switch (block.type) {
        case 'pen_down':
            setPenDown();
            break;
            
        case 'pen_up':
            setPenUp();
            break;
            
        case 'move_steps':
            var input = block.getInput('STEPS');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var steps = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    moveSteps(steps);
                }
            }
            break;
            
        case 'turn_right':
            var input = block.getInput('ANGLE');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var angle = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    turnRight(angle);
                }
            }
            break;
            
        case 'turn_left':
            var input = block.getInput('ANGLE');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var angle = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    turnLeft(angle);
                }
            }
            break;
            
        case 'goto_xy':
            var xInput = block.getInput('X');
            var yInput = block.getInput('Y');
            var x = 0, y = 0;
            
            if (xInput && xInput.connection && xInput.connection.targetBlock()) {
                var xBlock = xInput.connection.targetBlock();
                if (xBlock.type === 'math_number') {
                    x = parseInt(xBlock.getFieldValue('NUM'), 10) || 0;
                }
            }
            
            if (yInput && yInput.connection && yInput.connection.targetBlock()) {
                var yBlock = yInput.connection.targetBlock();
                if (yBlock.type === 'math_number') {
                    y = parseInt(yBlock.getFieldValue('NUM'), 10) || 0;
                }
            }
            
            gotoXY(x, y);
            break;
            
        case 'goto_random':
            gotoRandom();
            break;

        case 'set_direction':
            var input = block.getInput('ANGLE');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var angle = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    setDirection(-angle);
                }
            }
            break;

        case 'change_x':
            var input = block.getInput('DX');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var dx = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    changeX(dx);
                }
            }
            break;

        case 'change_y':
            var input = block.getInput('DY');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var dy = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    changeY(dy);
                }
            }
            break;

        case 'set_x':
            var input = block.getInput('X');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var x = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    setX(x);
                }
            }
            break;

        case 'set_y':
            var input = block.getInput('Y');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var y = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    setY(y);
                }
            }
            break;

        case 'repeat_times':
            var input = block.getInput('TIMES');
            if (input && input.connection && input.connection.targetBlock()) {
                var numberBlock = input.connection.targetBlock();
                if (numberBlock.type === 'math_number') {
                    var times = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                    await repeat_times(times, block.id);
                } else {
                    console.warn("Bağlı blok math_number değil:", numberBlock.type);
                }
            } else {
                console.warn("TIMES girişine bağlı blok bulunamadı.");
            }
            break;
            case 'wait_seconds':
                var input = block.getInput('SECONDS');
                if (input && input.connection && input.connection.targetBlock()) {
                    var numberBlock = input.connection.targetBlock();
                    if (numberBlock.type === 'math_number') {
                        var seconds = parseInt(numberBlock.getFieldValue('NUM'), 10) || 0;
                        await wait_seconds(seconds);
                    }
                }
                break;
            
        case 'forever':
            await forever_loop(block.id);
            break;

        case 'if':
            var condition = false;
            var conditionBlock = block.getInputTargetBlock('CONDITION');
            if (conditionBlock) {
                switch (conditionBlock.type) {
                    case 'logic_boolean':
                        condition = conditionBlock.getFieldValue('BOOL') === 'TRUE';
                        break;
                    case 'comparison_block':
                        condition = await evaluateComparison(conditionBlock);
                        break;
                    case 'logic_and':
                    case 'logic_or':
                        condition = await evaluateLogicOperation(conditionBlock);
                        break;
                    default:
                        console.warn('Desteklenmeyen koşul bloğu:', conditionBlock.type);
                }
            }
            
            if (condition) {
                var childBlock = block.getInputTargetBlock('DO');
                while (childBlock) {
                    await executeBlock(childBlock);
                    childBlock = childBlock.getNextBlock();
                }
            }
            break;

        default:
            console.warn('Bilinmeyen blok tipi:', block.type);
    }
}

// Karşılaştırma bloğu için yardımcı fonksiyon
async function evaluateComparison(block) {
    const operator = block.getFieldValue('OP');
    const valueA = await executeBlock(block.getInputTargetBlock('A'));
    const valueB = await executeBlock(block.getInputTargetBlock('B'));
    
    switch (operator) {
        case 'EQ':
            return valueA == valueB;
        case 'NEQ':
            return valueA != valueB;
        case 'LT':
            return valueA < valueB;
        case 'LTE':
            return valueA <= valueB;
        case 'GT':
            return valueA > valueB;
        case 'GTE':
            return valueA >= valueB;
        default:
            return false;
    }
}

// Tekrar bloğu için yardımcı fonksiyon
async function repeat_times(times, blockId) {
    if (times <= 0) return;

    var block = workspace.getBlockById(blockId);
    if (block) {
        var childBlock = block.getInputTargetBlock('DO');
        
        for (let i = 0; i < times; i++) {
            let currentBlock = childBlock;
            
            // Execute each child block
            while (currentBlock) {
                await executeBlock(currentBlock);
            }
            
        }
    }
}

// Sonsuz döngü bloğu için yardımcı fonksiyon
async function forever_loop(blockId) {
    var block = workspace.getBlockById(blockId);
    if (block) {
        var childBlock = block.getInputTargetBlock('DO');
        
        // Sonsuz döngü
        while (true) {
            let currentBlock = childBlock;
            
            // İçerideki her bloğu çalıştır
            while (currentBlock) {
                await executeBlock(currentBlock);
                currentBlock = currentBlock.getNextBlock();
            }
            
            // Döngünün her iterasyonunda küçük bir bekleme ekle
            // Bu, tarayıcının donmasını önler
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    }
}

// Koordinat dönüşümü: Kartezyen koordinatlardan canvas koordinatlarına
function toCanvasCoords(x, y) {
    return {
        x: canvas.width / 2 + x,
        y: canvas.height / 2 - y  // Y ekseni ters olduğu için çıkarma işlemi
    };
}

// Koordinat dönüşümü: Canvas koordinatlarından Kartezyen koordinatlara
function toCartesianCoords(canvasX, canvasY) {
    return {
        x: canvasX - canvas.width / 2,
        y: canvas.height / 2 - canvasY
    };
}

// Belirtilen süre kadar bekler (milisaniye cinsinden)
function wait_seconds(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

// Sayfa yüklendiğinde canvas'ı başlat
document.addEventListener('DOMContentLoaded', function () {
    initCanvas();
    console.log('Canvas initialized');

    // Mouse koordinatlarını takip et
    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;
        
        // Canvas koordinatlarını Kartezyen koordinatlara çevir
        const coords = toCartesianCoords(canvasX, canvasY);
        
        // Koordinatları status bar'da göster
        const coordsElement = document.getElementById('coordinates');
        coordsElement.textContent = `x: ${Math.round(coords.x)}, y: ${Math.round(coords.y)}`;
    });

    // Mouse canvas dışına çıktığında koordinatları sıfırla
    canvas.addEventListener('mouseout', function() {
        const coordsElement = document.getElementById('coordinates');
        coordsElement.textContent = 'x: 0, y: 0';
    });
});
