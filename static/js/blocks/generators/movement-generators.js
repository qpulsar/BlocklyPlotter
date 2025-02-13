// Hareket bloklarının JavaScript üreticileri
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

Blockly.JavaScript['goto_random'] = function(block) {
    return 'gotoRandom();\n';
};

Blockly.JavaScript['goto_xy'] = function(block) {
    var x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC) || '0';
    return 'gotoXY(' + x + ', ' + y + ');\n';
};

Blockly.JavaScript['set_direction'] = function(block) {
    var angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC) || '90';
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
    return ['getX()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['get_y'] = function(block) {
    return ['getY()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['is_pen_down'] = function(block) {
    return ['isPenDown()', Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
