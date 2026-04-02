import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProducts(limit = 50) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => axios.get(`/api/products?limit=${limit}`).then(r => r.data),
    staleTime: 1000 * 60 * 5,
  });
}
