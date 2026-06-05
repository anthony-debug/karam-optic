import React from 'react';

export default function ProductCard({ product, onClick }) {
  return (
    <div 
      className="glass-panel" 
      onClick={onClick}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ 
        height: '240px', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }} 
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(18, 20, 22, 0.8)',
          backdropFilter: 'blur(4px)',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          color: product.type === '3d-print' ? 'var(--color-accent-gold)' : 'var(--color-accent-pistachio)'
        }}>
          {product.type === '3d-print' ? 'Precision Sculpted' : 'Crochet'}
        </div>
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>{product.name}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: '0 0 1rem 0', flex: 1 }}>
          {product.description.length > 60 ? product.description.substring(0, 60) + '...' : product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-accent-cinnamon)' }}>
            ${product.price.toFixed(2)}
          </span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            {product.customizationOptions.length} Colors
          </span>
        </div>
      </div>
    </div>
  );
}
