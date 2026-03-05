// Brand color palette for Kyrana
const Brand = {
  primary: '#00473E',    // Deep Teal/Navy
  secondary: '#E8F5E9',  // Mint
  accent: '#FF8C00',     // Bright Orange (CTA)
  background: '#FFFFFF',  // Pure White
  text: '#1A1A1A',       // Obsidian
};

export default {
  light: {
    text: Brand.text,
    background: Brand.background,
    tint: Brand.primary,
    tabIconDefault: '#9CA3AF',
    tabIconSelected: Brand.primary,
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#FFFFFF',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#FFFFFF',
  },
  brand: Brand,
};
