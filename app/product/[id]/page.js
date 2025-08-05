'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Share2, ShoppingCart, Star, Check, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import useStore from '@/store/useStore';
import { formatPrice, shareProduct } from '@/lib/utils';

export default function ProductPage({ params }) {
  const { id } = params;
  const { getProductById, addToCart, products } = useStore();
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleShare = () => {
    shareProduct(product);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) • 127 reviews</span>
              </div>

              <p className="text-4xl font-bold text-primary mb-6">
                {formatPrice(product.price)}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium">Quantity:</label>
                  <select 
                    value={quantity} 
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-1"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                {product.inStock ? (
                  <Badge className="bg-green-500">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white py-3"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="hover:bg-primary hover:text-white"
                  size="lg"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $500</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">25-Year Warranty</p>
                  <p className="text-xs text-gray-600">Manufacturing defects</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <HeadphonesIcon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Expert Support</p>
                  <p className="text-xs text-gray-600">24/7 assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}