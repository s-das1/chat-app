var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toContain(from);
        expect(message.text).toContain(text);
    });
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Admin';
        var latitude = '51.504339099999996';
        var longitude = '-0.0151441';
        var url = 'https://www.google.com/maps/?q=51.504339099999996,-0.0151441'
        var message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.from).toBe('string');
        expect(typeof message.createdAt).toBe('number');
        expect(message.from).toContain(from);
        expect(message.url).toContain(url);
    });
})