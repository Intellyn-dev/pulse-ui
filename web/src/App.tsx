import React from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';

export default function App() {
  const [query, setQuery] = React.useState('');
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Pulse Catalog</h1>
      <SearchBar onSearch={setQuery} />
      <ProductGrid searchQuery={query} />
    </div>
  );
}
