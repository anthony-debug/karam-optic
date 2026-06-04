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

function Store() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
