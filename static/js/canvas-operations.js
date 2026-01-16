// Canvas işlemleri için yardımcı fonksiyonlar
let canvas = null;
let ctx = null;
let penPosition = null;
let penDown = true;
let direction = 0;

// Zamanlayıcı sistemi
let timerStartTime = Date.now();

// Mesaj sistemi için event listeners
const messageListeners = {};

// Program durumu
let programRunning = true;

// Çalışma zamanı değişkenleri
window.runtimeVariables = {};
let runtimeVariables = window.runtimeVariables;

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
    penPosition = { x: canvas.width / 2, y: canvas.height / 2 }; // Canvas merkezi
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
    ctx.rotate(-direction * Math.PI / 180);

    // Ok başını çiz
    ctx.beginPath();
    ctx.fillStyle = CURSOR_COLOR;
    ctx.moveTo(-CURSOR_SIZE, CURSOR_SIZE / 2);  // Sol alt
    ctx.lineTo(CURSOR_SIZE, 0);               // Ok ucu
    ctx.lineTo(-CURSOR_SIZE, -CURSOR_SIZE / 2); // Sol üst
    ctx.lineTo(-CURSOR_SIZE / 2, 0);            // İç girinti
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
        from: { x: oldX, y: oldY },
        to: { x: penPosition.x, y: penPosition.y },
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
    console.log('setDirection called with angle:', angle);
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

// Koşul bloğunu değerlendiren yardımcı fonksiyon
function evaluateCondition(block) {
    if (!block) {
        console.warn('evaluateCondition: Blok boş');
        return false;
    }

    console.log('evaluateCondition: Blok tipi değerlendiriliyor:', block.type);

    switch (block.type) {
        case 'comparison_block':
            var opField = block.getFieldValue('OP');
            var a = getValueFromBlock(block, 'A');
            var b = getValueFromBlock(block, 'B');

            console.log('Karşılaştırma:', a, opField, b);

            switch (opField) {
                case 'EQ': return a === b;
                case 'NEQ': return a !== b;
                case 'GT': return a > b;
                case 'GTE': return a >= b;
                case 'LT': return a < b;
                case 'LTE': return a <= b;
                default: return false;
            }

        case 'logic_and':
            var blockA = block.getInputTargetBlock('A');
            var blockB = block.getInputTargetBlock('B');
            var a = blockA ? evaluateCondition(blockA) : false;
            var b = blockB ? evaluateCondition(blockB) : false;
            console.log('logic_and:', a, '&&', b, '=', (a && b));
            return a && b;

        case 'logic_or':
            var blockA = block.getInputTargetBlock('A');
            var blockB = block.getInputTargetBlock('B');
            var a = blockA ? evaluateCondition(blockA) : false;
            var b = blockB ? evaluateCondition(blockB) : false;
            console.log('logic_or:', a, '||', b, '=', (a || b));
            return a || b;

        case 'logic_boolean':
            var value = block.getFieldValue('BOOL') === 'TRUE';
            console.log('logic_boolean:', value);
            return value;

        default:
            // Diğer blok tipleri için değeri alıp boolean'a çevir
            var value = getValueFromBlock(block);
            console.log('Diğer blok tipi:', block.type, 'Değer:', value, 'Boolean:', Boolean(value));
            return Boolean(value);
    }
}

// Bloktan değer çıkaran yardımcı fonksiyon
function getValueFromBlock(block, inputName) {
    if (!block) return null;

    // Eğer bir giriş adı belirtilmişse, o girişi al
    var targetBlock = inputName ?
        (block.getInput(inputName) ? block.getInput(inputName).connection.targetBlock() : null) :
        block;

    if (!targetBlock) return null;

    switch (targetBlock.type) {
        case 'math_number':
            return Number(targetBlock.getFieldValue('NUM'));

        case 'text':
            return targetBlock.getFieldValue('TEXT');

        case 'logic_boolean':
            return targetBlock.getFieldValue('BOOL') === 'TRUE';

        case 'math_add':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return a + b;

        case 'math_subtract':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return a - b;

        case 'math_multiply':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return a * b;

        case 'math_divide':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return b !== 0 ? a / b : 0;

        case 'math_modulo':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return b !== 0 ? a % b : 0;

        // Blockly standart aritmetik bloğu (dropdown ile işlem seçimi)
        case 'math_arithmetic':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            var op = targetBlock.getFieldValue('OP');
            switch (op) {
                case 'ADD': return a + b;
                case 'MINUS': return a - b;
                case 'MULTIPLY': return a * b;
                case 'DIVIDE': return b !== 0 ? a / b : 0;
                case 'POWER': return Math.pow(a, b);
                default: return 0;
            }

        case 'math_round':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return Math.round(num);

        case 'math_abs':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return Math.abs(num);

        case 'random_int':
            return randomInt(1, 100);

        case 'variables_get':
            var varName = targetBlock.getField('VAR').getText();
            return runtimeVariables[varName] !== undefined ? runtimeVariables[varName] : 0;

        case 'get_x':
            return toCartesianCoords(penPosition.x, penPosition.y).x;

        case 'get_y':
            return toCartesianCoords(penPosition.x, penPosition.y).y;

        case 'is_pen_down':
            return penDown;

        // İLERİ MATEMATİK BLOKLARI
        case 'math_sin':
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return Math.sin(angle * Math.PI / 180);

        case 'math_cos':
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return Math.cos(angle * Math.PI / 180);

        case 'math_tan':
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return Math.tan(angle * Math.PI / 180);

        case 'math_asin':
            var value = getValueFromBlock(targetBlock, 'VALUE') || 0;
            return Math.asin(value) * 180 / Math.PI;

        case 'math_acos':
            var value = getValueFromBlock(targetBlock, 'VALUE') || 0;
            return Math.acos(value) * 180 / Math.PI;

        case 'math_atan':
            var value = getValueFromBlock(targetBlock, 'VALUE') || 0;
            return Math.atan(value) * 180 / Math.PI;

        case 'math_sqrt':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return Math.sqrt(num);

        case 'math_pow':
            var base = getValueFromBlock(targetBlock, 'BASE') || 0;
            var exp = getValueFromBlock(targetBlock, 'EXPONENT') || 0;
            return Math.pow(base, exp);

        case 'math_square':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return num * num;

        case 'math_log10':
            var num = getValueFromBlock(targetBlock, 'NUM') || 1;
            return Math.log10(num);

        case 'math_ln':
            var num = getValueFromBlock(targetBlock, 'NUM') || 1;
            return Math.log(num);

        case 'math_pi':
            return Math.PI;

        case 'math_e':
            return Math.E;

        case 'math_phi':
            return 1.6180339887498949;

        case 'random_range':
            var min = getValueFromBlock(targetBlock, 'MIN') || 1;
            var max = getValueFromBlock(targetBlock, 'MAX') || 100;
            return randomInt(min, max);

        case 'math_floor':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return Math.floor(num);

        case 'math_ceil':
            var num = getValueFromBlock(targetBlock, 'NUM') || 0;
            return Math.ceil(num);

        case 'math_min':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return Math.min(a, b);

        case 'math_max':
            var a = getValueFromBlock(targetBlock, 'A') || 0;
            var b = getValueFromBlock(targetBlock, 'B') || 0;
            return Math.max(a, b);

        case 'math_to_radians':
            var degrees = getValueFromBlock(targetBlock, 'DEGREES') || 0;
            return degrees * Math.PI / 180;

        case 'math_to_degrees':
            var radians = getValueFromBlock(targetBlock, 'RADIANS') || 0;
            return radians * 180 / Math.PI;

        // KALEM BLOKLARI
        case 'get_pen_color':
            return typeof getPenColor === 'function' ? getPenColor() : '#000000';

        case 'get_pen_size':
            return typeof getPenSize === 'function' ? getPenSize() : 2;

        // FİZİK HESAPLAMA BLOKLARI
        case 'physics_gravity':
            return 9.81;

        case 'projectile_max_height':
            var velocity = getValueFromBlock(targetBlock, 'VELOCITY') || 0;
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return typeof calculateProjectileMaxHeight === 'function'
                ? calculateProjectileMaxHeight(velocity, angle) : 0;

        case 'projectile_range':
            var velocity = getValueFromBlock(targetBlock, 'VELOCITY') || 0;
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return typeof calculateProjectileRange === 'function'
                ? calculateProjectileRange(velocity, angle) : 0;

        case 'projectile_flight_time':
            var velocity = getValueFromBlock(targetBlock, 'VELOCITY') || 0;
            var angle = getValueFromBlock(targetBlock, 'ANGLE') || 0;
            return typeof calculateProjectileFlightTime === 'function'
                ? calculateProjectileFlightTime(velocity, angle) : 0;

        // ZAMAN VE ALGILAMA BLOKLARI
        case 'timer':
            return timer();

        case 'current_hour':
            return currentHour();

        case 'current_minute':
            return currentMinute();

        case 'current_second':
            return currentSecond();

        // METİN BLOKLARI
        case 'text_join':
            var a = getValueFromBlock(targetBlock, 'A') || '';
            var b = getValueFromBlock(targetBlock, 'B') || '';
            return String(a) + String(b);

        // MANTIK BLOKLARI
        case 'logic_null':
            return null;

        default:
            console.warn('Değer alınamadı, bilinmeyen blok tipi:', targetBlock.type);
            return null;
    }
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
            var steps = getValueFromBlock(block, 'STEPS') || 0;
            moveSteps(steps);
            break;

        case 'turn_right':
            var angle = getValueFromBlock(block, 'ANGLE') || 0;
            turnRight(angle);
            break;

        case 'turn_left':
            var angle = getValueFromBlock(block, 'ANGLE') || 0;
            turnLeft(angle);
            break;

        case 'goto_xy':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            gotoXY(x, y);
            break;

        case 'goto_random':
            gotoRandom();
            break;

        case 'set_direction':
            var angle = getValueFromBlock(block, 'ANGLE') || 0;
            setDirection(-angle);
            break;

        case 'change_x':
            var dx = getValueFromBlock(block, 'DX') || 0;
            changeX(dx);
            break;

        case 'change_y':
            var dy = getValueFromBlock(block, 'DY') || 0;
            changeY(dy);
            break;

        case 'set_x':
            var x = getValueFromBlock(block, 'X') || 0;
            setX(x);
            break;

        case 'set_y':
            var y = getValueFromBlock(block, 'Y') || 0;
            setY(y);
            break;

        case 'repeat_times':
            var times = getValueFromBlock(block, 'TIMES') || 0;
            await repeat_times(times, block.id);
            break;

        case 'forever':
            // 'Sürekli' bloğu için işleme
            var statementInput = block.getInput('DO');
            if (statementInput && statementInput.connection && statementInput.connection.targetBlock()) {
                // Sonsuz döngü - dikkatli kullanılmalı
                var shouldContinue = true;
                while (shouldContinue) {
                    var childBlock = statementInput.connection.targetBlock();
                    while (childBlock) {
                        var result = await executeBlock(childBlock);
                        // Eğer bir blok durdurma sinyali verirse döngüyü kır
                        if (result === true) {
                            shouldContinue = false;
                            break;
                        }
                        childBlock = childBlock.getNextBlock();
                    }

                    // Güvenlik için kısa bir bekleme ekleyelim
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            }
            break;

        case 'if':
            // 'Eğer' koşul bloğu için işleme
            console.log('if bloğu işleniyor...');
            var conditionInput = block.getInput('CONDITION');
            if (conditionInput && conditionInput.connection && conditionInput.connection.targetBlock()) {
                // Koşul bloğunu değerlendir
                var conditionBlock = conditionInput.connection.targetBlock();
                console.log('Koşul bloğu tipi:', conditionBlock.type);

                try {
                    var conditionValue = evaluateCondition(conditionBlock);
                    console.log('Koşul değeri:', conditionValue);

                    // Eğer koşul doğruysa, içindeki blokları çalıştır
                    if (conditionValue) {
                        console.log('Koşul doğru, içindeki bloklar çalıştırılıyor...');
                        var doInput = block.getInput('DO');
                        if (doInput && doInput.connection && doInput.connection.targetBlock()) {
                            var statementBlock = doInput.connection.targetBlock();
                            while (statementBlock) {
                                console.log('Alt blok çalıştırılıyor:', statementBlock.type);
                                await executeBlock(statementBlock);
                                statementBlock = statementBlock.getNextBlock();
                            }
                        } else {
                            console.log('DO girişinde blok bulunamadı');
                        }
                    } else {
                        console.log('Koşul yanlış, içindeki bloklar atlanıyor...');
                    }
                } catch (error) {
                    console.error('Koşul değerlendirme hatası:', error);
                }
            } else {
                console.warn('CONDITION girişine bağlı blok bulunamadı.');
            }
            break;

        case 'if_else':
            // 'Eğer-Değilse' koşul bloğu için işleme
            console.log('if_else bloğu işleniyor...');
            var conditionInput = block.getInput('CONDITION');
            if (conditionInput && conditionInput.connection && conditionInput.connection.targetBlock()) {
                // Koşul bloğunu değerlendir
                var conditionBlock = conditionInput.connection.targetBlock();
                console.log('Koşul bloğu tipi:', conditionBlock.type);

                try {
                    var conditionValue = evaluateCondition(conditionBlock);
                    console.log('Koşul değeri:', conditionValue);

                    // Koşula göre ilgili blokları çalıştır
                    if (conditionValue) {
                        console.log('Koşul doğru, DO blokları çalıştırılıyor...');
                        var doInput = block.getInput('DO');
                        if (doInput && doInput.connection && doInput.connection.targetBlock()) {
                            var statementBlock = doInput.connection.targetBlock();
                            while (statementBlock) {
                                console.log('DO alt bloğu çalıştırılıyor:', statementBlock.type);
                                await executeBlock(statementBlock);
                                statementBlock = statementBlock.getNextBlock();
                            }
                        } else {
                            console.log('DO girişinde blok bulunamadı');
                        }
                    } else {
                        console.log('Koşul yanlış, ELSE blokları çalıştırılıyor...');
                        var elseInput = block.getInput('ELSE');
                        if (elseInput && elseInput.connection && elseInput.connection.targetBlock()) {
                            var elseBlock = elseInput.connection.targetBlock();
                            while (elseBlock) {
                                console.log('ELSE alt bloğu çalıştırılıyor:', elseBlock.type);
                                await executeBlock(elseBlock);
                                elseBlock = elseBlock.getNextBlock();
                            }
                        } else {
                            console.log('ELSE girişinde blok bulunamadı');
                        }
                    }
                } catch (error) {
                    console.error('Koşul değerlendirme hatası:', error);
                }
            } else {
                console.warn('CONDITION girişine bağlı blok bulunamadı.');
            }
            break;

        case 'wait_until':
            // 'Bekle ... olana kadar' bloğu için işleme
            var conditionInput = block.getInput('CONDITION');
            if (conditionInput && conditionInput.connection && conditionInput.connection.targetBlock()) {
                var conditionBlock = conditionInput.connection.targetBlock();
                // Koşul sağlanana kadar bekle
                while (!evaluateCondition(conditionBlock)) {
                    await new Promise(resolve => setTimeout(resolve, 100)); // Kısa bir bekleme
                }
            }
            break;

        case 'repeat_until':
            // 'Tekrarla ... olana kadar' bloğu için işleme
            var conditionInput = block.getInput('CONDITION');
            if (conditionInput && conditionInput.connection && conditionInput.connection.targetBlock()) {
                var conditionBlock = conditionInput.connection.targetBlock();
                // Koşul sağlanana kadar içindeki blokları tekrarla
                while (!evaluateCondition(conditionBlock)) {
                    var statementBlock = block.getInput('DO').connection.targetBlock();
                    while (statementBlock) {
                        await executeBlock(statementBlock);
                        statementBlock = statementBlock.getNextBlock();
                    }
                }
            }
            break;

        case 'variables_set':
            var varName = block.getField('VAR').getText();
            var value = getValueFromBlock(block, 'VALUE');
            runtimeVariables[varName] = value;
            console.log(`Değişken ayarlandı: ${varName} = ${value}`);
            // Değişikliği bildir
            document.dispatchEvent(new CustomEvent('blockly-variable-changed', {
                detail: { name: varName, value: value }
            }));
            break;

        case 'variables_change':
            var varName = block.getField('VAR').getText();
            var delta = getValueFromBlock(block, 'DELTA') || 0;
            var currentVal = runtimeVariables[varName] !== undefined ? runtimeVariables[varName] : 0;
            runtimeVariables[varName] = currentVal + delta;
            console.log(`Değişken değişti: ${varName} (${currentVal}) += ${delta} => ${runtimeVariables[varName]}`);
            // Değişikliği bildir
            document.dispatchEvent(new CustomEvent('blockly-variable-changed', {
                detail: { name: varName, value: runtimeVariables[varName] }
            }));
            break;

        case 'stop':
            // 'Durdur' bloğu için işleme - çalışmayı sonlandır
            return true; // Çalışmayı durdurmak için true döndür

        // ============================================
        // ŞEKİL ÇİZİM BLOKLARI
        // ============================================
        case 'draw_circle':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var radius = getValueFromBlock(block, 'RADIUS') || 50;
            drawCircle(x, y, radius);
            break;

        case 'draw_filled_circle':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var radius = getValueFromBlock(block, 'RADIUS') || 50;
            drawFilledCircle(x, y, radius);
            break;

        case 'draw_rectangle':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var width = getValueFromBlock(block, 'WIDTH') || 100;
            var height = getValueFromBlock(block, 'HEIGHT') || 50;
            drawRectangle(x, y, width, height);
            break;

        case 'draw_filled_rectangle':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var width = getValueFromBlock(block, 'WIDTH') || 100;
            var height = getValueFromBlock(block, 'HEIGHT') || 50;
            drawFilledRectangle(x, y, width, height);
            break;

        case 'draw_polygon':
            var sides = getValueFromBlock(block, 'SIDES') || 6;
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var radius = getValueFromBlock(block, 'RADIUS') || 50;
            drawPolygon(sides, x, y, radius);
            break;

        case 'draw_line':
            var x1 = getValueFromBlock(block, 'X1') || 0;
            var y1 = getValueFromBlock(block, 'Y1') || 0;
            var x2 = getValueFromBlock(block, 'X2') || 0;
            var y2 = getValueFromBlock(block, 'Y2') || 0;
            drawLine(x1, y1, x2, y2);
            break;

        case 'draw_arc':
            var x = getValueFromBlock(block, 'X') || 0;
            var y = getValueFromBlock(block, 'Y') || 0;
            var radius = getValueFromBlock(block, 'RADIUS') || 50;
            var startAngle = getValueFromBlock(block, 'START_ANGLE') || 0;
            var endAngle = getValueFromBlock(block, 'END_ANGLE') || 180;
            drawArc(x, y, radius, startAngle, endAngle);
            break;

        // ============================================
        // KALEM AYARLARI BLOKLARI
        // ============================================
        case 'set_pen_color':
            var color = block.getFieldValue('COLOR');
            setPenColor(color);
            break;

        case 'set_pen_size':
            var size = getValueFromBlock(block, 'SIZE') || 2;
            setPenSize(size);
            break;

        case 'set_pen_color_rgb':
            var r = getValueFromBlock(block, 'R') || 0;
            var g = getValueFromBlock(block, 'G') || 0;
            var b = getValueFromBlock(block, 'B') || 0;
            setPenColorRGB(r, g, b);
            break;

        case 'set_background_color':
            var color = block.getFieldValue('COLOR');
            setBackgroundColor(color);
            break;

        // ============================================
        // FİZİK SİMÜLASYON BLOKLARI
        // ============================================
        case 'projectile_motion':
            var angle = getValueFromBlock(block, 'ANGLE') || 45;
            var velocity = getValueFromBlock(block, 'VELOCITY') || 100;
            var startX = getValueFromBlock(block, 'START_X') || 0;
            var startY = getValueFromBlock(block, 'START_Y') || 0;
            drawProjectileMotion(angle, velocity, startX, startY);
            break;

        case 'free_fall':
            var height = getValueFromBlock(block, 'HEIGHT') || 200;
            var startX = getValueFromBlock(block, 'START_X') || 0;
            drawFreeFall(height, startX);
            break;

        case 'horizontal_throw':
            var velocity = getValueFromBlock(block, 'VELOCITY') || 50;
            var height = getValueFromBlock(block, 'HEIGHT') || 100;
            var startX = getValueFromBlock(block, 'START_X') || 0;
            drawHorizontalThrow(velocity, height, startX);
            break;

        case 'circular_motion':
            var centerX = getValueFromBlock(block, 'CENTER_X') || 0;
            var centerY = getValueFromBlock(block, 'CENTER_Y') || 0;
            var radius = getValueFromBlock(block, 'RADIUS') || 100;
            var periods = getValueFromBlock(block, 'PERIODS') || 1;
            drawCircularMotion(centerX, centerY, radius, periods);
            break;

        case 'harmonic_motion':
            var amplitude = getValueFromBlock(block, 'AMPLITUDE') || 50;
            var periods = getValueFromBlock(block, 'PERIODS') || 2;
            var startX = getValueFromBlock(block, 'START_X') || -200;
            var centerY = getValueFromBlock(block, 'CENTER_Y') || 0;
            drawHarmonicMotion(amplitude, periods, startX, centerY);
            break;

        // ============================================
        // EKSİK BLOKLAR - YENİ EKLENEN
        // ============================================
        case 'bounce_on_edge':
            bounceOnEdge();
            break;

        case 'wait_seconds':
            var seconds = getValueFromBlock(block, 'SECONDS') || 1;
            await waitSeconds(seconds);
            break;

        case 'broadcast':
            var message = block.getFieldValue('MESSAGE');
            broadcast(message);
            break;

        case 'reset_timer':
            resetTimer();
            break;

        default:
            console.warn('Bilinmeyen blok tipi:', block.type);
    }
}

async function repeat_times(times, blockId) {
    // Convert times to number to ensure it's numeric
    times = Number(times);

    // Validate input
    if (isNaN(times) || times < 0) {
        console.error('Invalid number of repetitions');
        return;
    }

    // Get the current repeat block by ID
    var blocks = workspace.getAllBlocks(true);
    var repeatBlock = blocks.find(block => block.id === blockId);

    if (repeatBlock) {
        console.log('Found repeat block with ID:', blockId);
        // Get the statement input that contains child blocks
        var statementInput = repeatBlock.getInput('DO');
        if (statementInput && statementInput.connection && statementInput.connection.targetBlock()) {
            // Execute the sequence of blocks 'times' number of times
            for (let i = 0; i < times; i++) {
                console.log(`Iteration ${i + 1} of ${times}`);

                // Get the first child block
                var childBlock = statementInput.connection.targetBlock();

                // Execute each child block
                while (childBlock) {
                    console.log('Executing block:', childBlock.type);
                    await executeBlock(childBlock);
                    childBlock = childBlock.getNextBlock();
                }
            }
        } else {
            console.log('No child blocks found in the repeat block');
        }
    } else {
        console.log('Repeat block not found with ID:', blockId);
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

// Sayfa yüklendiğinde canvas'ı başlat
document.addEventListener('DOMContentLoaded', function () {
    initCanvas();
    console.log('Canvas initialized');
});

// ============================================
// EKSİK FONKSİYONLAR - Blockly Generator'lar tarafından kullanılıyor
// ============================================

/**
 * Kenara geldiğinde yön değiştir (sek)
 */
function bounceOnEdge() {
    if (!canvas || !penPosition) return;

    const margin = 10;
    let bounced = false;

    // Sol veya sağ kenar kontrolü
    if (penPosition.x < margin) {
        penPosition.x = margin;
        direction = 180 - direction; // Yatay yansıma
        bounced = true;
    } else if (penPosition.x > canvas.width - margin) {
        penPosition.x = canvas.width - margin;
        direction = 180 - direction;
        bounced = true;
    }

    // Üst veya alt kenar kontrolü
    if (penPosition.y < margin) {
        penPosition.y = margin;
        direction = -direction; // Dikey yansıma
        bounced = true;
    } else if (penPosition.y > canvas.height - margin) {
        penPosition.y = canvas.height - margin;
        direction = -direction;
        bounced = true;
    }

    if (bounced) {
        updateCanvas();
        console.log('Kenara çarpıldı, yeni yön:', direction);
    }
}

/**
 * Kartezyen X koordinatını döndür
 * @returns {number} X koordinatı
 */
function getX() {
    if (!canvas || !penPosition) return 0;
    return Math.round(penPosition.x - canvas.width / 2);
}

/**
 * Kartezyen Y koordinatını döndür
 * @returns {number} Y koordinatı
 */
function getY() {
    if (!canvas || !penPosition) return 0;
    return Math.round(canvas.height / 2 - penPosition.y);
}

/**
 * Zamanlayıcı değerini saniye olarak döndür
 * @returns {number} Geçen süre (saniye)
 */
function timer() {
    return (Date.now() - timerStartTime) / 1000;
}

/**
 * Zamanlayıcıyı sıfırla
 */
function resetTimer() {
    timerStartTime = Date.now();
    console.log('Zamanlayıcı sıfırlandı');
}

/**
 * Kalem durumunu döndür
 * @returns {boolean} Kalem yazıyor mu?
 */
function isPenDown() {
    return penDown;
}

/**
 * Mevcut saati döndür
 * @returns {number} Saat (0-23)
 */
function currentHour() {
    return new Date().getHours();
}

/**
 * Mevcut dakikayı döndür
 * @returns {number} Dakika (0-59)
 */
function currentMinute() {
    return new Date().getMinutes();
}

/**
 * Mevcut saniyeyi döndür
 * @returns {number} Saniye (0-59)
 */
function currentSecond() {
    return new Date().getSeconds();
}

/**
 * Belirtilen aralıkta rastgele sayı üret
 * @param {number} min - Minimum değer
 * @param {number} max - Maximum değer
 * @returns {number} Rastgele tam sayı
 */
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Belirtilen süre kadar bekle
 * @param {number} seconds - Bekleme süresi (saniye)
 * @returns {Promise} Bekleme promise'i
 */
function waitSeconds(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

/**
 * Mesaj yayınla (broadcast)
 * @param {string} message - Yayınlanacak mesaj
 */
function broadcast(message) {
    console.log('Mesaj yayınlandı:', message);
    if (messageListeners[message]) {
        messageListeners[message].forEach(callback => callback());
    }
}

/**
 * Mesaj dinleyici ekle
 * @param {string} message - Dinlenecek mesaj
 * @param {Function} callback - Mesaj alındığında çağrılacak fonksiyon
 */
function whenMessageReceived(message, callback) {
    if (!messageListeners[message]) {
        messageListeners[message] = [];
    }
    messageListeners[message].push(callback);
}

/**
 * Programı durdur
 */
function stop() {
    programRunning = false;
    console.log('Program durduruldu');
}

/**
 * Koşul sağlanana kadar bekle
 * @param {Function} conditionFn - Koşul fonksiyonu
 * @returns {Promise} Bekleme promise'i
 */
async function waitUntil(conditionFn) {
    while (!conditionFn() && programRunning) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

/**
 * Koşul sağlanana kadar tekrarla
 * @param {Function} conditionFn - Koşul fonksiyonu
 * @param {Function} callback - Her iterasyonda çağrılacak fonksiyon
 * @returns {Promise}
 */
async function repeatUntil(conditionFn, callback) {
    while (!conditionFn() && programRunning) {
        await callback();
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

/**
 * Sürekli tekrarla
 * @param {Function} callback - Her iterasyonda çağrılacak fonksiyon
 * @returns {Promise}
 */
async function forever(callback) {
    while (programRunning) {
        await callback();
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

/**
 * Tuşa basıldığında çağrılacak fonksiyonu kaydet
 * @param {string} key - Tuş
 * @param {Function} callback - Tuşa basıldığında çağrılacak fonksiyon
 */
function whenKeyPressed(key, callback) {
    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === key.toLowerCase() || key === 'any') {
            callback();
        }
    });
}
