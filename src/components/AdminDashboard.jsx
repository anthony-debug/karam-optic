import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowLeft, Loader } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '', category: '3D Prints', type: '3d-print', price: '', description: '', image: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  async function addProduct(e) {
    e.preventDefault();
    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      customizationOptions: formData.type === '3d-print' ? [
        { id: 'slate', name: 'Deep Slate', colorHex: '#2f4f4f' },
        { id: 'copper', name: 'Metallic Copper', colorHex: '#b87333' }
      ] : [
        { id: 'vanilla', name: 'Warm Vanilla', colorHex: '#fdfbf7' },
        { id: 'mocha', name: 'Mocha Brown', colorHex: '#6f4e37' }
      ],
      defaultCustomization: formData.type === '3d-print' ? 'slate' : 'vanilla'
    };

    const { error } = await supabase.from('products').insert([newProduct]);
    if (!error) {
      setFormData({ name: '', category: '3D Prints', type: '3d-print', price: '', description: '', image: '' });
      fetchProducts();
    } else {
      alert("Error adding product. Have you created the table in Supabase?");
    }
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      fetchProducts();
    }
  }

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Store
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Add Product</h2>
          <form onSubmit={addProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input required type="text" placeholder="Product Name" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="number" step="0.01" placeholder="Price ($)" style={inputStyle} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="3D Prints">3D Prints</option>
              <option value="Crochet">Crochet</option>
              <option value="World Cup">World Cup</option>
            </select>
            <select style={inputStyle} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="3d-print">3D Printed Object</option>
              <option value="crochet">Crochet Item</option>
            </select>
            <input required type="url" placeholder="Image URL" style={inputStyle} value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
            <textarea required placeholder="Description" rows={4} style={inputStyle} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}><Plus size={20} /> Add Product</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0' }}>Active Products</h2>
          {loading ? (
            <Loader className="animate-spin" />
          ) : products.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>No products found. Add one or make sure your Supabase table is set up!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--border-radius-sm)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>${p.price} | {p.category}</span>
                  </div>
                  <button onClick={() => deleteProduct(p.id)} className="btn-icon" style={{ color: '#ef4444' }}><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 'var(--border-radius-md)', color: 'white', fontSize: '1rem', boxSizing: 'border-box'
};
