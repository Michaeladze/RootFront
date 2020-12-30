import { addLeadingZeros, getShortString } from './helpers';

describe('Helpers', () => {
  it('Should add leading zeros', () => {
    expect(addLeadingZeros(0, 4)).toBe('0000');
    expect(addLeadingZeros(1, 3)).toBe('001');
    expect(addLeadingZeros(1, 2)).toBe('01');
    expect(addLeadingZeros(1, 1)).toBe('1');
  });

  it('should cur string to 3 characters', () => {
    const str = 'aaaaaaaaaa';
    const newStr = getShortString(str, 3);
    expect(newStr).toBe('aaa...');
  });
});
