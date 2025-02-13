// Zaman bloklarının tanımlamaları
Blockly.Blocks['timer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("kronometre");
        this.setOutput(true, "Number");
        this.setColour(40);
    }
};

Blockly.Blocks['reset_timer'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("kronometreyi sıfırla");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};

Blockly.Blocks['current_hour'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("saat");
        this.setOutput(true, "Number");
        this.setColour(40);
    }
};

Blockly.Blocks['current_minute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("dakika");
        this.setOutput(true, "Number");
        this.setColour(40);
    }
};

Blockly.Blocks['current_second'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("saniye");
        this.setOutput(true, "Number");
        this.setColour(40);
    }
};
