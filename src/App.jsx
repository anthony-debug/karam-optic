import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import { products as defaultProducts } from './data/products';
import { supabase } from './supabaseClient';
import CustomOrderModal from './components/CustomOrderModal';
import { MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

function Store() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (error || !data || data.length === 0) {
        console.warn("Could not load from Supabase. Falling back to default catalog.");
        setProducts(defaultProducts);
      } else {
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product, customization, quantity) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.customization.id === customization.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.customization.id === customization.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, customization, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, customizationId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.customization.id === customizationId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeItem = (productId, customizationId) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.customization.id === customizationId)));
  };

  return (
    <div className="app-container">
      <Header 
        cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenCustomOrder={() => setIsCustomOrderOpen(true)}
      />
      
      <main>
        <Hero />
        <div id="catalog" className="app-padding" style={{ padding: '2rem 5%' }}>
          <ProductCatalog products={products} onAddToCart={addToCart} />
        </div>
      </main>

      {isCartOpen && (
        <CartDrawer 
          items={cartItems} 
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={() => {
            setIsCartOpen(false);
            setIsCheckoutOpen(true);
          }}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal 
          items={cartItems} 
          onClose={() => setIsCheckoutOpen(false)} 
          onSuccess={() => setCartItems([])}
        />
      )}

      {isCustomOrderOpen && (
        <CustomOrderModal onClose={() => setIsCustomOrderOpen(false)} />
      )}

      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a 
          href="https://wa.me/YOUR_NUMBER_HERE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-icon" 
          style={{ background: '#25D366', color: 'white', width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)', padding: 0 }}
          title="Chat on WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
        <a 
          href="https://www.instagram.com/karam.optic/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-icon" 
          style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: 'white', width: '50px', height: '50px', borderRadius: '50%', boxShadow: '0 4px 15px rgba(220, 39, 67, 0.4)', padding: 0 }}
          title="Follow on Instagram"
        >
          <InstagramIcon size={24} />
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
