// Kontrol bloklarının JavaScript üreticileri
Blockly.JavaScript['repeat_times'] = function(block) {
    var times = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'for (let i = 0; i < ' + times + '; i++) {\n' + branch + '}\n';
};

Blockly.JavaScript['forever'] = function(block) {
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'while (true) {\n' + branch + '}\n';
};

Blockly.JavaScript['if'] = function(block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'if (' + condition + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['if_else'] = function(block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch1 = Blockly.JavaScript.statementToCode(block, 'DO');
    var branch2 = Blockly.JavaScript.statementToCode(block, 'ELSE');
    return 'if (' + condition + ') {\n' + branch1 + '} else {\n' + branch2 + '}\n';
};

Blockly.JavaScript['wait_until'] = function(block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    return 'waitUntil(' + condition + ');\n';
};

Blockly.JavaScript['repeat_until'] = function(block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'while (!(' + condition + ')) {\n' + branch + '}\n';
};

Blockly.JavaScript['stop'] = function(block) {
    return 'return;\n';
};
