import { addPrices } from '../web/src/utils/formatPrice';

describe('addPrices', () => {
  /**
   * Verifies the fix for the bug where addPrices used the + operator directly
   * on string parameters, causing string concatenation instead of numeric addition.
   * e.g., "10.00" + "2.50" would produce "10.002.50" instead of "12.50".
   * The fix wraps each parameter in parseFloat() before adding them.
   */

  it('correctly adds two price strings as numbers, not concatenates them', () => {
    const result = addPrices('10.00', '2.50');
    expect(result).toBe('$12.50');
  });

  it('returns a properly formatted dollar string with two decimal places', () => {
    const result = addPrices('5.00', '0.45');
    expect(result).toBe('$5.45');
  });

  it('handles zero tax correctly', () => {
    const result = addPrices('20.00', '0.00');
    expect(result).toBe('$20.00');
  });

  it('handles zero base price correctly', () => {
    const result = addPrices('0.00', '3.99');
    expect(result).toBe('$3.99');
  });

  it('rounds to two decimal places when sum has more than two decimal digits', () => {
    const result = addPrices('1.005', '1.005');
    // parseFloat('1.005') + parseFloat('1.005') = 2.01 (floating point rounding)
    expect(result).toMatch(/^\$\d+\.\d{2}$/);
  });

  it('does not produce a concatenated string value like "10.002.50"', () => {
    const result = addPrices('10.00', '2.50');
    // If concatenation occurred, parseFloat("10.002.50") = 10.00, giving "$10.00"
    expect(result).not.toBe('$10.00');
  });

  it('correctly adds larger price values', () => {
    const result = addPrices('99.99', '8.50');
    expect(result).toBe('$108.49');
  });
});