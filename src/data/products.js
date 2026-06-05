export const products = [
  {
    id: '1',
    name: 'Classic Aviator Sunglasses',
    category: 'Sunglasses',
    type: 'sunglasses',
    price: 145.0,
    description: 'Timeless aviator design featuring lightweight metal frames and polarized UV400 lenses. Perfect for everyday wear with a touch of vintage style.',
    baseMaterial: 'Metal Alloy',
    customizationOptions: [
      { id: 'gold_green', name: 'Gold Frame / Green Lens', colorHex: '#d4af37' },
      { id: 'silver_black', name: 'Silver Frame / Black Lens', colorHex: '#c0c0c0' },
      { id: 'black_black', name: 'Black Frame / Black Lens', colorHex: '#000000' }
    ],
    defaultCustomization: 'gold_green',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    featured: true
  },
  {
    id: '2',
    name: 'Minimalist Round Eyeglasses',
    category: 'Eyeglasses',
    type: 'eyeglasses',
    price: 120.0,
    description: 'Sleek, round frames perfect for a modern, intellectual look. Made from durable acetate with anti-reflective coating options.',
    baseMaterial: 'Premium Acetate',
    customizationOptions: [
      { id: 'tortoise', name: 'Tortoiseshell', colorHex: '#8b4513' },
      { id: 'clear', name: 'Crystal Clear', colorHex: '#ffffff' },
      { id: 'matte_black', name: 'Matte Black', colorHex: '#222222' }
    ],
    defaultCustomization: 'tortoise',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Bold Square Sunglasses',
    category: 'Sunglasses',
    type: 'sunglasses',
    price: 160.0,
    description: 'Make a statement with these thick-framed, bold square sunglasses. Provides 100% UV protection with premium scratch-resistant lenses.',
    baseMaterial: 'Acetate',
    customizationOptions: [
      { id: 'black', name: 'Glossy Black', colorHex: '#000000' },
      { id: 'havana', name: 'Classic Havana', colorHex: '#6f4e37' }
    ],
    defaultCustomization: 'black',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Daily Contact Lenses (30 Pack)',
    category: 'Contact Lenses',
    type: 'lenses',
    price: 35.0,
    description: 'Ultra-breathable daily disposable contact lenses. Moisture-retaining technology ensures comfort from morning until night.',
    baseMaterial: 'Silicone Hydrogel',
    customizationOptions: [
      { id: 'standard', name: 'Standard Daily', colorHex: '#87ceeb' },
      { id: 'toric', name: 'Toric (Astigmatism)', colorHex: '#4682b4' }
    ],
    defaultCustomization: 'standard',
    image: 'https://images.unsplash.com/photo-1590457635670-3d712ce501a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Titanium Half-Rim Eyeglasses',
    category: 'Eyeglasses',
    type: 'eyeglasses',
    price: 185.0,
    description: 'Incredibly lightweight and strong titanium frames with a sophisticated half-rim design for professional settings.',
    baseMaterial: 'Titanium',
    customizationOptions: [
      { id: 'gunmetal', name: 'Gunmetal Gray', colorHex: '#4a5054' },
      { id: 'navy', name: 'Navy Blue', colorHex: '#000080' }
    ],
    defaultCustomization: 'gunmetal',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a536f01f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Retro Cat-Eye Sunglasses',
    category: 'Sunglasses',
    type: 'sunglasses',
    price: 135.0,
    description: 'Chic and feminine cat-eye sunglasses inspired by vintage fashion. Features gradient lenses and comfortable temple tips.',
    baseMaterial: 'Acetate & Metal',
    customizationOptions: [
      { id: 'red', name: 'Cherry Red', colorHex: '#8b0000' },
      { id: 'rose_gold', name: 'Rose Gold', colorHex: '#b76e79' }
    ],
    defaultCustomization: 'rose_gold',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80'
  }
];
