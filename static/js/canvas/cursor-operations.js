// İmleç işlemleri
import { ctx, penPosition, direction } from './canvas-core.js';

// İmleç boyutu ve rengi
const CURSOR_SIZE = 20;
const CURSOR_COLOR = '#3498db';  // Mavi renk
const CURSOR_LINE_WIDTH = 2;

// İmleci çiz
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
    ctx.moveTo(-CURSOR_SIZE, CURSOR_SIZE/2);  // Sol alt
    ctx.lineTo(CURSOR_SIZE, 0);               // Ok ucu
    ctx.lineTo(-CURSOR_SIZE, -CURSOR_SIZE/2); // Sol üst
    ctx.lineTo(-CURSOR_SIZE/2, 0);            // İç girinti
    ctx.closePath();
    ctx.fill();

    // İmlecin durumunu geri yükle
    ctx.restore();
}

export { drawCursor };
