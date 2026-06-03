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
      background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(16, 185, 129, 0.05))',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1600&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
        zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
        <span style={{
          display: 'inline-block',
          padding: '4px 12px',
          background: 'rgba(217, 119, 6, 0.2)',
          color: 'var(--color-accent-cinnamon)',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          border: '1px solid rgba(217, 119, 6, 0.3)'
        }}>
          Trending Now
        </span>
        <h2 className="hero-title" style={{ 
          fontSize: '3rem', 
          margin: '0 0 1rem 0',
          lineHeight: 1.1,
          fontWeight: 800
        }}>
          World Cup 2026 Collection
        </h2>
        <p style={{ 
          fontSize: '1.125rem', 
          color: 'var(--color-text-muted)',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}>
          Celebrate the upcoming games with our exclusive 3D printed trophies and handmade crochet team mascots. Premium materials, personalized for you.
        </p>
        <button className="btn-primary" style={{ fontSize: '1.125rem', padding: '12px 32px' }}>
          Explore Collection <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
