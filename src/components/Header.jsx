import React from 'react';
import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ cartItemCount, onOpenCart }) {
  return (
    <header className="glass-panel header-padding" style={{
      position: 'sticky',
      top: '1rem',
      margin: '0 1rem',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          fontWeight: '700',
          background: 'linear-gradient(to right, var(--color-text-main), var(--color-accent-cinnamon))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Sahlab Store
        </h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/admin" className="btn-icon" title="Admin Dashboard">
          <User size={20} />
        </Link>
        <button className="btn-icon" onClick={onOpenCart} style={{ position: 'relative' }}>
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: 'var(--color-accent-cinnamon)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
