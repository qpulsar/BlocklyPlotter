/**
 * Fizik Çizim İşlemleri
 * Eğik atış, serbest düşüş ve diğer fizik simülasyonları için çizim fonksiyonları
 */

// Fizik sabiti
const PHYSICS_GRAVITY = 9.81;
const PHYSICS_SCALE = 1; // Ölçekleme faktörü (piksel/birim)

// =====================================================
// FİZİK SİMÜLASYON ÇİZİM FONKSİYONLARI
// =====================================================

/**
 * Eğik atış yörüngesi çiz
 * @param {number} angle - Atış açısı (derece)
 * @param {number} velocity - Başlangıç hızı
 * @param {number} startX - Başlangıç X koordinatı
 * @param {number} startY - Başlangıç Y koordinatı
 */
function drawProjectileMotion(angle, velocity, startX, startY) {
    if (!ctx || !canvas) return;

    const angleRad = angle * Math.PI / 180;
    const vx = velocity * Math.cos(angleRad); // Yatay hız bileşeni
    const vy = velocity * Math.sin(angleRad); // Dikey hız bileşeni

    // Toplam uçuş süresi (y = 0'a geri dönme)
    const totalTime = (2 * vy) / PHYSICS_GRAVITY;
    const steps = 100; // Çizim adımı sayısı
    const dt = totalTime / steps;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    let firstPoint = true;

    for (let i = 0; i <= steps; i++) {
        const t = i * dt;
        const x = startX + vx * t;
        const y = startY + vy * t - 0.5 * PHYSICS_GRAVITY * t * t;

        // Y < başlangıç Y ise dur (yere düştü)
        if (y < startY && i > 0) break;

        const coords = toCanvasCoords(x, y);

        if (firstPoint) {
            ctx.moveTo(coords.x, coords.y);
            firstPoint = false;
        } else {
            ctx.lineTo(coords.x, coords.y);
        }
    }

    ctx.stroke();
    ctx.restore();

    console.log('Eğik atış çizildi - açı:', angle, 'hız:', velocity);
}

/**
 * Serbest düşüş hareketi çiz
 * @param {number} height - Başlangıç yüksekliği
 * @param {number} startX - Başlangıç X koordinatı
 */
function drawFreeFall(height, startX) {
    if (!ctx || !canvas) return;

    // Düşme süresi: h = 0.5 * g * t^2 => t = sqrt(2h/g)
    const totalTime = Math.sqrt(2 * height / PHYSICS_GRAVITY);
    const steps = 50;
    const dt = totalTime / steps;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    const startCoords = toCanvasCoords(startX, height);
    ctx.moveTo(startCoords.x, startCoords.y);

    for (let i = 1; i <= steps; i++) {
        const t = i * dt;
        const y = height - 0.5 * PHYSICS_GRAVITY * t * t;

        if (y < 0) break;

        const coords = toCanvasCoords(startX, y);
        ctx.lineTo(coords.x, coords.y);
    }

    // Son nokta (y = 0)
    const endCoords = toCanvasCoords(startX, 0);
    ctx.lineTo(endCoords.x, endCoords.y);

    ctx.stroke();
    ctx.restore();

    console.log('Serbest düşüş çizildi - yükseklik:', height);
}

/**
 * Yatay atış hareketi çiz
 * @param {number} velocity - Yatay hız
 * @param {number} height - Başlangıç yüksekliği
 * @param {number} startX - Başlangıç X koordinatı
 */
function drawHorizontalThrow(velocity, height, startX) {
    if (!ctx || !canvas) return;

    // Düşme süresi
    const totalTime = Math.sqrt(2 * height / PHYSICS_GRAVITY);
    const steps = 50;
    const dt = totalTime / steps;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    const startCoords = toCanvasCoords(startX, height);
    ctx.moveTo(startCoords.x, startCoords.y);

    for (let i = 1; i <= steps; i++) {
        const t = i * dt;
        const x = startX + velocity * t;
        const y = height - 0.5 * PHYSICS_GRAVITY * t * t;

        if (y < 0) break;

        const coords = toCanvasCoords(x, y);
        ctx.lineTo(coords.x, coords.y);
    }

    ctx.stroke();
    ctx.restore();

    console.log('Yatay atış çizildi - hız:', velocity, 'yükseklik:', height);
}

/**
 * Düzgün dairesel hareket çiz
 * @param {number} centerX - Merkez X koordinatı
 * @param {number} centerY - Merkez Y koordinatı
 * @param {number} radius - Yarıçap
 * @param {number} periods - Tur sayısı
 */
function drawCircularMotion(centerX, centerY, radius, periods) {
    if (!ctx || !canvas) return;

    const steps = Math.round(100 * periods);
    const totalAngle = 2 * Math.PI * periods;
    const dAngle = totalAngle / steps;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    // İlk nokta
    const firstCoords = toCanvasCoords(centerX + radius, centerY);
    ctx.moveTo(firstCoords.x, firstCoords.y);

    for (let i = 1; i <= steps; i++) {
        const angle = i * dAngle;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const coords = toCanvasCoords(x, y);
        ctx.lineTo(coords.x, coords.y);
    }

    ctx.stroke();
    ctx.restore();

    console.log('Dairesel hareket çizildi - merkez:', centerX, centerY, 'yarıçap:', radius);
}

/**
 * Basit harmonik hareket (sinüs dalgası) çiz
 * @param {number} amplitude - Genlik
 * @param {number} periods - Periyot sayısı
 * @param {number} startX - Başlangıç X koordinatı
 * @param {number} centerY - Merkez Y koordinatı
 */
function drawHarmonicMotion(amplitude, periods, startX, centerY) {
    if (!ctx || !canvas) return;

    const wavelength = 200; // Piksel cinsinden dalga boyu
    const totalWidth = wavelength * periods;
    const steps = Math.round(50 * periods);
    const dx = totalWidth / steps;

    ctx.save();
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penSize;
    ctx.beginPath();

    const firstCoords = toCanvasCoords(startX, centerY);
    ctx.moveTo(firstCoords.x, firstCoords.y);

    for (let i = 1; i <= steps; i++) {
        const x = startX + i * dx;
        const phase = (2 * Math.PI * i) / (steps / periods);
        const y = centerY + amplitude * Math.sin(phase);

        const coords = toCanvasCoords(x, y);
        ctx.lineTo(coords.x, coords.y);
    }

    ctx.stroke();
    ctx.restore();

    console.log('Harmonik hareket çizildi - genlik:', amplitude, 'periyot:', periods);
}

// =====================================================
// FİZİK HESAPLAMA FONKSİYONLARI
// =====================================================

/**
 * Eğik atışta maksimum yüksekliği hesapla
 * @param {number} velocity - Başlangıç hızı
 * @param {number} angle - Atış açısı (derece)
 * @returns {number} Maksimum yükseklik
 */
function calculateProjectileMaxHeight(velocity, angle) {
    const angleRad = angle * Math.PI / 180;
    const vy = velocity * Math.sin(angleRad);
    return (vy * vy) / (2 * PHYSICS_GRAVITY);
}

/**
 * Eğik atışta menzili hesapla
 * @param {number} velocity - Başlangıç hızı
 * @param {number} angle - Atış açısı (derece)
 * @returns {number} Menzil
 */
function calculateProjectileRange(velocity, angle) {
    const angleRad = angle * Math.PI / 180;
    return (velocity * velocity * Math.sin(2 * angleRad)) / PHYSICS_GRAVITY;
}

/**
 * Eğik atışta uçuş süresini hesapla
 * @param {number} velocity - Başlangıç hızı
 * @param {number} angle - Atış açısı (derece)
 * @returns {number} Uçuş süresi (saniye)
 */
function calculateProjectileFlightTime(velocity, angle) {
    const angleRad = angle * Math.PI / 180;
    const vy = velocity * Math.sin(angleRad);
    return (2 * vy) / PHYSICS_GRAVITY;
}

console.log('physics-drawing-operations.js: Fizik çizim işlemleri yüklendi');
