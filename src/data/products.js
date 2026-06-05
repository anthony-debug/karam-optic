export const products = [
  {
    id: '1',
    name: 'World Cup Miniature Trophy',
    category: 'World Cup',
    type: '3d-print',
    price: 45.0,
    description: 'A highly detailed, precision-sculpted miniature replica of the World Cup trophy. Perfect for desk display.',
    baseMaterial: 'PLA Plastic',
    customizationOptions: [
      { id: 'gold', name: 'Silk Gold', colorHex: '#d4af37' },
      { id: 'silver', name: 'Silk Silver', colorHex: '#c0c0c0' },
      { id: 'bronze', name: 'Metallic Bronze', colorHex: '#cd7f32' }
    ],
    defaultCustomization: 'gold',
    image: 'https://images.unsplash.com/photo-1518605368461-1eb2d48344e1?auto=format&fit=crop&w=800&q=80',
    modelUrl: '/models/trophy.glb', // Placeholder
    featured: true
  },
  {
    id: '2',
    name: 'Crochet Soccer Ball Mascot',
    category: 'World Cup',
    type: 'crochet',
    price: 35.0,
    description: 'A cozy, handmade crochet soccer ball plushie. Soft, durable, and perfect for the upcoming games.',
    baseMaterial: '100% Cotton Yarn',
    customizationOptions: [
      { id: 'classic', name: 'Classic Black & White', colorHex: '#ffffff' },
      { id: 'retro', name: 'Retro Leather Brown', colorHex: '#8b4513' },
      { id: 'neon', name: 'Neon Green', colorHex: '#39ff14' }
    ],
    defaultCustomization: 'classic',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'The Swirl Planter',
    category: 'Sculptures',
    type: '3d-print',
    price: 28.0,
    description: 'An elegant artisan-sculpted geometric planter with a sweeping cinnamon-swirl pattern.',
    baseMaterial: 'Matte PETG',
    customizationOptions: [
      { id: 'cinnamon', name: 'Cinnamon Amber', colorHex: '#d97706' },
      { id: 'charcoal', name: 'Matte Charcoal', colorHex: '#333333' },
      { id: 'pistachio', name: 'Pistachio Green', colorHex: '#10b981' }
    ],
    defaultCustomization: 'cinnamon',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Sahlab Mug Cozy',
    category: 'Crochet',
    type: 'crochet',
    price: 18.0,
    description: 'Hand-crocheted waffle-stitch cup sleeve. Keeps your Sahlab warm and your hands comfortable.',
    baseMaterial: 'Merino Wool',
    customizationOptions: [
      { id: 'vanilla', name: 'Warm Vanilla', colorHex: '#fdfbf7' },
      { id: 'mocha', name: 'Mocha Brown', colorHex: '#6f4e37' },
      { id: 'rose', name: 'Dusty Rose', colorHex: '#dca4a8' }
    ],
    defaultCustomization: 'vanilla',
    image: 'https://images.unsplash.com/photo-1544885935-98dd03b09034?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Hexagon Coaster Set',
    category: 'Sculptures',
    type: '3d-print',
    price: 22.0,
    description: 'Set of 4 structural artisan-sculpted hexagonal coasters with a sleek modern design.',
    baseMaterial: 'PLA Plastic',
    customizationOptions: [
      { id: 'slate', name: 'Deep Slate', colorHex: '#2f4f4f' },
      { id: 'copper', name: 'Metallic Copper', colorHex: '#b87333' },
      { id: 'white', name: 'Creamy White', colorHex: '#fdfbf7' }
    ],
    defaultCustomization: 'slate',
    image: 'https://images.unsplash.com/photo-1596489370605-e3b2e582e6c5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'Sahlab-chan Plushie',
    category: 'Crochet',
    type: 'crochet',
    price: 40.0,
    description: 'A cute hand-crocheted cup mascot representing a warm cup of Sahlab. Comes with a tiny artisan-sculpted spoon.',
    baseMaterial: 'Cotton Blend',
    customizationOptions: [
      { id: 'classic', name: 'Classic Vanilla', colorHex: '#fdfbf7' },
      { id: 'choco', name: 'Hot Choco', colorHex: '#4b3621' }
    ],
    defaultCustomization: 'classic',
    image: 'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?auto=format&fit=crop&w=800&q=80'
  }
];
