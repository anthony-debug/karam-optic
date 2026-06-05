import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero-container" style={{
      position: 'relative',
      margin: '2rem 5%',
      borderRadius: 'var(--border-radius-lg)',
      overflow: 'hidden',
      minHeight: '400px',
      display: 'flex',
      alignItems: 'center',
      padding: '3rem',
      backgroundColor: '#f8f8f8',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(/assets/hero_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.8,
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
        zIndex: 1
      }} />
      
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
        <span style={{
          display: 'inline-block',
          padding: '6px 14px',
          background: 'rgba(0, 0, 0, 0.05)',
          color: 'var(--color-text-main)',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '600',
          marginBottom: '1rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          New Collection
        </span>
        <h2 className="hero-title" style={{ 
          fontSize: '3.5rem', 
          margin: '0 0 1rem 0',
          lineHeight: 1.1,
          fontWeight: 800,
          color: 'var(--color-text-main)',
          letterSpacing: '-1px'
        }}>
          Clarity &<br/>Elegance.
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          lineHeight: 1.6,
          maxWidth: '80%'
        }}>
          Discover our premium selection of designer frames and precision lenses. Experience vision tailored to perfection at Karam Optic.
        </p>
        <button 
          className="btn-primary" 
          style={{ fontSize: '1.125rem', padding: '12px 32px' }}
          onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Collection <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
