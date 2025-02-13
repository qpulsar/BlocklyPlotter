// Matematik ve mantık bloklarının JavaScript üreticileri
Blockly.JavaScript['math_add'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' + ' + b, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript['math_multiply'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' * ' + b, Blockly.JavaScript.ORDER_MULTIPLICATION];
};

Blockly.JavaScript['math_subtract'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' - ' + b, Blockly.JavaScript.ORDER_SUBTRACTION];
};

Blockly.JavaScript['math_divide'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' / ' + b, Blockly.JavaScript.ORDER_DIVISION];
};

Blockly.JavaScript['random_int'] = function(block) {
    return ['Math.floor(Math.random() * 100)', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['comparison_block'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var op = block.getFieldValue('OP');
    var code;
    switch (op) {
        case 'EQ': code = a + ' === ' + b; break;
        case 'NEQ': code = a + ' !== ' + b; break;
        case 'GT': code = a + ' > ' + b; break;
        case 'GTE': code = a + ' >= ' + b; break;
        case 'LT': code = a + ' < ' + b; break;
        case 'LTE': code = a + ' <= ' + b; break;
        default: code = 'false';
    }
    return [code, Blockly.JavaScript.ORDER_RELATIONAL];
};

Blockly.JavaScript['logic_and'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_AND) || 'false';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_AND) || 'false';
    return [a + ' && ' + b, Blockly.JavaScript.ORDER_LOGICAL_AND];
};

Blockly.JavaScript['logic_or'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_LOGICAL_OR) || 'false';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_LOGICAL_OR) || 'false';
    return [a + ' || ' + b, Blockly.JavaScript.ORDER_LOGICAL_OR];
};

Blockly.JavaScript['math_modulo'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' % ' + b, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript['math_round'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.round(' + value + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_abs'] = function(block) {
    var value = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.abs(' + value + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['logic_null'] = function(block) {
    return ['null', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
    var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['math_number'] = function(block) {
    var code = Number(block.getFieldValue('NUM'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
