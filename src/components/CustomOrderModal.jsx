import React, { useState } from 'react';
import { X, CheckCircle, MessageCircle } from 'lucide-react';

export default function CustomOrderModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', description: '' });

  const handleNext = (e) => {
    e.preventDefault();
    
    let message = `*New Custom Order Request for Anthony*\n\n*Customer Details:*\nName: ${formData.name}\nPhone: ${formData.phone}\n\n*Description of Custom Request:*\n${formData.description}`;
    
    const phoneNumber = "9613274884";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setStep(2);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div className="glass-panel animate-fade-in custom-modal-content" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
        <button onClick={onClose} className="btn-icon" style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <X size={20} />
        </button>

        {step === 1 && (
          <form onSubmit={handleNext}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Request Custom Order</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Have a special 3D print or crochet idea in mind? Describe it below and we'll discuss the details on WhatsApp!
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
              <textarea 
                required placeholder="Describe what you would like to order in detail..." style={{...inputStyle, height: '120px', resize: 'vertical'}} 
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', background: 'linear-gradient(135deg, #25D366, #128C7E)', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <MessageCircle size={20} /> Discuss on WhatsApp
            </button>
          </form>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle size={64} color="#25D366" style={{ margin: '0 auto 1.5rem auto' }} />
            <h2 style={{ margin: '0 0 1rem 0' }}>Request Sent!</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              We'll review your custom request and reply on WhatsApp shortly!
            </p>
            <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>Back to Store</button>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 'var(--border-radius-md)', color: 'white', fontSize: '1rem', boxSizing: 'border-box'
};
