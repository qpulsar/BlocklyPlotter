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
document.getElementById('runButton').addEventListener('click', function () {
    // Workspace'deki blokları al
    var blocks = workspace.getAllBlocks(true);

    // Canvas'ı hazırla
    clearCanvas();
    initCanvas();
    penDown = false;

    // Başlangıç bloğunu bul (yeşil bayrak)
    var startBlock = blocks.find(block => block.type === 'when_flag_clicked');
    if (startBlock) {
        // Blokları sırayla işle
        var currentBlock = startBlock.getNextBlock();
        while (currentBlock) {
            executeBlock(currentBlock);
            currentBlock = currentBlock.getNextBlock();
        }
    }
});

// Sayfa yüklendiğinde canvas'ı ve workspace'i başlat
window.addEventListener('load', function () {
    initCanvas();
    // Kalemin başlangıç durumu
    penDown = false;

    // Workspace'in boyutunu ayarla
    onResize();
    // Pencere boyutu değiştiğinde workspace'i yeniden boyutlandır
    window.addEventListener('resize', onResize);

    // Workspace'e varsayılan blokları ekle
    var defaultBlocks = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="when_flag_clicked" id="start" x="20" y="20">
    <next>
      <block type="pen_down">
        <next>
          <block type="turn_left">
            <value name="ANGLE">
              <shadow type="math_number">
                <field name="NUM">45</field>
              </shadow>
            </value>
            <next>
              <block type="move_steps">
                <value name="STEPS">
                  <shadow type="math_number">
                    <field name="NUM">100</field>
                  </shadow>
                </value>
                <next>
                  <block type="turn_left">
                    <value name="ANGLE">
                      <shadow type="math_number">
                        <field name="NUM">45</field>
                      </shadow>
                    </value>
                    <next>
                      <block type="move_steps">
                        <value name="STEPS">
                          <shadow type="math_number">
                            <field name="NUM">100</field>
                          </shadow>
                        </value>
                      </block>
                    </next>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>`;

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(defaultBlocks, "text/xml");
    Blockly.Xml.domToWorkspace(xmlDoc.documentElement, workspace);
});
