import React, { useState } from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';

export default function CheckoutModal({ items, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Shipping Details, 2: WhatsApp Success
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '' });

  const total = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleNext = (e) => {
    e.preventDefault();
    
    // Format WhatsApp message
    let message = `*New Order from Sahlab Store*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\nAddress: ${formData.address}, ${formData.city}\n\n*Order Items:*\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${item.customization.name}) - $${(item.product.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Total: $${total.toFixed(2)}*`;

    // Open WhatsApp
    const phoneNumber = "1234567890"; // TODO: Update to real WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Move to success step
    setStep(2);
    onSuccess(); // Clears cart
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', position: 'relative' }}>
        
        {step === 1 && (
          <form onSubmit={handleNext}>
            <h2 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle color="#25D366" /> Order via WhatsApp
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Please enter your details. You will be redirected to WhatsApp to complete your order.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                required type="text" placeholder="Full Name" style={inputStyle} 
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                required type="tel" placeholder="Phone Number" style={inputStyle} 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <input 
                required type="text" placeholder="Street Address" style={inputStyle} 
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}
              />
              <input 
                required type="text" placeholder="City" style={inputStyle} 
                value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
              <button type="submit" className="btn-primary" style={{ flex: 2, background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                Send to WhatsApp
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="#25D366" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0' }}>Order Sent!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              Your order details have been passed to WhatsApp. We'll be in touch shortly to confirm payment and shipping!
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
