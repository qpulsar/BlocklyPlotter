// Değişken gösterimi işlemleri
import { ctx, setVariable, getVariable } from './canvas-core.js';

// Değişken yazı stili
const VARIABLE_FONT = '16px Arial';
const VARIABLE_COLOR = '#2ecc71'; // Yeşil renk

// Değişkenleri canvas üzerinde göster
function drawVariables() {
    if (!ctx) return;
    
    ctx.save();
    ctx.font = VARIABLE_FONT;
    ctx.fillStyle = VARIABLE_COLOR;
    ctx.textAlign = 'left';
    
    // Değişkenleri canvas'ın sol üst köşesine yaz
    let yOffset = 30;
    variables.forEach((value, name) => {
        ctx.fillText(`${name} = ${value}`, 10, yOffset);
        yOffset += 25;
    });
    
    ctx.restore();
}

export { drawVariables };
