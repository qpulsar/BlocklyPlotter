/**
 * İleri Matematik Blokları
 * Trigonometrik fonksiyonlar, kökler, üsler, logaritmalar ve sabitler
 */

// =====================================================
// TRİGONOMETRİK FONKSİYONLAR
// =====================================================

/**
 * Sinüs fonksiyonu (derece cinsinden)
 */
Blockly.Blocks['math_sin'] = {
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("sin");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Açının sinüsünü hesaplar (derece cinsinden)");
        this.setHelpUrl("");

        // Shadow blok ekle
        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '45';
        shadow.appendChild(field);
        this.getInput('ANGLE').connection.setShadowDom(shadow);
    }
};

/**
 * Kosinüs fonksiyonu (derece cinsinden)
 */
Blockly.Blocks['math_cos'] = {
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("cos");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Açının kosinüsünü hesaplar (derece cinsinden)");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '45';
        shadow.appendChild(field);
        this.getInput('ANGLE').connection.setShadowDom(shadow);
    }
};

/**
 * Tanjant fonksiyonu (derece cinsinden)
 */
Blockly.Blocks['math_tan'] = {
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("tan");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Açının tanjantını hesaplar (derece cinsinden)");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '45';
        shadow.appendChild(field);
        this.getInput('ANGLE').connection.setShadowDom(shadow);
    }
};

/**
 * Ark sinüs fonksiyonu (sonuç derece cinsinden)
 */
Blockly.Blocks['math_asin'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("arcsin");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Değerin ark sinüsünü hesaplar (sonuç derece cinsinden)");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '0.5';
        shadow.appendChild(field);
        this.getInput('VALUE').connection.setShadowDom(shadow);
    }
};

/**
 * Ark kosinüs fonksiyonu (sonuç derece cinsinden)
 */
Blockly.Blocks['math_acos'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("arccos");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Değerin ark kosinüsünü hesaplar (sonuç derece cinsinden)");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '0.5';
        shadow.appendChild(field);
        this.getInput('VALUE').connection.setShadowDom(shadow);
    }
};

/**
 * Ark tanjant fonksiyonu (sonuç derece cinsinden)
 */
Blockly.Blocks['math_atan'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck("Number")
            .appendField("arctan");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Değerin ark tanjantını hesaplar (sonuç derece cinsinden)");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '1';
        shadow.appendChild(field);
        this.getInput('VALUE').connection.setShadowDom(shadow);
    }
};

// =====================================================
// KÖK VE ÜS FONKSİYONLARI
// =====================================================

/**
 * Karekök fonksiyonu
 */
Blockly.Blocks['math_sqrt'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("√");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Sayının karekökünü hesaplar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '16';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
    }
};

/**
 * Üs alma fonksiyonu (a^b)
 */
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

        // Shadow blokları ekle
        const baseShadow = Blockly.utils.xml.createElement('shadow');
        baseShadow.setAttribute('type', 'math_number');
        const baseField = Blockly.utils.xml.createElement('field');
        baseField.setAttribute('name', 'NUM');
        baseField.textContent = '2';
        baseShadow.appendChild(baseField);
        this.getInput('BASE').connection.setShadowDom(baseShadow);

        const expShadow = Blockly.utils.xml.createElement('shadow');
        expShadow.setAttribute('type', 'math_number');
        const expField = Blockly.utils.xml.createElement('field');
        expField.setAttribute('name', 'NUM');
        expField.textContent = '3';
        expShadow.appendChild(expField);
        this.getInput('EXPONENT').connection.setShadowDom(expShadow);
    }
};

/**
 * Kare alma fonksiyonu (x²)
 */
Blockly.Blocks['math_square'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("²");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Sayının karesini hesaplar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '5';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
    }
};

// =====================================================
// LOGARİTMA FONKSİYONLARI
// =====================================================

/**
 * Logaritma (10 tabanında)
 */
Blockly.Blocks['math_log10'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("log₁₀");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("10 tabanında logaritma hesaplar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '100';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
    }
};

/**
 * Doğal logaritma (e tabanında)
 */
Blockly.Blocks['math_ln'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("ln");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Doğal logaritma (e tabanında) hesaplar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '10';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
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
 * Taban fonksiyonu (floor)
 */
Blockly.Blocks['math_floor'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("taban");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Sayıyı aşağı yuvarlar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '3.7';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
    }
};

/**
 * Tavan fonksiyonu (ceil)
 */
Blockly.Blocks['math_ceil'] = {
    init: function () {
        this.appendValueInput("NUM")
            .setCheck("Number")
            .appendField("tavan");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Sayıyı yukarı yuvarlar");
        this.setHelpUrl("");

        const shadow = Blockly.utils.xml.createElement('shadow');
        shadow.setAttribute('type', 'math_number');
        const field = Blockly.utils.xml.createElement('field');
        field.setAttribute('name', 'NUM');
        field.textContent = '3.2';
        shadow.appendChild(field);
        this.getInput('NUM').connection.setShadowDom(shadow);
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

// Trigonometrik fonksiyonlar
Blockly.JavaScript.forBlock['math_sin'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.sin((' + angle + ') * Math.PI / 180)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_cos'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.cos((' + angle + ') * Math.PI / 180)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_tan'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.tan((' + angle + ') * Math.PI / 180)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_asin'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['(Math.asin(' + value + ') * 180 / Math.PI)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_acos'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['(Math.acos(' + value + ') * 180 / Math.PI)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_atan'] = function (block) {
    var value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['(Math.atan(' + value + ') * 180 / Math.PI)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Kök ve üs fonksiyonları
Blockly.JavaScript.forBlock['math_sqrt'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.sqrt(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_pow'] = function (block) {
    var base = Blockly.JavaScript.valueToCode(block, 'BASE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var exp = Blockly.JavaScript.valueToCode(block, 'EXPONENT', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.pow(' + base + ', ' + exp + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_square'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.pow(' + num + ', 2)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Logaritma fonksiyonları
Blockly.JavaScript.forBlock['math_log10'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    return ['Math.log10(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_ln'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    return ['Math.log(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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

Blockly.JavaScript.forBlock['math_floor'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.floor(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['math_ceil'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.ceil(' + num + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
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
