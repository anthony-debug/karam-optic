import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { products } from './data/products';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
        <div className="app-padding" style={{ padding: '2rem 5%' }}>
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

export default App;
