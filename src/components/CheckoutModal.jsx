import React, { useState } from 'react';
import { CheckCircle, Loader } from 'lucide-react';

export default function CheckoutModal({ items, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        onSuccess();
      }, 2000);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}>
        
        {step < 3 && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
            <div style={{ flex: 1, height: '4px', background: 'var(--color-accent-cinnamon)', borderRadius: '2px' }} />
            <div style={{ flex: 1, height: '4px', background: step >= 2 ? 'var(--color-accent-cinnamon)' : 'rgba(255,255,255,0.1)', borderRadius: '2px' }} />
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleNext}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Shipping Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required type="text" placeholder="Full Name" style={inputStyle} />
              <input required type="email" placeholder="Email Address" style={inputStyle} />
              <input required type="text" placeholder="Street Address" style={inputStyle} />
              <div className="checkout-grid" style={{ display: 'flex', gap: '1rem' }}>
                <input required type="text" placeholder="City" style={inputStyle} />
                <input required type="text" placeholder="ZIP" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ flex: 2 }}>Continue to Payment</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleNext}>
            <h2 style={{ margin: '0 0 1.5rem 0' }}>Payment Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required type="text" placeholder="Card Number" maxLength="19" style={inputStyle} />
              <div className="checkout-grid" style={{ display: 'flex', gap: '1rem' }}>
                <input required type="text" placeholder="MM/YY" maxLength="5" style={inputStyle} />
                <input required type="text" placeholder="CVC" maxLength="4" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setStep(1)} disabled={loading}>Back</button>
              <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : 'Pay Now'}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="var(--color-accent-pistachio)" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0' }}>Order Confirmed!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Thank you for shopping at Sahlab Store. Your order #SHLB-{Math.floor(Math.random() * 10000)} is being prepared.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: 'rgba(0,0,0,0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 'var(--border-radius-md)',
  color: 'white',
  fontSize: '1rem',
  boxSizing: 'border-box'
};
