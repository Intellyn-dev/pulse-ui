import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PriceDisplay from './PriceDisplay';

interface Product {
  id: number;
  name: string;
  base_price: string;
  active: boolean;
}

interface ProductGridProps {
  searchQuery?: string;
}

export default function ProductGrid({ searchQuery }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products', searchQuery],
    queryFn: () =>
      searchQuery
        ? axios.get(`/api/search?q=${encodeURIComponent(searchQuery)}`).then(r => r.data.products || [])
        : axios.get('/api/products').then(r => r.data),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {(products || []).map(p => (
        <div key={p.id} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: 8 }}>
          <h3>{p.name}</h3>
          <PriceDisplay basePrice={p.base_price} taxRate="8" />
        </div>
      ))}
    </div>
  );
}
