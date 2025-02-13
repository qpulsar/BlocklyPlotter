// Kontrol bloklarının tanımlamaları
Blockly.Blocks['repeat_times'] = {
    init: function() {
        this.appendValueInput("TIMES")
            .setCheck("Number")
            .appendField("tekrarla");
        this.appendDummyInput()
            .appendField("kez");
        this.appendStatementInput("DO")
            .appendField("");

        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '10';

        shadowBlock.appendChild(fieldElement);
        this.getInput("TIMES").connection.setShadowDom(shadowBlock);

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("Belirtilen sayı kadar tekrarlar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['forever'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("sürekli");
        this.appendStatementInput("DO")
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['if'] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("eğer");
        this.appendStatementInput("DO")
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['if_else'] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("eğer");
        this.appendStatementInput("DO")
            .appendField("");
        this.appendStatementInput("ELSE")
            .appendField("değilse");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['wait_until'] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("bekle");
        this.appendDummyInput()
            .appendField("olana kadar");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['repeat_until'] = {
    init: function() {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("tekrarla");
        this.appendDummyInput()
            .appendField("olana kadar");
        this.appendStatementInput("DO")
            .appendField("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("durdur");
        this.setPreviousStatement(true, null);
        this.setColour(120);
    }
};
