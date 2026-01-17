// Blok tanımlamaları
Blockly.Blocks['pen_down'] = {
    init: function () {
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
    init: function () {
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
    init: function () {
        this.appendValueInput("STEPS")
            .setCheck("Number")
            .appendField("adım kadar ilerle");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen adım kadar ileri gider");

        // Gölge blok manuel olarak ekleniyor
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
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("sağa dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen derece kadar sağa döner");

        // Gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("sola dön");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen derece kadar sola döner");

        // Gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendDummyInput()
            .appendField("rastgele konuma git");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['goto_xy'] = {
    init: function () {
        // X giriş alanı
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x:");
        // X için gölge blok ekleme
        const xShadowBlock = Blockly.utils.xml.createElement('shadow');
        xShadowBlock.setAttribute('type', 'math_number');
        const xFieldElement = Blockly.utils.xml.createElement('field');
        xFieldElement.setAttribute('name', 'NUM');
        xFieldElement.textContent = '0';
        xShadowBlock.appendChild(xFieldElement);
        this.getInput("X").connection.setShadowDom(xShadowBlock);

        // Y giriş alanı
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y:");
        // Y için gölge blok ekleme
        const yShadowBlock = Blockly.utils.xml.createElement('shadow');
        yShadowBlock.setAttribute('type', 'math_number');
        const yFieldElement = Blockly.utils.xml.createElement('field');
        yFieldElement.setAttribute('name', 'NUM');
        yFieldElement.textContent = '0';
        yShadowBlock.appendChild(yFieldElement);
        this.getInput("Y").connection.setShadowDom(yShadowBlock);

        // Konumuna git açıklaması
        this.appendDummyInput()
            .appendField("konumuna git");

        // Blok bağlantı ayarları
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen x ve y konumlarına gider");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['set_direction'] = {
    init: function () {
        // ANGLE giriş alanı
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("yönüne dön");

        // ANGLE için varsayılan gölge blok ekleme
        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '90'; // Varsayılan değer: 90

        shadowBlock.appendChild(fieldElement);
        this.getInput("ANGLE").connection.setShadowDom(shadowBlock);

        // Blok özellikleri
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
        this.setTooltip("Belirtilen yöne döner");
    }
};


Blockly.Blocks['change_x'] = {
    init: function () {
        this.appendValueInput("DX")
            .setCheck("Number")
            .appendField("x konumunu");
        this.appendDummyInput()
            .appendField("değiştir");

        // Varsayılan gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendValueInput("DY")
            .setCheck("Number")
            .appendField("y konumunu");
        this.appendDummyInput()
            .appendField("değiştir");

        // Varsayılan gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x konumunu");
        this.appendDummyInput()
            .appendField("yap");

        // Varsayılan gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y konumunu");
        this.appendDummyInput()
            .appendField("yap");

        // Varsayılan gölge blok (shadow block) ekleme
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
    init: function () {
        this.appendDummyInput()
            .appendField("kenara geldiysen sek");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
    }
};

Blockly.Blocks['get_x'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("x konumu");
        this.setOutput(true, "Number");
        this.setColour(160);
    }
};

Blockly.Blocks['get_y'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("y konumu");
        this.setOutput(true, "Number");
        this.setColour(160);
    }
};

Blockly.Blocks['when_flag_clicked'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Yeşil bayrak tıklanınca");
        this.setNextStatement(true, null);
        this.setColour(60);
        this.setTooltip("Program başladığında çalışır");
    }
};

Blockly.Blocks['when_key_pressed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Tuşa basılınca")
            .appendField(new Blockly.FieldDropdown([
                ["boşluk (space)", "space"],
                ["yukarı ok", "ArrowUp"],
                ["aşağı ok", "ArrowDown"],
                ["sol ok", "ArrowLeft"],
                ["sağ ok", "ArrowRight"],
                ["herhangi", "any"]
            ]), "KEY");
        this.setNextStatement(true, null);
        this.setColour(60);
    }
};

Blockly.Blocks['when_message_received'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Haber alındığında")
            .appendField(new Blockly.FieldTextInput("mesaj1"), "MESSAGE");
        this.setNextStatement(true, null);
        this.setColour(60);
    }
};

Blockly.Blocks['broadcast'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("haber sal")
            .appendField(new Blockly.FieldTextInput("mesaj1"), "MESSAGE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(60);
    }
};

Blockly.Blocks['wait_seconds'] = {
    init: function () {
        this.appendValueInput("SECONDS")
            .setCheck("Number")
            .appendField("saniye bekle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);

        // Gölge blok ekleme
        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');
        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '1';
        shadowBlock.appendChild(fieldElement);
        this.getInput('SECONDS').connection.setShadowDom(shadowBlock);
    }
};

Blockly.Blocks['repeat_times'] = {
    init: function () {
        // TIMES giriş alanı
        this.appendValueInput("TIMES")
            .setCheck("Number")
            .appendField("defa tekrarla");

        // TIMES için varsayılan gölge blok ekleme
        const shadowBlock = Blockly.utils.xml.createElement('shadow');
        shadowBlock.setAttribute('type', 'math_number');

        const fieldElement = Blockly.utils.xml.createElement('field');
        fieldElement.setAttribute('name', 'NUM');
        fieldElement.textContent = '10'; // Varsayılan değer: 10

        shadowBlock.appendChild(fieldElement);
        this.getInput("TIMES").connection.setShadowDom(shadowBlock);

        // DO alanı (yapılacak işlemler)
        this.appendStatementInput("DO")
            .appendField("yap");

        // Blok özellikleri
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};


Blockly.Blocks['forever'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("sürekli tekrarla");
        this.appendStatementInput("DO")
            .appendField("yap");
        this.setPreviousStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['if'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("eğer");
        this.appendStatementInput("DO")
            .appendField("ise");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['if_else'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("eğer");
        this.appendStatementInput("DO")
            .appendField("ise");
        this.appendStatementInput("ELSE")
            .appendField("değilse");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['wait_until'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("olana kadar bekle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['repeat_until'] = {
    init: function () {
        this.appendValueInput("CONDITION")
            .setCheck("Boolean")
            .appendField("olana kadar tekrarla");
        this.appendStatementInput("DO")
            .appendField("yap");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['stop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("durdur");
        this.setPreviousStatement(true, null);
        this.setColour(120);
    }
};

Blockly.Blocks['is_pen_down'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Kalem yazıyor");
        this.setOutput(true, "Boolean");
        this.setColour(180);
    }
};

Blockly.Blocks['timer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("zamanlayıcı");
        this.setOutput(true, "Number");
        this.setColour(180);
    }
};

Blockly.Blocks['reset_timer'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("zamanlayıcıyı sıfırla");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
    }
};

Blockly.Blocks['current_hour'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("saat");
        this.setOutput(true, "Number");
        this.setColour(180);
    }
};

Blockly.Blocks['current_minute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("dakika");
        this.setOutput(true, "Number");
        this.setColour(180);
    }
};

Blockly.Blocks['current_second'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("saniye");
        this.setOutput(true, "Number");
        this.setColour(180);
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
    }
};

Blockly.Blocks['math_multiply'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("*");
        this.setOutput(true, "Number");
        this.setColour(230);
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
    }
};

Blockly.Blocks['math_divide'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("/");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};
//----
Blockly.Blocks['random_int'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("1 ile 10 arasında bir sayı seç");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

// Karşılaştırma Bloğu Tanımlama
Blockly.Blocks['comparison_block'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("Birinci değer");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [">", "GT"],
                ["<", "LT"],
                ["=", "EQ"],
                [">=", "GTE"],
                ["<=", "LTE"]
            ]), "OPERATOR");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("İkinci değer");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(210);
        this.setTooltip("Seçili operatöre göre iki değeri karşılaştırır.");
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
            .appendField("mutlak değer");
        this.setOutput(true, "Number");
        this.setColour(230);
    }
};

Blockly.Blocks['variables_set'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .appendField("değişkenin değerini")
            .appendField(new Blockly.FieldVariable("item"), "VAR");
        this.appendDummyInput()
            .appendField("yap");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
    }
};

Blockly.Blocks['variables_change'] = {
    init: function () {
        this.appendValueInput("DELTA")
            .setCheck("Number")
            .appendField("değişkenin değerini")
            .appendField(new Blockly.FieldVariable("item"), "VAR");
        this.appendDummyInput()
            .appendField("değiştir");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
    }
};

Blockly.Blocks['lists_create'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Liste oluştur")
            .appendField(new Blockly.FieldVariable("liste"), "LIST");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
    }
};

Blockly.Blocks['lists_add'] = {
    init: function () {
        this.appendValueInput("ITEM")
            .appendField("Listeye")
            .appendField(new Blockly.FieldVariable("liste"), "LIST");
        this.appendDummyInput()
            .appendField("eleman ekle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
    }
};

Blockly.Blocks['lists_delete'] = {
    init: function () {
        this.appendValueInput("INDEX")
            .setCheck("Number")
            .appendField("Listeden")
            .appendField(new Blockly.FieldVariable("liste"), "LIST");
        this.appendDummyInput()
            .appendField(". elemanı sil");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
    }
};

Blockly.Blocks['lists_clear'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Listeyi")
            .appendField(new Blockly.FieldVariable("liste"), "LIST")
            .appendField("temizle");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(260);
    }
};

Blockly.Blocks['text_join'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck(null);
        this.appendValueInput("B")
            .setCheck(null);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
    }
};

Blockly.Blocks['logic_null'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("null");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
    }
};

Blockly.Blocks['logic_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["true", "TRUE"], ["false", "FALSE"]]), "BOOL");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
    }
};

Blockly.Blocks['text'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput(""), "TEXT");
        this.setOutput(true, "String");
        this.setColour(230);
        this.setTooltip("");
    }
};

Blockly.Blocks['math_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "NUM");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("");
    }
};

Blockly.Blocks['lists_create_with'] = {
    init: function () {
        this.appendValueInput("ADD0")
            .appendField("create list with");
        this.appendValueInput("ADD1");
        this.appendValueInput("ADD2");
        this.setOutput(true, "Array");
        this.setColour(260);
        this.setTooltip("");
        this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    }
};

// Kod üretimi için JavaScript generator tanımlamaları
Blockly.JavaScript.forBlock['pen_down'] = function (block) {
    return 'penDown = true;\nupdateCanvas();\n';
};

Blockly.JavaScript.forBlock['pen_up'] = function (block) {
    return 'penDown = false;\nupdateCanvas();\n';
};

Blockly.JavaScript.forBlock['move_steps'] = function (block) {
    var steps = Blockly.JavaScript.valueToCode(block, 'STEPS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'moveSteps(' + steps + ');\n';
};

Blockly.JavaScript.forBlock['turn_right'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'turnRight(' + angle + ');\n';
};

Blockly.JavaScript.forBlock['turn_left'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'turnLeft(' + angle + ');\n';
};

Blockly.JavaScript.forBlock['goto_random'] = function (block) {
    return 'gotoRandom();\n';
};

Blockly.JavaScript.forBlock['goto_xy'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'gotoXY(' + x + ', ' + y + ');\n';
};

Blockly.JavaScript.forBlock['set_direction'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setDirection(' + angle + ');\n';
};

Blockly.JavaScript.forBlock['change_x'] = function (block) {
    var dx = Blockly.JavaScript.valueToCode(block, 'DX', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'changeX(' + dx + ');\n';
};

Blockly.JavaScript.forBlock['change_y'] = function (block) {
    var dy = Blockly.JavaScript.valueToCode(block, 'DY', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'changeY(' + dy + ');\n';
};

Blockly.JavaScript.forBlock['set_x'] = function (block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setX(' + x + ');\n';
};

Blockly.JavaScript.forBlock['set_y'] = function (block) {
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setY(' + y + ');\n';
};

Blockly.JavaScript.forBlock['bounce_on_edge'] = function (block) {
    return 'bounceOnEdge();\n';
};

Blockly.JavaScript.forBlock['get_x'] = function (block) {
    return ['getX()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['get_y'] = function (block) {
    return ['getY()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['when_flag_clicked'] = function (block) {
    // Bu blok sadece başlangıç noktası olarak kullanılıyor
    // Bağlı bloklar main.js'de executeBlock ile yürütülüyor
    return '';
};



Blockly.JavaScript.forBlock['when_key_pressed'] = function (block) {
    var key = block.getFieldValue('KEY');
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'whenKeyPressed("' + key + '", function() {\n' + branch + '});\n';
};

Blockly.JavaScript.forBlock['when_message_received'] = function (block) {
    var message = block.getFieldValue('MESSAGE');
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'whenMessageReceived("' + message + '", function() {\n' + branch + '});\n';
};

Blockly.JavaScript.forBlock['broadcast'] = function (block) {
    var message = block.getFieldValue('MESSAGE');
    return 'broadcast("' + message + '");\n';
};

Blockly.JavaScript.forBlock['wait_seconds'] = function (block) {
    var seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'waitSeconds(' + seconds + ');\n';
};

Blockly.JavaScript.forBlock['repeat_times'] = function (block) {
    var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC) || '10';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    var code = 'for (var count = 0; count < ' + repeats + '; count++) {\n' + branch + '}\n';
    return code;
};

Blockly.JavaScript.forBlock['forever'] = function (block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'forever(function() {\n' + branch + '});\n';
};

Blockly.JavaScript.forBlock['if'] = function (block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'if (' + condition + ') {\n' + branch + '}\n';
};

Blockly.JavaScript.forBlock['if_else'] = function (block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch1 = Blockly.JavaScript.statementToCode(block, 'DO');
    var branch2 = Blockly.JavaScript.statementToCode(block, 'ELSE');
    return 'if (' + condition + ') {\n' + branch1 + '} else {\n' + branch2 + '}\n';
};

Blockly.JavaScript.forBlock['wait_until'] = function (block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    return 'waitUntil(' + condition + ');\n';
};

Blockly.JavaScript.forBlock['repeat_until'] = function (block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'repeatUntil(' + condition + ', function() {\n' + branch + '});\n';
};

Blockly.JavaScript.forBlock['stop'] = function (block) {
    return 'stop();\n';
};

Blockly.JavaScript.forBlock['is_pen_down'] = function (block) {
    return ['isPenDown()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['timer'] = function (block) {
    return ['timer()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['reset_timer'] = function (block) {
    return 'resetTimer();\n';
};

Blockly.JavaScript.forBlock['current_hour'] = function (block) {
    return ['currentHour()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['current_minute'] = function (block) {
    return ['currentMinute()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['current_second'] = function (block) {
    return ['currentSecond()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_arithmetic'] = function (block) {
    var operator = block.getFieldValue('OP');
    var order = Blockly.JavaScript.ORDER_NONE;
    var operatorSymbol = '';

    switch (operator) {
        case 'ADD':
            operatorSymbol = ' + ';
            order = Blockly.JavaScript.ORDER_ADDITION;
            break;
        case 'MINUS':
            operatorSymbol = ' - ';
            order = Blockly.JavaScript.ORDER_SUBTRACTION;
            break;
        case 'MULTIPLY':
            operatorSymbol = ' * ';
            order = Blockly.JavaScript.ORDER_MULTIPLICATION;
            break;
        case 'DIVIDE':
            operatorSymbol = ' / ';
            order = Blockly.JavaScript.ORDER_DIVISION;
            break;
        case 'POWER':
            operatorSymbol = null;
            order = Blockly.JavaScript.ORDER_FUNCTION_CALL; // Math.pow
            break;
    }

    var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
    var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

    var code;
    if (!operatorSymbol) { // Power (Math.pow)
        code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }

    code = argument0 + operatorSymbol + argument1;
    return [code, order];
};

Blockly.JavaScript.forBlock['math_add'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [a + ' + ' + b, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript.forBlock['math_multiply'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [a + ' * ' + b, Blockly.JavaScript.ORDER_MULTIPLICATION];
};

Blockly.JavaScript.forBlock['math_subtract'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [a + ' - ' + b, Blockly.JavaScript.ORDER_SUBTRACTION];
};

Blockly.JavaScript.forBlock['math_divide'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [a + ' / ' + b, Blockly.JavaScript.ORDER_DIVISION];
};

Blockly.JavaScript.forBlock['random_int'] = function (block) {
    return ['randomInt(1, 10)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['logic_and'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || 'false';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || 'false';
    return [a + ' && ' + b, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript.forBlock['logic_or'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || 'false';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || 'false';
    return [a + ' || ' + b, Blockly.JavaScript.ORDER_LOGICAL_OR];
};

Blockly.JavaScript.forBlock['math_modulo'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '0';
    return [a + ' % ' + b, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript.forBlock['math_round'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_NONE) || '0';
    return ['Math.round(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_abs'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_NONE) || '0';
    return ['Math.abs(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['variables_set'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' = ' + value + ';\n';
};

Blockly.JavaScript.forBlock['variables_change'] = function (block) {
    var delta = Blockly.JavaScript.valueToCode(block, 'DELTA', Blockly.JavaScript.ORDER_ADDITION) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    return varName + ' += ' + delta + ';\n';
};

Blockly.JavaScript.forBlock['lists_create'] = function (block) {
    var listName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    return listName + ' = [];\n';
};

Blockly.JavaScript.forBlock['lists_add'] = function (block) {
    var item = Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_NONE) || 'null';
    var listName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    return listName + '.push(' + item + ');\n';
};

Blockly.JavaScript.forBlock['lists_delete'] = function (block) {
    var index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_NONE) || '0';
    var listName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    return listName + '.splice(' + index + ', 1);\n';
};

Blockly.JavaScript.forBlock['lists_clear'] = function (block) {
    var listName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('LIST'), Blockly.Variables.NAME_TYPE);
    return listName + '.length = 0;\n';
};

Blockly.JavaScript.forBlock['text_join'] = function (block) {
    var valueA = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var valueB = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var code = valueA + ' + ' + valueB;
    return [code, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript.forBlock['logic_null'] = function (block) {
    return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['logic_boolean'] = function (block) {
    var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['text'] = function (block) {
    var code = JSON.stringify(block.getFieldValue('TEXT'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['math_number'] = function (block) {
    var code = Number(block.getFieldValue('NUM'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['lists_create_with'] = function (block) {
    var elements = [];
    for (var i = 0; i < block.itemCount_; i++) {
        var element = Blockly.JavaScript.valueToCode(block, 'ADD' + i, Blockly.JavaScript.ORDER_NONE) || 'null';
        elements.push(element);
    }
    var code = '[' + elements.join(', ') + ']';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
// JavaScript Generator
Blockly.JavaScript.forBlock['comparison_block'] = function (block) {
    var valueA = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var operator = block.getFieldValue('OPERATOR');
    var valueB = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';

    var code = '';
    switch (operator) {
        case "GT":  // Büyüktür
            code = valueA + ' > ' + valueB;
            break;
        case "LT":  // Küçüktür
            code = valueA + ' < ' + valueB;
            break;
        case "EQ":  // Eşittir
            code = valueA + ' === ' + valueB;
            break;
        case "GTE": // Büyük Eşittir
            code = valueA + ' >= ' + valueB;
            break;
        case "LTE": // Küçük Eşittir
            code = valueA + ' <= ' + valueB;
            break;
    }

    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
};

// Blockly temel yapılandırması
const blocklyConfig = {
    toolbox: document.getElementById('toolbox'),
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    zoom: {
        controls: true,
        wheel: false,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    }
};

// Blockly'yi başlat

document.addEventListener('DOMContentLoaded', () => {
    //const workspace = Blockly.inject('blocklyDiv', blocklyConfig);

    // Çalışma alanını ayarla
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.BLOCK_DELETE ||
            event.type === Blockly.Events.BLOCK_CHANGE ||
            event.type === Blockly.Events.BLOCK_MOVE) {
            try {
                // JavaScript kodunu oluştur
                const code = Blockly.JavaScript.workspaceToCode(workspace);
                // Kodu güncelle
                if (typeof updateCode === 'function') {
                    updateCode(code);
                }
            } catch (error) {
                console.error('Kod oluşturma hatası:', error);
            }
        }
    });

    // Pencere yeniden boyutlandırıldığında Blockly'yi güncelle
    window.addEventListener('resize', () => {
        const blocklyArea = document.getElementById('blocklyArea');
        const blocklyDiv = document.getElementById('blocklyDiv');
        const position = {
            x: blocklyArea.offsetLeft,
            y: blocklyArea.offsetTop
        };

        blocklyDiv.style.left = position.x + 'px';
        blocklyDiv.style.top = position.y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';

        Blockly.svgResize(workspace);
    });
});
