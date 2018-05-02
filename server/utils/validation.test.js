const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var res = isRealString(12);
        expect(res).toBe(false);

        var res = isRealString('  ');
        expect(res).toBe(false);
        
        var res = isRealString('abc');
        expect(res).toBe(true);
    });
})