import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Cart state
      cartItems: [],
      cartCount: 0,
      cartTotal: 0,

      // Products state
      products: [
        {
          id: 1,
          name: "Solar Panel 400W Monocrystalline",
          price: 299.99,
          image: "https://images.pexels.com/photos/9875416/pexels-photo-9875416.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Solar Panels",
          description: "High-efficiency 400W monocrystalline solar panel with 25-year warranty. Perfect for residential and commercial installations.",
          specifications: [
            "400W Peak Power",
            "Monocrystalline Technology",
            "25-Year Warranty",
            "Weather Resistant",
            "Easy Installation"
          ],
          inStock: true,
          featured: true
        },
        {
          id: 2,
          name: "Solar Battery 12V 100Ah Lithium",
          price: 599.99,
          image: "https://images.pexels.com/photos/9875415/pexels-photo-9875415.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Batteries",
          description: "Premium lithium battery with built-in BMS for safe and reliable energy storage.",
          specifications: [
            "12V 100Ah Capacity",
            "Lithium Iron Phosphate",
            "Built-in BMS",
            "10-Year Warranty",
            "Maintenance Free"
          ],
          inStock: true,
          featured: true
        },
        {
          id: 3,
          name: "Solar Inverter 3000W Pure Sine Wave",
          price: 399.99,
          image: "https://images.pexels.com/photos/9875413/pexels-photo-9875413.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Inverters",
          description: "High-quality pure sine wave inverter for clean power conversion.",
          specifications: [
            "3000W Continuous Power",
            "Pure Sine Wave Output",
            "LCD Display",
            "Multiple Protection",
            "Remote Monitoring"
          ],
          inStock: true,
          featured: false
        },
        {
          id: 4,
          name: "Solar Charge Controller MPPT 60A",
          price: 149.99,
          image: "https://images.pexels.com/photos/9875414/pexels-photo-9875414.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Controllers",
          description: "Advanced MPPT charge controller for maximum power point tracking.",
          specifications: [
            "60A Maximum Current",
            "MPPT Technology",
            "LCD Display",
            "Multiple Load Control",
            "Temperature Compensation"
          ],
          inStock: true,
          featured: true
        },
        {
          id: 5,
          name: "Solar Installation Kit Complete",
          price: 899.99,
          image: "https://images.pexels.com/photos/9875412/pexels-photo-9875412.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Kits",
          description: "Complete solar installation kit with all necessary components.",
          specifications: [
            "Complete Installation Kit",
            "All Mounting Hardware",
            "Wiring and Connectors",
            "Installation Manual",
            "Technical Support"
          ],
          inStock: true,
          featured: true
        },
        {
          id: 6,
          name: "Solar LED Street Light 150W",
          price: 249.99,
          image: "https://images.pexels.com/photos/9875411/pexels-photo-9875411.jpeg?auto=compress&cs=tinysrgb&w=800",
          category: "Lighting",
          description: "All-in-one solar LED street light with motion sensor and dusk-to-dawn operation.",
          specifications: [
            "150W LED Light",
            "Motion Sensor",
            "Remote Control",
            "Weatherproof IP65",
            "5-Year Warranty"
          ],
          inStock: true,
          featured: false
        }
      ],

      // Search and filter state
      searchQuery: '',
      selectedCategory: 'All',
      categories: ['All', 'Solar Panels', 'Batteries', 'Inverters', 'Controllers', 'Kits', 'Lighting'],

      // Admin state
      adminMode: false,
      checkoutHistory: [],

      // Actions
      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find(item => item.id === product.id);
        
        let newCartItems;
        if (existingItem) {
          newCartItems = cartItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newCartItems = [...cartItems, { ...product, quantity: 1 }];
        }
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0),
          cartTotal: newCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      removeFromCart: (productId) => {
        const { cartItems } = get();
        const newCartItems = cartItems.filter(item => item.id !== productId);
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0),
          cartTotal: newCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      updateCartQuantity: (productId, quantity) => {
        const { cartItems } = get();
        const newCartItems = cartItems.map(item =>
          item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
        ).filter(item => item.quantity > 0);
        
        set({
          cartItems: newCartItems,
          cartCount: newCartItems.reduce((sum, item) => sum + item.quantity, 0),
          cartTotal: newCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
      },

      clearCart: () => {
        set({
          cartItems: [],
          cartCount: 0,
          cartTotal: 0
        });
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // Admin actions
      toggleAdminMode: () => set((state) => ({ adminMode: !state.adminMode })),
      
      addProduct: (product) => {
        const { products } = get();
        const newProduct = {
          ...product,
          id: Math.max(...products.map(p => p.id)) + 1,
          featured: false,
          inStock: true
        };
        set({ products: [...products, newProduct] });
      },

      updateProduct: (id, updatedProduct) => {
        const { products } = get();
        set({
          products: products.map(product =>
            product.id === id ? { ...product, ...updatedProduct } : product
          )
        });
      },

      deleteProduct: (id) => {
        const { products } = get();
        set({ products: products.filter(product => product.id !== id) });
      },

      recordCheckout: (cartItems, total) => {
        const { checkoutHistory } = get();
        const checkout = {
          id: Date.now(),
          items: cartItems,
          total: total,
          timestamp: new Date().toISOString(),
        };
        set({ checkoutHistory: [checkout, ...checkoutHistory] });
      },

      // Getters
      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory } = get();
        return products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               product.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          return matchesSearch && matchesCategory;
        });
      },

      getFeaturedProducts: () => {
        const { products } = get();
        return products.filter(product => product.featured);
      },

      getProductById: (id) => {
        const { products } = get();
        return products.find(product => product.id === parseInt(id));
      },
    }),
    {
      name: 'solar-store',
      partialize: (state) => ({
        cartItems: state.cartItems,
        cartCount: state.cartCount,
        cartTotal: state.cartTotal,
        products: state.products,
        checkoutHistory: state.checkoutHistory,
      }),
    }
  )
);

export default useStore;