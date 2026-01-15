/**
 * Fizik Simülasyon Blokları
 * Eğik atış, serbest düşüş ve fizik hesaplamaları
 */

// =====================================================
// FİZİK SABİTLERİ
// =====================================================

const GRAVITY = 9.81; // m/s² - Yerçekimi ivmesi

// =====================================================
// BLOK TANIMLARI
// =====================================================

/**
 * Yerçekimi sabiti bloğu
 */
Blockly.Blocks['physics_gravity'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("g (yerçekimi)");
        this.setOutput(true, "Number");
        this.setColour(0);
        this.setTooltip("Yerçekimi ivmesi (9.81 m/s²)");
        this.setHelpUrl("");
    }
};

/**
 * Eğik atış bloğu
 */
Blockly.Blocks['projectile_motion'] = {
    init: function () {
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("Eğik atış çiz açı:");
        this.appendValueInput("VELOCITY")
            .setCheck("Number")
            .appendField("hız:");
        this.appendValueInput("START_X")
            .setCheck("Number")
            .appendField("başlangıç x:");
        this.appendValueInput("START_Y")
            .setCheck("Number")
            .appendField("y:");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Eğik atış yörüngesini çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'ANGLE', value: '45' },
            { name: 'VELOCITY', value: '100' },
            { name: 'START_X', value: '-200' },
            { name: 'START_Y', value: '0' }
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
 * Serbest düşüş bloğu
 */
Blockly.Blocks['free_fall'] = {
    init: function () {
        this.appendValueInput("HEIGHT")
            .setCheck("Number")
            .appendField("Serbest düşüş çiz yükseklik:");
        this.appendValueInput("START_X")
            .setCheck("Number")
            .appendField("başlangıç x:");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Serbest düşüş hareketini çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'HEIGHT', value: '200' },
            { name: 'START_X', value: '0' }
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
 * Yatay atış bloğu
 */
Blockly.Blocks['horizontal_throw'] = {
    init: function () {
        this.appendValueInput("VELOCITY")
            .setCheck("Number")
            .appendField("Yatay atış çiz hız:");
        this.appendValueInput("HEIGHT")
            .setCheck("Number")
            .appendField("yükseklik:");
        this.appendValueInput("START_X")
            .setCheck("Number")
            .appendField("başlangıç x:");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Yatay atış hareketini çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'VELOCITY', value: '50' },
            { name: 'HEIGHT', value: '100' },
            { name: 'START_X', value: '-200' }
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
 * Düzgün dairesel hareket bloğu
 */
Blockly.Blocks['circular_motion'] = {
    init: function () {
        this.appendValueInput("CENTER_X")
            .setCheck("Number")
            .appendField("Dairesel hareket çiz merkez x:");
        this.appendValueInput("CENTER_Y")
            .setCheck("Number")
            .appendField("y:");
        this.appendValueInput("RADIUS")
            .setCheck("Number")
            .appendField("yarıçap:");
        this.appendValueInput("PERIODS")
            .setCheck("Number")
            .appendField("tur sayısı:");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Düzgün dairesel hareket çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'CENTER_X', value: '0' },
            { name: 'CENTER_Y', value: '0' },
            { name: 'RADIUS', value: '100' },
            { name: 'PERIODS', value: '1' }
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
 * Harmonik hareket (yay-kütle) bloğu
 */
Blockly.Blocks['harmonic_motion'] = {
    init: function () {
        this.appendValueInput("AMPLITUDE")
            .setCheck("Number")
            .appendField("Harmonik hareket çiz genlik:");
        this.appendValueInput("PERIODS")
            .setCheck("Number")
            .appendField("periyot sayısı:");
        this.appendValueInput("START_X")
            .setCheck("Number")
            .appendField("başlangıç x:");
        this.appendValueInput("CENTER_Y")
            .setCheck("Number")
            .appendField("merkez y:");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("Basit harmonik hareket (sinüs dalgası) çizer");
        this.setHelpUrl("");

    },
    _addShadowBlocks: function () {
        const inputs = [
            { name: 'AMPLITUDE', value: '50' },
            { name: 'PERIODS', value: '2' },
            { name: 'START_X', value: '-200' },
            { name: 'CENTER_Y', value: '0' }
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
// HESAPLAMA BLOKLARI
// =====================================================

/**
 * Eğik atış - maksimum yükseklik hesapla
 */
Blockly.Blocks['projectile_max_height'] = {
    init: function () {
        this.appendValueInput("VELOCITY")
            .setCheck("Number")
            .appendField("Eğik atış max yükseklik v:");
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("açı:");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(0);
        this.setTooltip("Eğik atışta maksimum yüksekliği hesaplar");
        this.setHelpUrl("");
    }
};

/**
 * Eğik atış - menzil hesapla
 */
Blockly.Blocks['projectile_range'] = {
    init: function () {
        this.appendValueInput("VELOCITY")
            .setCheck("Number")
            .appendField("Eğik atış menzil v:");
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("açı:");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(0);
        this.setTooltip("Eğik atışta menzili hesaplar");
        this.setHelpUrl("");
    }
};

/**
 * Eğik atış - uçuş süresi hesapla
 */
Blockly.Blocks['projectile_flight_time'] = {
    init: function () {
        this.appendValueInput("VELOCITY")
            .setCheck("Number")
            .appendField("Eğik atış süre v:");
        this.appendValueInput("ANGLE")
            .setCheck("Number")
            .appendField("açı:");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(0);
        this.setTooltip("Eğik atışta toplam uçuş süresini hesaplar");
        this.setHelpUrl("");
    }
};

// =====================================================
// JAVASCRIPT GENERATORS
// =====================================================

Blockly.JavaScript.forBlock['physics_gravity'] = function (block) {
    return ['9.81', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.forBlock['projectile_motion'] = function (block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '45';
    var velocity = Blockly.JavaScript.valueToCode(block, 'VELOCITY', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    var startX = Blockly.JavaScript.valueToCode(block, 'START_X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var startY = Blockly.JavaScript.valueToCode(block, 'START_Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'drawProjectileMotion(' + angle + ', ' + velocity + ', ' + startX + ', ' + startY + ');\n';
};

Blockly.JavaScript.forBlock['free_fall'] = function (block) {
    var height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '200';
    var startX = Blockly.JavaScript.valueToCode(block, 'START_X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'drawFreeFall(' + height + ', ' + startX + ');\n';
};

Blockly.JavaScript.forBlock['horizontal_throw'] = function (block) {
    var velocity = Blockly.JavaScript.valueToCode(block, 'VELOCITY', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    var height = Blockly.JavaScript.valueToCode(block, 'HEIGHT', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    var startX = Blockly.JavaScript.valueToCode(block, 'START_X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'drawHorizontalThrow(' + velocity + ', ' + height + ', ' + startX + ');\n';
};

Blockly.JavaScript.forBlock['circular_motion'] = function (block) {
    var centerX = Blockly.JavaScript.valueToCode(block, 'CENTER_X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var centerY = Blockly.JavaScript.valueToCode(block, 'CENTER_Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS', Blockly.JavaScript.ORDER_ATOMIC) || '100';
    var periods = Blockly.JavaScript.valueToCode(block, 'PERIODS', Blockly.JavaScript.ORDER_ATOMIC) || '1';
    return 'drawCircularMotion(' + centerX + ', ' + centerY + ', ' + radius + ', ' + periods + ');\n';
};

Blockly.JavaScript.forBlock['harmonic_motion'] = function (block) {
    var amplitude = Blockly.JavaScript.valueToCode(block, 'AMPLITUDE', Blockly.JavaScript.ORDER_ATOMIC) || '50';
    var periods = Blockly.JavaScript.valueToCode(block, 'PERIODS', Blockly.JavaScript.ORDER_ATOMIC) || '2';
    var startX = Blockly.JavaScript.valueToCode(block, 'START_X', Blockly.JavaScript.ORDER_ATOMIC) || '-200';
    var centerY = Blockly.JavaScript.valueToCode(block, 'CENTER_Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'drawHarmonicMotion(' + amplitude + ', ' + periods + ', ' + startX + ', ' + centerY + ');\n';
};

Blockly.JavaScript.forBlock['projectile_max_height'] = function (block) {
    var velocity = Blockly.JavaScript.valueToCode(block, 'VELOCITY', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['calculateProjectileMaxHeight(' + velocity + ', ' + angle + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['projectile_range'] = function (block) {
    var velocity = Blockly.JavaScript.valueToCode(block, 'VELOCITY', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['calculateProjectileRange(' + velocity + ', ' + angle + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript.forBlock['projectile_flight_time'] = function (block) {
    var velocity = Blockly.JavaScript.valueToCode(block, 'VELOCITY', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['calculateProjectileFlightTime(' + velocity + ', ' + angle + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

console.log('physics-blocks.js: Fizik blokları yüklendi');
