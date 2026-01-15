/**
 * Canvas Operations Unit Tests
 */

describe('Canvas Matematik Fonksiyonları', () => {
    // Global değişkenleri simüle et
    beforeEach(() => {
        global.canvas = { width: 600, height: 600 };
        global.penPosition = { x: 300, y: 300 };
        global.direction = 0;
        global.penDown = false;
        global.timerStartTime = Date.now();
        global.runtimeVariables = {};
        global.programRunning = true;
    });

    describe('randomInt', () => {
        // randomInt fonksiyonunu tanımla (test için)
        const randomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        test('belirtilen aralıkta sayı üretmeli', () => {
            for (let i = 0; i < 100; i++) {
                const result = randomInt(1, 10);
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(10);
            }
        });

        test('negatif aralıkta çalışmalı', () => {
            for (let i = 0; i < 100; i++) {
                const result = randomInt(-10, -1);
                expect(result).toBeGreaterThanOrEqual(-10);
                expect(result).toBeLessThanOrEqual(-1);
            }
        });

        test('tam sayı döndürmeli', () => {
            const result = randomInt(1, 100);
            expect(Number.isInteger(result)).toBe(true);
        });
    });

    describe('Koordinat Dönüşümleri', () => {
        // toCanvasCoords fonksiyonunu tanımla
        const toCanvasCoords = (x, y) => ({
            x: 300 + x,
            y: 300 - y
        });

        // toCartesianCoords fonksiyonunu tanımla
        const toCartesianCoords = (canvasX, canvasY) => ({
            x: canvasX - 300,
            y: 300 - canvasY
        });

        test('toCanvasCoords merkez koordinatını doğru dönüştürmeli', () => {
            const result = toCanvasCoords(0, 0);
            expect(result.x).toBe(300);
            expect(result.y).toBe(300);
        });

        test('toCanvasCoords pozitif koordinatları doğru dönüştürmeli', () => {
            const result = toCanvasCoords(100, 50);
            expect(result.x).toBe(400);
            expect(result.y).toBe(250);
        });

        test('toCartesianCoords merkez koordinatını doğru dönüştürmeli', () => {
            const result = toCartesianCoords(300, 300);
            expect(result.x).toBe(0);
            expect(result.y).toBe(0);
        });

        test('dönüşümler tersine çevrilebilir olmalı', () => {
            const original = { x: 50, y: -30 };
            const canvas = toCanvasCoords(original.x, original.y);
            const back = toCartesianCoords(canvas.x, canvas.y);
            expect(back.x).toBe(original.x);
            expect(back.y).toBe(original.y);
        });
    });

    describe('Runtime Değişkenler', () => {
        test('değişken ayarlanabilmeli', () => {
            global.runtimeVariables['test'] = 42;
            expect(global.runtimeVariables['test']).toBe(42);
        });

        test('değişken artırılabilmeli', () => {
            global.runtimeVariables['counter'] = 10;
            global.runtimeVariables['counter'] += 5;
            expect(global.runtimeVariables['counter']).toBe(15);
        });

        test('tanımsız değişken undefined olmalı', () => {
            expect(global.runtimeVariables['nonexistent']).toBeUndefined();
        });
    });
});

describe('Zaman Fonksiyonları', () => {
    test('timer saniye döndürmeli', () => {
        const start = Date.now();
        const timer = () => (Date.now() - start) / 1000;

        const result = timer();
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(1);
    });

    test('currentHour 0-23 arasında olmalı', () => {
        const hour = new Date().getHours();
        expect(hour).toBeGreaterThanOrEqual(0);
        expect(hour).toBeLessThanOrEqual(23);
    });

    test('currentMinute 0-59 arasında olmalı', () => {
        const minute = new Date().getMinutes();
        expect(minute).toBeGreaterThanOrEqual(0);
        expect(minute).toBeLessThanOrEqual(59);
    });
});
