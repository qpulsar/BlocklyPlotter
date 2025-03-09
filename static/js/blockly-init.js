// Blockly başlatma ve yardımcı fonksiyonlar
export function initializeBlockly(config) {
    const workspace = Blockly.inject('blocklyDiv', config);
    return workspace;
}

// Blockly çalışma alanını yeniden boyutlandır
export function resizeBlockly() {
    const blocklyArea = document.getElementById('blocklyArea');
    const blocklyDiv = document.getElementById('blocklyDiv');
    
    // Blockly div'ini alan boyutuna göre ayarla
    const position = getAbsolutePosition(blocklyArea);
    blocklyDiv.style.left = position.x + 'px';
    blocklyDiv.style.top = position.y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    
    // Blockly'yi yeniden boyutlandır
    Blockly.svgResize(Blockly.getMainWorkspace());
}

// Bir elemanın mutlak pozisyonunu al
function getAbsolutePosition(element) {
    let x = 0;
    let y = 0;
    
    while (element) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    
    return { x, y };
}
