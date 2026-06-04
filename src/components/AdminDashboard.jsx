import React, { useState, useEffect } from 'react';
import { Trash2, ArrowLeft, Loader, Edit, Download, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { products as defaultProducts } from '../data/products';

const PRESET_COLORS = [
  { id: 'gold', name: 'Gold', hex: '#d4af37' },
  { id: 'silver', name: 'Silver', hex: '#c0c0c0' },
  { id: 'bronze', name: 'Bronze', hex: '#cd7f32' },
  { id: 'copper', name: 'Copper', hex: '#b87333' },
  { id: 'slate', name: 'Deep Slate', hex: '#2f4f4f' },
  { id: 'charcoal', name: 'Charcoal', hex: '#333333' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'vanilla', name: 'Warm Vanilla', hex: '#fdfbf7' },
  { id: 'mocha', name: 'Mocha Brown', hex: '#6f4e37' },
  { id: 'rose', name: 'Dusty Rose', hex: '#dca4a8' },
  { id: 'red', name: 'Red', hex: '#ff0000' },
  { id: 'blue', name: 'Blue', hex: '#0000ff' },
  { id: 'green', name: 'Green', hex: '#00ff00' },
  { id: 'yellow', name: 'Yellow', hex: '#ffff00' },
  { id: 'mint', name: 'Pastel Mint', hex: '#98ff98' },
  { id: 'pink', name: 'Pastel Pink', hex: '#ffd1dc' },
  { id: 'lilac', name: 'Pastel Lilac', hex: '#c8a2c8' },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '', category: '3D Prints', type: '3d-print', price: '', description: ''
  });

  // selectedColors format: { [colorId]: { file: File | null, url: string } }
  const [selectedColors, setSelectedColors] = useState({});

  useEffect(() => {
    if (isAuthenticated) fetchProducts();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'optic6181') {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Passcode" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, marginBottom: '1rem', textAlign: 'center' }}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
          <Link to="/" style={{ display: 'block', marginTop: '1rem', color: 'var(--color-text-muted)' }}>Back to Store</Link>
        </form>
      </div>
    );
  }

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  const handleColorCheck = (colorId) => {
    const newColors = { ...selectedColors };
    if (newColors[colorId]) {
      delete newColors[colorId];
    } else {
      newColors[colorId] = { file: null, url: '' };
    }
    setSelectedColors(newColors);
  };

  const handleColorFile = (colorId, file) => {
    setSelectedColors(prev => ({
      ...prev,
      [colorId]: { ...prev[colorId], file }
    }));
  };

  async function uploadFile(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from('product-images').upload(fileName, file);
    if (error) {
      alert('Error uploading image: ' + error.message);
      return null;
    }
    const { data } = supabase.storage.from('product-images').getPublicUrl(fileName);
    return data.publicUrl;
  }

  async function saveProduct(e) {
    e.preventDefault();
    
    if (Object.keys(selectedColors).length === 0) {
      return alert("Please select at least one color and upload an image for it.");
    }

    setUploading(true);

    const customizationOptions = [];
    let firstImageUrl = '';

    for (const [colorId, colorData] of Object.entries(selectedColors)) {
      const preset = PRESET_COLORS.find(c => c.id === colorId);
      let finalUrl = colorData.url;

      if (colorData.file) {
        const uploadedUrl = await uploadFile(colorData.file);
        if (uploadedUrl) finalUrl = uploadedUrl;
      }

      if (!finalUrl) {
        alert(`Warning: No image provided for color ${preset.name}`);
      }

      if (!firstImageUrl && finalUrl) firstImageUrl = finalUrl;

      customizationOptions.push({
        id: preset.id,
        name: preset.name,
        colorHex: preset.hex,
        imageUrl: finalUrl
      });
    }

    const productPayload = {
      name: formData.name,
      category: formData.category,
      type: formData.type,
      price: parseFloat(formData.price),
      description: formData.description,
      image: firstImageUrl || 'https://via.placeholder.com/800',
      customizationOptions,
      defaultCustomization: customizationOptions[0]?.id
    };

    if (editingId) {
      const { error } = await supabase.from('products').update(productPayload).eq('id', editingId);
      if (!error) resetForm();
      else alert("Error updating product.");
    } else {
      const { error } = await supabase.from('products').insert([productPayload]);
      if (!error) resetForm();
      else alert("Error adding product.");
    }
    
    setUploading(false);
    fetchProducts();
  }

  function editProduct(p) {
    setEditingId(p.id);
    setFormData({
      name: p.name, category: p.category, type: p.type, price: p.price, description: p.description
    });
    
    const colors = {};
    (p.customizationOptions || []).forEach(opt => {
      colors[opt.id] = { file: null, url: opt.imageUrl || p.image };
    });
    setSelectedColors(colors);
  }

  function resetForm() {
    setEditingId(null);
    setFormData({ name: '', category: '3D Prints', type: '3d-print', price: '', description: '' });
    setSelectedColors({});
  }

  async function deleteProduct(id) {
    if (confirm("Are you sure you want to delete this product?")) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) fetchProducts();
    }
  }

  async function importDefaults() {
    if (confirm("This will add the starter products to your database. Continue?")) {
      setLoading(true);
      const dataToInsert = defaultProducts.map(({ id, ...rest }) => rest);
      const { error } = await supabase.from('products').insert(dataToInsert);
      if (!error) fetchProducts();
      else alert("Import failed.");
    }
  }

  return (
    <div style={{ padding: '2rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '2rem' }}>
        <ArrowLeft size={20} /> Back to Store
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>{editingId ? 'Edit Product' : 'Add Product'}</h2>
            {editingId && <button className="btn-secondary" onClick={resetForm} style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Cancel</button>}
          </div>
          
          <form onSubmit={saveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input required type="text" placeholder="Product Name" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input required type="number" step="0.01" placeholder="Price ($)" style={inputStyle} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              <select style={inputStyle} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="3d-print">3D Printed Object</option>
                <option value="crochet">Crochet Item</option>
              </select>
            </div>
            <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="3D Prints">3D Prints</option>
              <option value="Crochet">Crochet</option>
              <option value="World Cup">World Cup</option>
            </select>
            
            <textarea required placeholder="Product Description" rows={3} style={inputStyle} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 1rem 0' }}>Select Colors & Upload Images</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                {PRESET_COLORS.map(color => (
                  <div key={color.id} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={!!selectedColors[color.id]}
                        onChange={() => handleColorCheck(color.id)}
                      />
                      <span style={{ width: '20px', height: '20px', background: color.hex, borderRadius: '50%', border: '1px solid white' }} />
                      <span style={{ flex: 1 }}>{color.name}</span>
                    </label>
                    
                    {selectedColors[color.id] && (
                      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-bg-panel)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                          <ImageIcon size={16} />
                          {selectedColors[color.id].file ? 'Change Image' : 'Upload Image'}
                          <input 
                            type="file" 
                            accept="image/*" 
                            style={{ display: 'none' }}
                            onChange={e => handleColorFile(color.id, e.target.files[0])}
                          />
                        </label>
                        {selectedColors[color.id].file ? (
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-pistachio)' }}>File ready</span>
                        ) : selectedColors[color.id].url ? (
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Has existing image</span>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#ef4444' }}>Needs image</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={uploading}>
              {uploading ? <Loader className="animate-spin" /> : editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ margin: 0 }}>Active Products</h2>
            <button onClick={importDefaults} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.875rem' }}>
              <Download size={16} /> Import Default Code Products
            </button>
          </div>

          {loading ? (
            <Loader className="animate-spin" />
          ) : products.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)' }}>No products found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--border-radius-sm)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>${p.price} | {p.category}</span>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                      {(p.customizationOptions || []).map(opt => (
                        <div key={opt.id} style={{ width: '12px', height: '12px', borderRadius: '50%', background: opt.colorHex, border: '1px solid white' }} title={opt.name} />
                      ))}
                    </div>
                  </div>
                  <button onClick={() => editProduct(p)} className="btn-icon"><Edit size={20} /></button>
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
