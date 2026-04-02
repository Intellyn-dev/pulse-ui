import axios from 'axios';

const CATALOG_URL = process.env.CATALOG_URL || 'http://localhost:3000';
const API_TOKEN = process.env.CATALOG_API_TOKEN || 'catalog-secret-token';

export interface Product {
  id: number;
  name: string;
  description: string;
  base_price: string;
  active: boolean;
}

export async function fetchProducts(limit: number = 50): Promise<Product[]> {
  const response = await axios.get(`${CATALOG_URL}/api/v1/products?limit=${limit}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await axios.get(`${CATALOG_URL}/api/v1/products/${id}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const response = await axios.get(`${CATALOG_URL}/api/v1/products?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
}
