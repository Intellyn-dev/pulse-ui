import { addPrices } from '../../src/utils/formatPrice';

describe('addPrices', () => {
  it('performs numeric addition instead of string concatenation', () => {
    /**
     * Verifies the fix for the bug where addPrices was concatenating
     * base and tax as strings (e.g. "10.50" + "2.25" = "10.502.25")
     * instead of parsing them as floats first and summing numerically.
     * The correct result of addPrices("10.50", "2.25") should be "$12.75".
     */
    const result = addPrices('10.50', '2.25');
    expect(result).toBe('$12.75');
  });

  it('returns a properly formatted price string for whole number strings', () => {
    /**
     * Ensures that integer-like string inputs are also summed correctly
     * and formatted with two decimal places.
     */
    const result = addPrices('5', '3');
    expect(result).toBe('$8.00');
  });

  it('returns "$0.00" when both base and tax are zero', () => {
    /**
     * Edge case: both inputs are zero strings; result should be "$0.00"
     * rather than a concatenated "00" or similar artifact.
     */
    const result = addPrices('0', '0');
    expect(result).toBe('$0.00');
  });

  it('handles decimal precision correctly without string artifacts', () => {
    /**
     * Confirms that a result like "100.00" + "9.99" yields "$109.99"
     * and not a string like "100.009.99" parsed incorrectly.
     */
    const result = addPrices('100.00', '9.99');
    expect(result).toBe('$109.99');
  });
});