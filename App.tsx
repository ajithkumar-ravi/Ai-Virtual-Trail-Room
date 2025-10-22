import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { VirtualTryOnPage } from './pages/VirtualTryOnPage';
import { WishlistSidenav } from './components/WishlistSidenav';
import { ApiKeyModal } from './components/ApiKeyModal';
import { Product } from './types';
import { products } from './data/products';

export type View =
  | { page: 'home' }
  | { page: 'productList'; category?: string; searchQuery?: string }
  | { page: 'productDetail'; product: Product }
  | { page: 'tryOn'; product: Product };


function App() {
  const [view, setView] = useState<View>({ page: 'home' });
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  useEffect(() => {
    const apiKey = sessionStorage.getItem('gemini-api-key');
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleApiKeySave = (key: string) => {
    sessionStorage.setItem('gemini-api-key', key);
    setIsApiKeyModalOpen(false);
  };

  const navigateToHome = () => setView({ page: 'home' });
  const navigateToProductList = (category: string) => setView({ page: 'productList', category });
  const navigateToProductDetail = (product: Product) => {
    setView({ page: 'productDetail', product });
    setIsWishlistOpen(false);
  };
  const navigateToTryOn = (product: Product) => setView({ page: 'tryOn', product });

  const handleSearch = (query: string) => {
    setView({ page: 'productList', searchQuery: query });
  };
  
  const handleAddToWishlist = (product: Product) => {
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  const toggleWishlistSidenav = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  const renderContent = () => {
    switch (view.page) {
      case 'home':
        return <HomePage onSelectCategory={navigateToProductList} />;
      case 'productList':
        const filteredProducts = view.searchQuery 
            ? products.filter(p => p.name.toLowerCase().includes(view.searchQuery!.toLowerCase()) || p.description.toLowerCase().includes(view.searchQuery!.toLowerCase()))
            : products.filter(p => p.category === view.category);
        return <ProductListPage 
                  category={view.category}
                  searchQuery={view.searchQuery}
                  products={filteredProducts} 
                  onSelectProduct={navigateToProductDetail}
                  onBack={navigateToHome} 
                />;
      case 'productDetail':
        return <ProductDetailPage 
                  product={view.product} 
                  onTryOn={navigateToTryOn} 
                  onBack={() => view.product.category ? navigateToProductList(view.product.category) : navigateToHome()}
                  wishlist={wishlist}
                  onAddToWishlist={handleAddToWishlist}
                  onRemoveFromWishlist={handleRemoveFromWishlist}
                />;
      case 'tryOn':
        return <VirtualTryOnPage 
                  product={view.product} 
                  onBack={() => navigateToProductDetail(view.product)} 
                  onApiKeyRequest={() => setIsApiKeyModalOpen(true)}
                />;
      default:
        return <HomePage onSelectCategory={navigateToProductList} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-200 dark:bg-gray-900 text-base-content dark:text-gray-300 font-sans">
      <Header 
        onLogoClick={navigateToHome} 
        onSearch={handleSearch}
        wishlistCount={wishlist.length}
        onToggleWishlist={toggleWishlistSidenav}
      />
      <WishlistSidenav
        isOpen={isWishlistOpen}
        onClose={toggleWishlistSidenav}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onSelectProduct={navigateToProductDetail}
      />
       {isApiKeyModalOpen && (
        <ApiKeyModal 
          onSave={handleApiKeySave}
          onClose={() => setIsApiKeyModalOpen(false)}
        />
      )}
      <main className="container mx-auto p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
