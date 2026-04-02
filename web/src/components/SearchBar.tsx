import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = React.useState('');
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search products..."
        style={{ padding: '0.5rem', width: 300 }}
      />
      <button onClick={() => onSearch(value)} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}>
        Search
      </button>
    </div>
  );
}
