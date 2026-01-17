// Matematik ve mantık bloklarının tanımlamaları
// NOT: math_add, math_subtract vb. bloklar geriye dönük uyumluluk için tutuluyor ancak toolbox'tan kaldırıldı.
// Yerine aşağıdaki math_arithmetic bloğu kullanılıyor.

Blockly.Blocks['math_arithmetic'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["+", "ADD"],
                ["-", "MINUS"],
                ["×", "MULTIPLY"],
                ["÷", "DIVIDE"],
                ["^", "POWER"]
            ]), "OP");
        this.appendValueInput("B")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İşlem seçerek iki sayıyı hesaplar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_add'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("+");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayıyı toplar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_multiply'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("×");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayıyı çarpar");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_subtract'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("-");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayının farkını alır");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_divide'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("÷");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayının bölümünü alır");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['random_int'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("rastgele sayı");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['comparison_block'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck(["Number", "String", "Boolean"]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["=", "EQ"],
                ["≠", "NEQ"],
                [">", "GT"],
                ["≥", "GTE"],
                ["<", "LT"],
                ["≤", "LTE"]
            ]), "OP");
        this.appendValueInput("B")
            .setCheck(["Number", "String", "Boolean"]);
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("İki değeri karşılaştırır");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['logic_and'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Boolean");
        this.appendValueInput("B")
            .setCheck("Boolean")
            .appendField("ve");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("İki koşulu VE işlemi ile birleştirir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['logic_or'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Boolean");
        this.appendValueInput("B")
            .setCheck("Boolean")
            .appendField("veya");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("İki koşulu VEYA işlemi ile birleştirir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_modulo'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("mod");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Bölme işleminin kalanını verir");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_round'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("yuvarla");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['math_abs'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("mutlak");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['logic_null'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("boş");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("Boş değer döndürür");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['logic_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["doğru", "TRUE"], ["yanlış", "FALSE"]]), "BOOL");
        this.setOutput(true, "Boolean");
        this.setColour(230);
    }
};

Blockly.Blocks['math_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "NUM");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};
