// Blockly çalışma alanı yapılandırması
export function setupBlocklyWorkspace() {
    const workspace = Blockly.getMainWorkspace();
    
    // Çalışma alanı değişiklik olaylarını dinle
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.BLOCK_DELETE ||
            event.type === Blockly.Events.BLOCK_CHANGE ||
            event.type === Blockly.Events.BLOCK_MOVE) {
            // Kod değişikliğini işle
            handleCodeChange(workspace);
        }
    });
    
    // Başlangıç durumunu ayarla
    initializeWorkspaceState(workspace);
}

// Çalışma alanı başlangıç durumunu ayarla
function initializeWorkspaceState(workspace) {
    // Varsayılan değişkenleri ayarla
    workspace.createVariable('x');
    workspace.createVariable('y');
    workspace.createVariable('direction');
    workspace.createVariable('penDown');
    
    // Başlangıç konumunu ayarla
    Blockly.JavaScript.addReservedWords('x,y,direction,penDown');
}

// Kod değişikliklerini işle
function handleCodeChange(workspace) {
    try {
        // JavaScript kodunu oluştur
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        
        // Kodu çalıştır veya kaydet
        if (typeof onCodeChange === 'function') {
            onCodeChange(code);
        }
    } catch (e) {
        console.error('Kod oluşturma hatası:', e);
    }
}
