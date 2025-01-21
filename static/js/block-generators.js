// Kod üretimi için JavaScript generator tanımlamaları
Blockly.JavaScript['pen_down'] = function(block) {
    return 'penDown = true;\nupdateCanvas();\n';
};

Blockly.JavaScript['pen_up'] = function(block) {
    return 'penDown = false;\nupdateCanvas();\n';
};

Blockly.JavaScript['move_steps'] = function(block) {
    var steps = Blockly.JavaScript.valueToCode(block, 'STEPS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'moveSteps(' + steps + ');\n';
};

Blockly.JavaScript['turn_right'] = function(block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'turnRight(' + angle + ');\n';
};

Blockly.JavaScript['turn_left'] = function(block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'turnLeft(' + angle + ');\n';
};

Blockly.JavaScript['goto_xy'] = function(block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'gotoXY(' + x + ', ' + y + ');\n';
};

Blockly.JavaScript['goto_random'] = function(block) {
    return 'gotoRandom();\n';
};

Blockly.JavaScript['set_direction'] = function(block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setDirection(' + angle + ');\n';
};

Blockly.JavaScript['change_x'] = function(block) {
    var dx = Blockly.JavaScript.valueToCode(block, 'DX', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'changeX(' + dx + ');\n';
};

Blockly.JavaScript['change_y'] = function(block) {
    var dy = Blockly.JavaScript.valueToCode(block, 'DY', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'changeY(' + dy + ');\n';
};

Blockly.JavaScript['set_x'] = function(block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setX(' + x + ');\n';
};

Blockly.JavaScript['set_y'] = function(block) {
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'setY(' + y + ');\n';
};

Blockly.JavaScript['bounce_on_edge'] = function(block) {
    return 'bounceOnEdge();\n';
};

Blockly.JavaScript['get_x'] = function(block) {
    return ['getX()', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['get_y'] = function(block) {
    return ['getY()', Blockly.JavaScript.ORDER_ATOMIC];
};

// Kontrol blokları için JavaScript üreticileri
Blockly.JavaScript['when_flag_clicked'] = function(block) {
    return '// Program başlangıcı\n';
};

Blockly.JavaScript['when_key_pressed'] = function(block) {
    var key = block.getFieldValue('KEY');
    return '// Tuşa basıldığında: ' + key + '\n';
};

Blockly.JavaScript['when_message_received'] = function(block) {
    var message = block.getFieldValue('MESSAGE');
    return '// Mesaj alındığında: ' + message + '\n';
};

Blockly.JavaScript['broadcast'] = function(block) {
    var message = block.getFieldValue('MESSAGE');
    return 'broadcast("' + message + '");\n';
};

Blockly.JavaScript['wait_seconds'] = function(block) {
    var seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'await sleep(' + seconds + ');\n';
};

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
    return 'while (!(' + condition + ')) {\n  yield;\n}\n';
};

Blockly.JavaScript['repeat_until'] = function(block) {
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION', Blockly.JavaScript.ORDER_NONE) || 'false';
    var branch = Blockly.JavaScript.statementToCode(block, 'DO');
    return 'while (!(' + condition + ')) {\n' + branch + '}\n';
};

Blockly.JavaScript['stop'] = function(block) {
    return 'return;\n';
};

// Algılama blokları için JavaScript üreticileri
Blockly.JavaScript['is_pen_down'] = function(block) {
    return ['penDown', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['timer'] = function(block) {
    return ['timer', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['reset_timer'] = function(block) {
    return 'resetTimer();\n';
};

Blockly.JavaScript['current_hour'] = function(block) {
    return ['new Date().getHours()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['current_minute'] = function(block) {
    return ['new Date().getMinutes()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['current_second'] = function(block) {
    return ['new Date().getSeconds()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Matematik blokları için JavaScript üreticileri
Blockly.JavaScript['math_add'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' + ' + b, Blockly.JavaScript.ORDER_ADDITION];
};

Blockly.JavaScript['math_subtract'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' - ' + b, Blockly.JavaScript.ORDER_SUBTRACTION];
};

Blockly.JavaScript['math_multiply'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' * ' + b, Blockly.JavaScript.ORDER_MULTIPLICATION];
};

Blockly.JavaScript['math_divide'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' / ' + b, Blockly.JavaScript.ORDER_DIVISION];
};

Blockly.JavaScript['math_modulo'] = function(block) {
    var a = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return [a + ' % ' + b, Blockly.JavaScript.ORDER_MODULUS];
};

Blockly.JavaScript['math_round'] = function(block) {
    var number = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.round(' + number + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['math_random_int'] = function(block) {
    var min = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var max = Blockly.JavaScript.valueToCode(block, 'TO', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return ['Math.floor(Math.random() * (' + max + ' - ' + min + ' + 1) + ' + min + ')', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
