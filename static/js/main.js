// Workspace'i oluştur
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
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
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);

    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    Blockly.svgResize(workspace);
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
        runtimeVariables = {};

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

    // URL'den proje ID'sini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');

    if (projectId) {
        // Eğer URL'de proje ID'si varsa, o projeyi yükle
        // Not: Bu kısım navbar.js'de zaten yapılıyor, burada tekrar yapmaya gerek yok
        console.log('URL üzerinden proje yükleniyor, ID:', projectId);
    } else {
        // Kullanıcının en son çalıştığı projeyi localStorage'dan kontrol et
        const lastProjectXml = localStorage.getItem('lastProjectXml');

        if (lastProjectXml) {
            try {
                // En son çalışılan projeyi yükle
                console.log('En son çalışılan proje yükleniyor...');
                const xml = Blockly.Xml.textToDom(lastProjectXml);
                Blockly.Xml.domToWorkspace(xml, workspace);
            } catch (error) {
                console.error('En son çalışılan proje yüklenirken hata oluştu:', error);
                // Hata durumunda minimal bir başlangıç bloğu yükle
                loadMinimalStarterProject();
            }
        } else {
            // Eğer localStorage'da kayıtlı proje yoksa, minimal bir başlangıç bloğu yükle
            loadMinimalStarterProject();
        }
    }

    // Workspace değişikliklerini dinle ve son projeyi kaydet
    workspace.addChangeListener(function (event) {
        // Sadece blok ekleme, silme, taşıma veya değiştirme olaylarında kaydet
        if (event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.BLOCK_DELETE ||
            event.type === Blockly.Events.BLOCK_CHANGE ||
            event.type === Blockly.Events.BLOCK_MOVE) {

            // Workspace'i XML'e dönüştür ve localStorage'a kaydet
            const xml = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xml);
            localStorage.setItem('lastProjectXml', xmlText);
        }
    });
});

// Minimal bir başlangıç projesi yükle (sadece when_flag_clicked bloğu)
function loadMinimalStarterProject() {
    console.log('Minimal başlangıç projesi yükleniyor...');
    var minimalBlocks = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="when_flag_clicked" id="start" x="20" y="20"></block>
</xml>`;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(minimalBlocks, "text/xml");
    Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);
}
