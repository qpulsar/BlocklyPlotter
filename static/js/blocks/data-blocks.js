// Veri bloklarının tanımlamaları (değişkenler ve listeler)
Blockly.Blocks['variables_set'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .appendField("")
            .appendField(new Blockly.FieldVariable("öğe"), "VAR")
            .appendField("=");
        this.appendDummyInput()
            .appendField(new Blockly.FieldCheckbox("TRUE"), "SHOW_ON_CANVAS")
            .appendField("Canvas'ta göster");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Bir değişkene değer atar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['variables_change'] = {
    init: function() {
        this.appendValueInput("DELTA")
            .setCheck("Number")
            .appendField(new Blockly.FieldVariable("öğe"), "VAR")
            .appendField("değerini");
        this.appendDummyInput()
            .appendField("kadar değiştir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
    }
};

Blockly.Blocks['lists_create'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("yeni liste");
        this.setOutput(true, "Array");
        this.setColour(330);
        this.setTooltip("Boş bir liste oluşturur");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lists_add'] = {
    init: function() {
        this.appendValueInput("ITEM")
            .appendField("listeye ekle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Listeye yeni bir öğe ekler");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lists_delete'] = {
    init: function() {
        this.appendValueInput("INDEX")
            .setCheck("Number")
            .appendField("listeden sil");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Listeden belirtilen indeksteki öğeyi siler");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lists_clear'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("listeyi temizle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Listedeki tüm öğeleri siler");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['lists_create_with'] = {
    init: function() {
        this.appendValueInput("ITEM0")
            .appendField("liste");
        this.appendValueInput("ITEM1");
        this.appendValueInput("ITEM2");
        this.setOutput(true, "Array");
        this.setColour(330);
        this.setTooltip("Belirtilen öğelerle bir liste oluşturur");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
        this.setColour(330);
    }
};

Blockly.Blocks['text_join'] = {
    init: function() {
        this.appendValueInput("A")
            .setCheck("String");
        this.appendValueInput("B")
            .setCheck("String")
            .appendField("birleştir");
        this.setOutput(true, "String");
        this.setColour(330);
        this.setTooltip("İki metni birleştirir");
        this.setHelpUrl("");
    }
};
