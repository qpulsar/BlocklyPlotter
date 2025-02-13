// Hareket bloklarının tanımlamaları
Blockly.Blocks['pen_down'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Kalemi indir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Kalemi çizim konumuna indirir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['pen_up'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Kalemi kaldır");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Kalemi çizim konumundan kaldırır");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['move_steps'] = {
    init: function() {
        this.appendValueInput("STEPS")
            .setCheck("Number")
            .appendField("adım kadar ilerle");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen adım kadar ileri gider");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '10';

        shadowBlock.appendChild(fieldElement);
        this.getInput('STEPS').connection.setShadowDom(shadowBlock);
    }
};

Blockly.Blocks['turn_right'] = {
    init: function() {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("sağa dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen derece kadar sağa döner");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '15';

        shadowBlock.appendChild(fieldElement);
        this.getInput('ANGLE').connection.setShadowDom(shadowBlock);
    }
};

Blockly.Blocks['turn_left'] = {
    init: function() {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("sola dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen derece kadar sola döner");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '15';

        shadowBlock.appendChild(fieldElement);
        this.getInput('ANGLE').connection.setShadowDom(shadowBlock);
    }
};

Blockly.Blocks['goto_random'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("rastgele konuma git");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['goto_xy'] = {
    init: function() {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x:");
        const xShadowBlock = Blockly.utils.xml.createElement('shadow');
        xShadowBlock.setAttribute('type', 'math_number');
        const xFieldElement = Blockly.utils.xml.createElement('field');
        xFieldElement.setAttribute('name', 'NUM');
        xFieldElement.textContent = '0';
        xShadowBlock.appendChild(xFieldElement);
        this.getInput("X").connection.setShadowDom(xShadowBlock);

        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        const yShadowBlock = Blockly.utils.xml.createElement('shadow');
        yShadowBlock.setAttribute('type', 'math_number');
        const yFieldElement = Blockly.utils.xml.createElement('field');
        yFieldElement.setAttribute('name', 'NUM');
        yFieldElement.textContent = '0';
        yShadowBlock.appendChild(yFieldElement);
        this.getInput("Y").connection.setShadowDom(yShadowBlock);

        this.appendDummyInput()
            .appendField("konumuna git");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen x ve y konumlarına gider");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_direction'] = {
    init: function() {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("yönüne dön");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '90';

        shadowBlock.appendChild(fieldElement);
        this.getInput("ANGLE").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen yöne döner");
    }
};

Blockly.Blocks['change_x'] = {
    init: function() {
        this.appendValueInput("DX")
            .setCheck("Number")
            .appendField("x konumunu");
        this.appendDummyInput()
            .appendField("değiştir");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '10';

        shadowBlock.appendChild(fieldElement);
        this.getInput("DX").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("X konumunu belirtilen değer kadar değiştirir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['change_y'] = {
    init: function() {
        this.appendValueInput("DY")
            .setCheck("Number")
            .appendField("y konumunu");
        this.appendDummyInput()
            .appendField("değiştir");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '10';

        shadowBlock.appendChild(fieldElement);
        this.getInput("DY").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Y konumunu belirtilen değer kadar değiştirir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_x'] = {
    init: function() {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x konumunu");
        this.appendDummyInput()
            .appendField("yap");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '0';

        shadowBlock.appendChild(fieldElement);
        this.getInput("X").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("X konumunu belirtilen değere ayarlar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_y'] = {
    init: function() {
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y konumunu");
        this.appendDummyInput()
            .appendField("yap");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '0';

        shadowBlock.appendChild(fieldElement);
        this.getInput("Y").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Y konumunu belirtilen değere ayarlar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['bounce_on_edge'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("kenara çarpınca sek");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['get_x'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("x konumu");
        this.setOutput(true, "Number");
        this.setColour(160);
    }
};

Blockly.Blocks['get_y'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("y konumu");
        this.setOutput(true, "Number");
        this.setColour(160);
    }
};

Blockly.Blocks['is_pen_down'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("kalem aşağıda mı?");
        this.setOutput(true, "Boolean");
        this.setColour(160);
    }
};
