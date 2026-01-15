/**
 * Kalem Ayarları Blokları
 * Kalem rengi, kalınlığı ve arkaplan rengi blokları
 */

// =====================================================
// BLOK TANIMLARI
// =====================================================

/**
 * Kalem rengini ayarla bloğu
 */
Blockly.Blocks['set_pen_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Kalem rengini")
            .appendField(new Blockly.FieldColour('#000000'), 'COLOR')
            .appendField("yap");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Kalemin çizim rengini değiştirir");
        this.setHelpUrl("");
    }
};

/**
 * Kalem kalınlığını ayarla bloğu
 */
Blockly.Blocks['set_pen_size'] = {
    init: function () {
        this.appendValueInput("SIZE")
            .setCheck("Number")
            .appendField("Kalem kalınlığını");
        this.appendDummyInput()
            .appendField("yap");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Kalemin çizgi kalınlığını değiştirir");
        this.setHelpUrl("");

        // Shadow blok ekle
        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '2';
        shadow.appendChild(field);
        this.getInput('SIZE').connection.setShadowDom(shadow);
    }
};

/**
 * Arkaplan rengini ayarla bloğu
 */
Blockly.Blocks['set_background_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Arkaplan rengini")
            .appendField(new Blockly.FieldColour('#FFFFFF'), 'COLOR')
            .appendField("yap");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Canvas arkaplan rengini değiştirir");
        this.setHelpUrl("");
    }
};

/**
 * Kalem rengi RGB bloğu
 */
Blockly.Blocks['set_pen_color_rgb'] = {
    init: function () {
        this.appendValueInput("R")
            .setCheck("Number")
            .appendField("Kalem rengini R:");
        this.appendValueInput("G")
            .setCheck("Number")
            .appendField("G:");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("B:");
        this.appendDummyInput()
            .appendField("yap");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Kalem rengini RGB değerleriyle ayarlar (0-255)");
        this.setHelpUrl("");

        this._addShadowBlocks();
    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'R', value: '0' },
            { name: 'G', value: '0' },
            { name: 'B', value: '0' }
        ];
        inputs.forEach(input => {
            const shadow = Blockly.utils.xml.createElement('shadow');
            shadow.setAttribute('type', 'math_number');
            const field = Blockly.utils.xml.createElement('field');
            field.setAttribute('name', 'NUM');
            field.textContent = input.value;
            shadow.appendChild(field);
            if (this.getInput(input.name)) {
                this.getInput(input.name).connection.setShadowDom(shadow);
            }
        });
    }
};

/**
 * Kalem rengini al bloğu
 */
Blockly.Blocks['get_pen_color'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("kalem rengi");
        this.setOutput(true, "Colour");
        this.setColour(160);
        this.setTooltip("Mevcut kalem rengini döndürür");
        this.setHelpUrl("");
    }
};

/**
 * Kalem kalınlığını al bloğu
 */
Blockly.Blocks['get_pen_size'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("kalem kalınlığı");
        this.setOutput(true, "Number");
        this.setColour(160);
        this.setTooltip("Mevcut kalem kalınlığını döndürür");
        this.setHelpUrl("");
    }
};

// =====================================================
// JAVASCRIPT GENERATORS
// =====================================================

Blockly.JavaScript.forBlock['set_pen_color'] = function (block) {
    var color = block.getFieldValue('COLOR');
    return 'setPenColor("' + color + '");\n';
};

Blockly.JavaScript.forBlock['set_pen_size'] = function (block) {
    var size = Blockly.JavaScript.valueToCode(block, 'SIZE', Blockly.JavaScript.ORDER_ATOMIC) || '2';
    return 'setPenSize(' + size + ');\n';
};

Blockly.JavaScript.forBlock['set_background_color'] = function (block) {
    var color = block.getFieldValue('COLOR');
    return 'setBackgroundColor("' + color + '");\n';
};

Blockly.JavaScript.forBlock['set_pen_color_rgb'] = function (block) {
    var r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var g = Blockly.JavaScript.valueToCode(block, 'G', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setPenColorRGB(' + r + ', ' + g + ', ' + b + ');\n';
};

Blockly.JavaScript.forBlock['get_pen_color'] = function (block) {
    return ['getPenColor()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['get_pen_size'] = function (block) {
    return ['getPenSize()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

console.log('pen-settings-blocks.js: Kalem ayarları blokları yüklendi');
