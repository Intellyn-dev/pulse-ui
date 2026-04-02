import { addPrices } from '../../src/utils/formatPrice';

describe('addPrices', () => {
  /**
   * Verifies the fix for the bug where addPrices was concatenating string arguments
   * instead of converting them to numbers before addition.
   * e.g. "10.50" + "2.25" was producing "10.502.25" (string concat) then parseFloat
   * would return 10.50 instead of the correct sum 12.75.
   * The fix converts both arguments to numbers before adding them.
   */
  it('returns the correct numeric sum of two price strings formatted as a dollar amount', () => {
    const result = addPrices('10.50', '2.25');
    expect(result).toBe('$12.75');
  });

  it('correctly adds two price strings where naive string concatenation would produce a wrong parseFloat result', () => {
    // "10.50" + "2.25" via string concat => "10.502.25" => parseFloat => 10.50 (wrong)
    // correct numeric addition => 12.75
    const result = addPrices('10.50', '2.25');
    const numericValue = parseFloat(result.replace('$', ''));
    expect(numericValue).toBeCloseTo(12.75, 2);
  });

  it('handles integer-like price strings correctly', () => {
    const result = addPrices('5.00', '3.00');
    expect(result).toBe('$8.00');
  });

  it('handles a zero tax value correctly', () => {
    const result = addPrices('20.00', '0.00');
    expect(result).toBe('$20.00');
  });

  it('handles a zero base value correctly', () => {
    const result = addPrices('0.00', '5.99');
    expect(result).toBe('$5.99');
  });

  it('returns a result prefixed with a dollar sign', () => {
    const result = addPrices('8.00', '1.50');
    expect(result.startsWith('$')).toBe(true);
  });

  it('returns a result formatted to two decimal places', () => {
    const result = addPrices('1.10', '2.20');
    expect(result).toMatch(/^\$\d+\.\d{2}$/);
  });
});