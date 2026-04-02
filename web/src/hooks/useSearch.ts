import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => axios.get(`/api/search?q=${encodeURIComponent(query)}`).then(r => r.data),
    enabled: query.length > 2,
    staleTime: 1000 * 60,
  });
}
