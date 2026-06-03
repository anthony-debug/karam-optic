import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';

export default function CartDrawer({ items, onClose, onUpdateQuantity, onRemoveItem, onCheckout }) {
  const subtotal = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div className="glass-panel animate-slide-in-right" style={{
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        borderRadius: '0',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-dark)',
        borderLeft: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ margin: 0 }}>Your Cart</h2>
          <button onClick={onClose} className="btn-icon"><X size={24} /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
              Your cart is empty.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {items.map(item => (
                <div key={`${item.product.id}-${item.customization.id}`} style={{ display: 'flex', gap: '1rem' }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 'var(--border-radius-sm)' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{item.product.name}</h4>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: item.customization.colorHex }} />
                      {item.customization.name}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', padding: '2px' }}>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.customization.id, -1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0 8px' }}>-</button>
                        <span style={{ fontSize: '0.875rem' }}>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.product.id, item.customization.id, 1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '0 8px' }}>+</button>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => onRemoveItem(item.product.id, item.customization.id)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', alignSelf: 'flex-start' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '16px' }} onClick={onCheckout}>
              Proceed to Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
