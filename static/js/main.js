// Workspace'i oluştur
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

// Save button click handler
document.getElementById('saveButton').addEventListener('click', function () {
    var workspace = Blockly.getMainWorkspace();
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('blocklyWorkspace', xmlText);
});

// Run button click handler
document.getElementById('runButton').addEventListener('click', function () {
    // Workspace'deki blokları konsola listele
    var blocks = workspace.getAllBlocks(true);


    /*    console.log("Workspace'deki bloklar:");
       blocks.forEach(function (block) {
           console.log("Blok tipi:", block.type);
           console.log("Blok ID:", block.id);
           // Blok içindeki değerleri göster
           var fields = block.inputList[0] ? block.inputList[0].fieldRow : [];
           fields.forEach(function (field) {
               if (field.value_) {
                   console.log("Değer:", field.value_);
               }
           });
           console.log("-----------------");
       });
    */


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

// Sayfa yüklendiğinde canvas'ı başlat
window.addEventListener('load', function () {
    //console.log('Sayfa yüklendi, canvas başlatılıyor...');
    initCanvas();
    // Kalemin başlangıç durumu
    penDown = false;

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
                        <next>
                          <block type="turn_right">
                            <value name="ANGLE">
                              <shadow type="math_number">
                                <field name="NUM">60</field>
                              </shadow>
                            </value>
                            <next>
                              <block type="move_steps">
                                <value name="STEPS">
                                  <shadow type="math_number">
                                    <field name="NUM">50</field>
                                  </shadow>
                                </value>
                                <next>
                                  <block type="turn_right">
                                    <value name="ANGLE">
                                      <shadow type="math_number">
                                        <field name="NUM">45</field>
                                      </shadow>
                                    </value>
                                    <next>
                                      <block type="move_steps">
                                        <value name="STEPS">
                                          <shadow type="math_number">
                                            <field name="NUM">50</field>
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
