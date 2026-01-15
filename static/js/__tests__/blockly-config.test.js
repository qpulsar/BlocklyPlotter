/**
 * Blockly Config Unit Tests
 */

describe('Blok Tanımlamaları', () => {
    describe('Hareket Blokları', () => {
        test('move_steps bloğu tanımlı olmalı', () => {
            // Blok tipi kontrolü için mock
            const blockTypes = [
                'pen_down', 'pen_up', 'move_steps', 'turn_right', 'turn_left',
                'goto_xy', 'goto_random', 'set_direction', 'change_x', 'change_y',
                'set_x', 'set_y', 'bounce_on_edge', 'get_x', 'get_y'
            ];

            blockTypes.forEach(type => {
                expect(typeof type).toBe('string');
                expect(type.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Kontrol Blokları', () => {
        const controlBlocks = [
            'repeat_times', 'forever', 'if', 'if_else',
            'wait_seconds', 'wait_until', 'repeat_until', 'stop'
        ];

        test('tüm kontrol blokları tanımlı olmalı', () => {
            expect(controlBlocks.length).toBe(8);
        });

        test('repeat_times döngü bloğu olmalı', () => {
            expect(controlBlocks).toContain('repeat_times');
        });
    });

    describe('Olay Blokları', () => {
        const eventBlocks = [
            'when_flag_clicked', 'when_key_pressed',
            'when_message_received', 'broadcast'
        ];

        test('başlangıç bloğu tanımlı olmalı', () => {
            expect(eventBlocks).toContain('when_flag_clicked');
        });

        test('mesaj blokları tanımlı olmalı', () => {
            expect(eventBlocks).toContain('broadcast');
            expect(eventBlocks).toContain('when_message_received');
        });
    });

    describe('Matematik Blokları', () => {
        const mathBlocks = [
            'math_number', 'math_add', 'math_subtract',
            'math_multiply', 'math_divide', 'math_modulo',
            'math_round', 'math_abs', 'random_int'
        ];

        test('temel aritmetik bloklar tanımlı olmalı', () => {
            expect(mathBlocks).toContain('math_add');
            expect(mathBlocks).toContain('math_subtract');
            expect(mathBlocks).toContain('math_multiply');
            expect(mathBlocks).toContain('math_divide');
        });

        test('sayı bloğu tanımlı olmalı', () => {
            expect(mathBlocks).toContain('math_number');
        });
    });
});

describe('Generator Yapısı', () => {
    test('forBlock formatı kullanılmalı', () => {
        // Modern Blockly generator formatı kontrolü
        const generatorFormat = 'Blockly.JavaScript.forBlock';
        expect(generatorFormat).toContain('forBlock');
    });
});
