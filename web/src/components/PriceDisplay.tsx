import React from 'react';
import { addPrices } from '../utils/formatPrice';

interface PriceDisplayProps {
  basePrice: string;
  taxRate?: string;
}

export default function PriceDisplay({ basePrice, taxRate = '0' }: PriceDisplayProps) {
  const taxAmount = (parseFloat(basePrice) * parseFloat(taxRate) / 100).toFixed(2);
  const total = addPrices(basePrice, taxAmount);
  return (
    <div>
      <span>Base: ${basePrice}</span>
      <span> + Tax: ${taxAmount}</span>
      <strong> Total: {total}</strong>
    </div>
  );
}
