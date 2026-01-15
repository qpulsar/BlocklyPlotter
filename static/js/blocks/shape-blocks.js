/**
 * Geometrik Şekil Blokları
 * Daire, dikdörtgen, çokgen ve çizgi çizim blokları
 */

// =====================================================
// BLOK TANIMLARI
// =====================================================

/**
 * Daire çiz bloğu
 */
Blockly.Blocks['draw_circle'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("Daire çiz merkez x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("yarıçap:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Belirtilen merkez ve yarıçap ile daire çizer");
        this.setHelpUrl("");

        // Shadow blokları ekle
    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'RADIUS', value: '50' }
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
 * Dikdörtgen çiz bloğu
 */
Blockly.Blocks['draw_rectangle'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("Dikdörtgen çiz x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("WIDTH")
            .setCheck("Number")
            .appendField("genişlik:");
        this.appendValueInput("HEIGHT")
            .setCheck("Number")
            .appendField("yükseklik:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Belirtilen konum ve boyutlarda dikdörtgen çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'WIDTH', value: '100' },
            { name: 'HEIGHT', value: '50' }
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
 * Çokgen çiz bloğu
 */
Blockly.Blocks['draw_polygon'] = {
    init: function () {
        this.appendValueInput("SIDES")
            .setCheck("Number")
            .appendField("Çokgen çiz kenar sayısı:");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("merkez x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("yarıçap:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Belirtilen kenar sayısı ile düzgün çokgen çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'SIDES', value: '6' },
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'RADIUS', value: '50' }
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
 * Çizgi çiz bloğu
 */
Blockly.Blocks['draw_line'] = {
    init: function () {
        this.appendValueInput("X1")
            .setCheck("Number")
            .appendField("Çizgi çiz x1:");
        this.appendValueInput("Y1")
            .setCheck("Number")
            .appendField("y1:");
        this.appendValueInput("X2")
            .setCheck("Number")
            .appendField("x2:");
        this.appendValueInput("Y2")
            .setCheck("Number")
            .appendField("y2:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("İki nokta arasında çizgi çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X1', value: '-50' },
            { name: 'Y1', value: '0' },
            { name: 'X2', value: '50' },
            { name: 'Y2', value: '0' }
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
 * Yay çiz bloğu
 */
Blockly.Blocks['draw_arc'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("Yay çiz merkez x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("yarıçap:");
        this.appendValueInput("START_ANGLE")
            .setCheck("Number")
            .appendField("başlangıç açısı:");
        this.appendValueInput("END_ANGLE")
            .setCheck("Number")
            .appendField("bitiş açısı:");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("Belirtilen açılar arasında yay çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'RADIUS', value: '50' },
            { name: 'START_ANGLE', value: '0' },
            { name: 'END_ANGLE', value: '180' }
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
 * Dolu daire çiz bloğu
 */
Blockly.Blocks['draw_filled_circle'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("Dolu daire çiz merkez x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("yarıçap:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("İçi dolu daire çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'RADIUS', value: '50' }
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
 * Dolu dikdörtgen çiz bloğu
 */
Blockly.Blocks['draw_filled_rectangle'] = {
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("Dolu dikdörtgen çiz x:");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("WIDTH")
            .setCheck("Number")
            .appendField("genişlik:");
        this.appendValueInput("HEIGHT")
            .setCheck("Number")
            .appendField("yükseklik:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip("İçi dolu dikdörtgen çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'X', value: '0' },
            { name: 'Y', value: '0' },
            { name: 'WIDTH', value: '100' },
            { name: 'HEIGHT', value: '50' }
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

// =====================================================
// JAVASCRIPT GENERATORS
// =====================================================

Blockly.JavaScript.forBlock['draw_circle'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    return 'drawCircle(' + x + ', ' + y + ', ' + radius + ');\n';
};

Blockly.JavaScript.forBlock['draw_rectangle'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    var height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    return 'drawRectangle(' + x + ', ' + y + ', ' + width + ', ' + height + ');\n';
};

Blockly.JavaScript.forBlock['draw_polygon'] = function (block) {
    var sides = Blockly.JavaScript.valueToCode(block, 'SIDES', Blockly.JavaScript.ORDER_ATOMIC) || '6';
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    return 'drawPolygon(' + sides + ', ' + x + ', ' + y + ', ' + radius + ');\n';
};

Blockly.JavaScript.forBlock['draw_line'] = function (block) {
    var x1 = Blockly.JavaScript.valueToCode(block, 'X1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y1 = Blockly.JavaScript.valueToCode(block, 'Y1', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var x2 = Blockly.JavaScript.valueToCode(block, 'X2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y2 = Blockly.JavaScript.valueToCode(block, 'Y2', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'drawLine(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ');\n';
};

Blockly.JavaScript.forBlock['draw_arc'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    var startAngle = Blockly.JavaScript.valueToCode(block, 'START_ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var endAngle = Blockly.JavaScript.valueToCode(block, 'END_ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '180';
    return 'drawArc(' + x + ', ' + y + ', ' + radius + ', ' + startAngle + ', ' + endAngle + ');\n';
};

Blockly.JavaScript.forBlock['draw_filled_circle'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    return 'drawFilledCircle(' + x + ', ' + y + ', ' + radius + ');\n';
};

Blockly.JavaScript.forBlock['draw_filled_rectangle'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var width = Blockly.JavaScript.valueToCode(block, 'WIDTH', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    var height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    return 'drawFilledRectangle(' + x + ', ' + y + ', ' + width + ', ' + height + ');\n';
};

console.log('shape-blocks.js: Geometrik şekil blokları yüklendi');
