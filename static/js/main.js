// Workspace'i oluştur
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');

// Deprecation uyarısını susturmak için monkey-patch (v12 fix)
if (Blockly.Workspace.prototype.getAllVariables) {
    const originalGetAllVariables = Blockly.Workspace.prototype.getAllVariables;
    Blockly.Workspace.prototype.getAllVariables = function () {
        if (this.getVariableMap) {
            return this.getVariableMap().getAllVariables();
        }
        return originalGetAllVariables.apply(this, arguments);
    };
}

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox').outerHTML,
    zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    trashcan: true,
    move: {
        scrollbars: true,
        drag: true,
        wheel: true
    }
});

// Workspace boyutunu ayarla
function onResize() {
    if (workspace) {
        Blockly.svgResize(workspace);
    }
}

// Run button click handler
const runBtn = document.getElementById('runButton');
if (runBtn) {
    runBtn.addEventListener('click', async function () {
        // Programı başlat
        programRunning = true;

        // Workspace'deki değişkenleri al (Deprecation fix)
        var variables = workspace.getVariableMap().getAllVariables();

        // Runtime değişkenlerini sıfırla
        window.runtimeVariables = {};
        runtimeVariables = window.runtimeVariables;

        // Aslında tüm blokları almak için:
        var allBlocks = workspace.getAllBlocks(true);

        // Canvas'ı hazırla
        clearCanvas();
        initCanvas();
        penDown = false;

        // Başlangıç bloğunu bul (yeşil bayrak)
        var startBlock = allBlocks.find(block => block.type === 'when_flag_clicked');
        if (startBlock) {
            // Blokları sırayla işle
            var currentBlock = startBlock.getNextBlock();
            while (currentBlock && programRunning) {
                await executeBlock(currentBlock);
                currentBlock = currentBlock.getNextBlock();
            }
        }
    });
}

// Clear button click handler
const clearBtn = document.getElementById('clearButton');
if (clearBtn) {
    clearBtn.addEventListener('click', function () {
        clearCanvas();
        initCanvas();
    });
}

// Sayfa yüklendiğinde canvas'ı ve workspace'i başlat
window.addEventListener('load', function () {
    initCanvas();
    // Kalemin başlangıç durumu
    penDown = false;

    // Workspace'in boyutunu ayarla
    onResize();
    // Pencere boyutu değiştiğinde workspace'i yeniden boyutlandır
    window.addEventListener('resize', onResize);

    // Başlangıçta eğer workspace boşsa minimal starter yükle
    // (navbar.js'deki yükleme bittikten kısa süre sonra kontrol et)
    setTimeout(() => {
        if (workspace.getAllBlocks(false).length === 0) {
            loadMinimalStarterProject();
        }
    }, 500);

    // Workspace değişikliklerini dinle ve son projeyi (XML olarak, yedek amaçlı) localStorage'a kaydet
    workspace.addChangeListener(function (event) {
        if (event.isUiEvent) return;

        try {
            const state = Blockly.serialization.workspaces.save(workspace);
            localStorage.setItem('lastProjectState', JSON.stringify(state));
        } catch (e) {
            // Fallback to XML
            const xml = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xml);
            localStorage.setItem('lastProjectXml', xmlText);
        }
    });
});

// Minimal bir başlangıç projesi yükle (sadece when_flag_clicked bloğu)
function loadMinimalStarterProject() {
    console.log('Minimal başlangıç projesi yükleniyor...');
    const state = {
        "blocks": {
            "languageVersion": 0,
            "blocks": [
                {
                    "type": "when_flag_clicked",
                    "id": "start",
                    "x": 40,
                    "y": 40
                }
            ]
        }
    };
    Blockly.serialization.workspaces.load(state, workspace);
}
