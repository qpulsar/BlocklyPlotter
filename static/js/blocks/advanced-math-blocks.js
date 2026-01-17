/**
 * İleri Matematik Blokları
 * Trigonometrik fonksiyonlar, kökler, üsler, logaritmalar ve sabitler
 */

// =====================================================
// TRİGONOMETRİK FONKSİYONLAR
// =====================================================

// =====================================================
// TRİGONOMETRİK FONKSİYONLAR
// =====================================================

Blockly.Blocks['math_trig'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([
                ["sin", "SIN"],
                ["cos", "COS"],
                ["tan", "TAN"],
                ["arcsin", "ASIN"],
                ["arccos", "ACOS"],
                ["arctan", "ATAN"]
            ]), "OP");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Trigonometrik fonksiyonlar (Derece cinsinden)");
        this.setHelpUrl("");
    }
};

// =====================================================
// KÖK VE ÜS FONKSİYONLARI
// =====================================================

// =====================================================
// TEK PARAMETRELİ MATEMATİK FONKSİYONLARI (Kök, Üs, Logaritma vb.)
// =====================================================

Blockly.Blocks['math_single'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([
                ["√", "ROOT"],
                ["²", "SQUARE"],
                ["mutlak", "ABS"],
                ["-", "NEG"],
                ["ln", "LN"],
                ["log10", "LOG10"],
                ["e^", "EXP"],
                ["10^", "POW10"]
            ]), "OP");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Gelişmiş tek parametreli matematik fonksiyonları");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['math_pow'] = {
    init: function () {
        this.appendValueInput("BASE")
            .setCheck("Number");
        this.appendValueInput("EXPONENT")
            .setCheck("Number")
            .appendField("üzeri");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Tabanın üssünü hesaplar (taban^üs)");
        this.setHelpUrl("");
    }
};

// =====================================================
// MATEMATİKSEL SABİTLER
// =====================================================

/**
 * Pi sabiti (π)
 */
Blockly.Blocks['math_pi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("π");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Pi sayısı (3.14159...)");
        this.setHelpUrl("");
    }
};

/**
 * Euler sabiti (e)
 */
Blockly.Blocks['math_e'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("e");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Euler sayısı (2.71828...)");
        this.setHelpUrl("");
    }
};

/**
 * Altın oran (φ)
 */
Blockly.Blocks['math_phi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("φ");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Altın oran (1.61803...)");
        this.setHelpUrl("");
    }
};

// =====================================================
// DİĞER MATEMATİK FONKSİYONLARI
// =====================================================

/**
 * Özelleştirilebilir rastgele sayı üreteci
 */
Blockly.Blocks['random_range'] = {
    init: function () {
        this.appendValueInput("MIN")
            .setCheck("Number")
            .appendField("rastgele sayı");
        this.appendValueInput("MAX")
            .setCheck("Number")
            .appendField("ile");
        this.appendDummyInput()
            .appendField("arasında");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Belirtilen aralıkta rastgele tam sayı üretir");
        this.setHelpUrl("");

        // Shadow blokları ekle
        const minShadow = Blockly.utils.xml.createElement('shadow');
        minShadow.setAttribute('type', 'math_number');
        const minField = Blockly.utils.xml.createElement('field');
        minField.setAttribute('name', 'NUM');
        minField.textContent = '1';
        minShadow.appendChild(minField);
        this.getInput('MIN').connection.setShadowDom(minShadow);

        const maxShadow = Blockly.utils.xml.createElement('shadow');
        maxShadow.setAttribute('type', 'math_number');
        const maxField = Blockly.utils.xml.createElement('field');
        maxField.setAttribute('name', 'NUM');
        maxField.textContent = '100';
        maxShadow.appendChild(maxField);
        this.getInput('MAX').connection.setShadowDom(maxShadow);
    }
};



/**
 * Minimum fonksiyonu
 */
Blockly.Blocks['math_min'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("min");
        this.appendValueInput("B")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayıdan küçük olanı döndürür");
        this.setHelpUrl("");
    }
};

/**
 * Maksimum fonksiyonu
 */
Blockly.Blocks['math_max'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("max");
        this.appendValueInput("B")
            .setCheck("Number");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("İki sayıdan büyük olanı döndürür");
        this.setHelpUrl("");
    }
};

/**
 * Derece -> Radyan dönüşümü
 */
Blockly.Blocks['math_to_radians'] = {
    init: function () {
        this.appendValueInput("DEGREES")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("derece → radyan");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Dereceyi radyana çevirir");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '180';
        shadow.appendChild(field);
        this.getInput('DEGREES').connection.setShadowDom(shadow);
    }
};

/**
 * Radyan -> Derece dönüşümü
 */
Blockly.Blocks['math_to_degrees'] = {
    init: function () {
        this.appendValueInput("RADIANS")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("radyan → derece");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Radyanı dereceye çevirir");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '3.14159';
        shadow.appendChild(field);
        this.getInput('RADIANS').connection.setShadowDom(shadow);
    }
};

// =====================================================
// JAVASCRIPT GENERATORS
// =====================================================

Blockly.JavaScript.forBlock['math_trig'] = function (block) {
    var op = block.getFieldValue('OP');
    var arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    switch (op) {
        case 'SIN': code = 'Math.sin((' + arg + ') * Math.PI / 180)'; break;
        case 'COS': code = 'Math.cos((' + arg + ') * Math.PI / 180)'; break;
        case 'TAN': code = 'Math.tan((' + arg + ') * Math.PI / 180)'; break;
        case 'ASIN': code = '(Math.asin(' + arg + ') * 180 / Math.PI)'; break;
        case 'ACOS': code = '(Math.acos(' + arg + ') * 180 / Math.PI)'; break;
        case 'ATAN': code = '(Math.atan(' + arg + ') * 180 / Math.PI)'; break;
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_single'] = function (block) {
    var op = block.getFieldValue('OP');
    var arg = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var code = '';
    switch (op) {
        case 'ROOT': code = 'Math.sqrt(' + arg + ')'; break;
        case 'ABS': code = 'Math.abs(' + arg + ')'; break;
        case 'NEG': code = '-' + arg; break;
        case 'LN': code = 'Math.log(' + arg + ')'; break;
        case 'LOG10': code = 'Math.log10(' + arg + ')'; break;
        case 'EXP': code = 'Math.exp(' + arg + ')'; break;
        case 'POW10': code = 'Math.pow(10,' + arg + ')'; break;
        case 'SQUARE': code = 'Math.pow(' + arg + ', 2)'; break;
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_pow'] = function (block) {
    var base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var exp = Blockly.JavaScript.valueToCode(block, 'EXPONENT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.pow(' + base + ', ' + exp + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Sabitler
Blockly.JavaScript.forBlock['math_pi'] = function (block) {
    return ['Math.PI', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['math_e'] = function (block) {
    return ['Math.E', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['math_phi'] = function (block) {
    return ['1.6180339887498949', Blockly.JavaScript.ORDER_ATOMIC];
};

// Diğer fonksiyonlar
Blockly.JavaScript.forBlock['random_range'] = function (block) {
    var min = Blockly.JavaScript.valueToCode(block, 'MIN', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    var max = Blockly.JavaScript.valueToCode(block, 'MAX', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    return ['randomInt(' + min + ', ' + max + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};



Blockly.JavaScript.forBlock['math_min'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.min(' + a + ', ' + b + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_max'] = function (block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.max(' + a + ', ' + b + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_to_radians'] = function (block) {
    var degrees = Blockly.JavaScript.valueToCode(block, 'DEGREES', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['((' + degrees + ') * Math.PI / 180)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_to_degrees'] = function (block) {
    var radians = Blockly.JavaScript.valueToCode(block, 'RADIANS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['((' + radians + ') * 180 / Math.PI)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

console.log('advanced-math-blocks.js: İleri matematik blokları yüklendi');
