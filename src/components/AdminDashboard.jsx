import React, { useState, useEffect } from 'react';
import { Trash2, Plus, ArrowLeft, Loader, Edit, UploadCloud, Download } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { products as defaultProducts } from '../data/products';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: '', category: '3D Prints', type: '3d-print', price: '', description: '', image: '',
  });

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

  async function uploadImage() {
    if (!imageFile) return formData.image;
    setUploading(true);
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, imageFile);
    setUploading(false);
    
    if (uploadError) {
      alert('Error uploading image: ' + uploadError.message);
      return formData.image;
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function saveProduct(e) {
    e.preventDefault();
    
    const imageUrl = await uploadImage();

    const productPayload = {
      name: formData.name,
      category: formData.category,
      type: formData.type,
      price: parseFloat(formData.price),
      description: formData.description,
      image: imageUrl,
      customizationOptions: formData.type === '3d-print' ? [
        { id: 'slate', name: 'Deep Slate', colorHex: '#2f4f4f' },
        { id: 'copper', name: 'Metallic Copper', colorHex: '#b87333' }
      ] : [
        { id: 'vanilla', name: 'Warm Vanilla', colorHex: '#fdfbf7' },
        { id: 'mocha', name: 'Mocha Brown', colorHex: '#6f4e37' }
      ],
      defaultCustomization: formData.type === '3d-print' ? 'slate' : 'vanilla'
    };

    if (editingId) {
      const { error } = await supabase.from('products').update(productPayload).eq('id', editingId);
      if (!error) resetForm();
      else alert("Error updating product.");
    } else {
      const { error } = await supabase.from('products').insert([productPayload]);
      if (!error) resetForm();
      else alert("Error adding product. Is your table set up?");
    }
    fetchProducts();
  }

  function editProduct(p) {
    setEditingId(p.id);
    setFormData({
      name: p.name, category: p.category, type: p.type, price: p.price, description: p.description, image: p.image
    });
    setImageFile(null);
  }

  function resetForm() {
    setEditingId(null);
    setImageFile(null);
    setFormData({ name: '', category: '3D Prints', type: '3d-print', price: '', description: '', image: '' });
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
      // Remove id so Supabase generates UUIDs
      const dataToInsert = defaultProducts.map(({ id, ...rest }) => rest);
      const { error } = await supabase.from('products').insert(dataToInsert);
      if (!error) {
        fetchProducts();
      } else {
        alert("Import failed. Make sure your table exists.");
      }
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
            
            <div style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => document.getElementById('imageUpload').click()}>
              <UploadCloud size={20} color="var(--color-text-muted)" />
              <span style={{ color: imageFile ? '#fff' : 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {imageFile ? imageFile.name : formData.image ? 'Change Current Image' : 'Upload Image from Laptop'}
              </span>
              <input id="imageUpload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setImageFile(e.target.files[0])} />
            </div>

            <textarea required placeholder="Description" rows={4} style={inputStyle} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={uploading}>
              {uploading ? <Loader className="animate-spin" /> : editingId ? 'Update Product' : <><Plus size={20} /> Add Product</>}
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
            <p style={{ color: 'var(--color-text-muted)' }}>No products found. Use the import button above or add a new one.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--border-radius-sm)' }}>
                  <img src={p.image} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>${p.price} | {p.category}</span>
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
