// Koordinat sistemi işlemleri
import { canvas, ctx } from './canvas-core.js';

// Koordinat sistemi ve cetveli çiz
function drawCoordinateSystem() {
    if (!ctx || !canvas) return;

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
}

export { drawCoordinateSystem };
