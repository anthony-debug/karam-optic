import React, { useState } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import ModelViewer from './ModelViewer';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [selectedCustomization, setSelectedCustomization] = useState(
    product.customizationOptions.find(c => c.id === product.defaultCustomization) || product.customizationOptions[0]
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div className="glass-panel animate-fade-in modal-grid" style={{
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflowY: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        padding: '2rem',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
        >
          <X size={24} />
        </button>

        <div className="modal-image-container" style={{ height: '500px', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
          {product.type === '3d-print' ? (
            <ModelViewer color={selectedCustomization.colorHex} type={product.type} />
          ) : (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
               <img 
                 src={product.image} 
                 alt={product.name} 
                 style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
               />
               <div style={{
                 position: 'absolute',
                 bottom: '1rem', right: '1rem',
                 background: selectedCustomization.colorHex,
                 width: '40px', height: '40px',
                 borderRadius: '50%',
                 border: '2px solid white',
                 boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
               }} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
          <div>
            <span style={{ color: 'var(--color-accent-gold)', fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.category}
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0', lineHeight: 1.2 }}>{product.name}</h2>
            <div style={{ fontSize: '1.5rem', color: 'var(--color-accent-cinnamon)', fontWeight: 'bold' }}>
              ${product.price.toFixed(2)}
            </div>
          </div>

          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div>
            <h4 style={{ margin: '0 0 1rem 0' }}>
              Select {product.type === '3d-print' ? 'Filament Color' : 'Yarn Color'}: 
              <span style={{ color: 'var(--color-text-muted)', marginLeft: '0.5rem', fontWeight: 'normal' }}>
                {selectedCustomization.name}
              </span>
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {product.customizationOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCustomization(opt)}
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: opt.colorHex,
                    border: selectedCustomization.id === opt.id ? '2px solid white' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: selectedCustomization.id === opt.id ? `0 0 15px ${opt.colorHex}` : 'none',
                    transition: 'all 0.2s ease'
                  }}
                  title={opt.name}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: 'auto' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: 'var(--border-radius-md)',
              padding: '4px'
            }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', color: 'white', padding: '8px 16px', cursor: 'pointer' }}
              >-</button>
              <span style={{ padding: '0 16px', fontWeight: 'bold' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', color: 'white', padding: '8px 16px', cursor: 'pointer' }}
              >+</button>
            </div>
            
            <button 
              className="btn-primary" 
              style={{ flex: 1, padding: '16px' }}
              onClick={() => onAddToCart(product, selectedCustomization, quantity)}
            >
              <ShoppingBag size={20} />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
