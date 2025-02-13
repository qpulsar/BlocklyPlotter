// Olay bloklarının tanımlamaları
Blockly.Blocks['when_flag_clicked'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("başlangıçta");
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};

Blockly.Blocks['when_key_pressed'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("tuşa basıldığında");
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};

Blockly.Blocks['when_message_received'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("mesaj alındığında");
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};

Blockly.Blocks['broadcast'] = {
    init: function() {
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("mesaj gönder");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};

Blockly.Blocks['wait_seconds'] = {
    init: function() {
        this.appendValueInput("SECONDS")
            .setCheck("Number")
            .appendField("bekle");
        this.appendDummyInput()
            .appendField("saniye");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(40);
    }
};
