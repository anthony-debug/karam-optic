import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';

export default function ProductCatalog({ products, onAddToCart }) {
  const [filter, setFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', '3D Prints', 'Crochet', 'World Cup'];

  const filteredProducts = products.filter(p => {
    if (filter === 'All') return true;
    if (filter === '3D Prints') return p.type === '3d-print';
    if (filter === 'Crochet') return p.type === 'crochet';
    if (filter === 'World Cup') return p.category === 'World Cup';
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat}
            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
            onClick={() => setFilter(cat)}
            style={{ borderRadius: '20px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '2rem' 
      }}>
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => setSelectedProduct(product)} 
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, customization, quantity) => {
            onAddToCart(product, customization, quantity);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}
