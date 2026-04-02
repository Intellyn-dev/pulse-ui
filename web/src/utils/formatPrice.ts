export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function addPrices(base: string, tax: string): string {
  const total = parseFloat(base) + parseFloat(tax);
  return `$${parseFloat(total).toFixed(2)}`;
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  return originalPrice * (1 - discountPercent / 100);
}

export function formatPriceRange(min: number, max: number): string {
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}
