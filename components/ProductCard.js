'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Share2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useStore from '@/store/useStore';
import { formatPrice, shareProduct } from '@/lib/utils';

export default function ProductCard({ product, showAddToCart = true }) {
  const { addToCart } = useStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleShare = (e) => {
    e.preventDefault();
    shareProduct(product);
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-primary text-white">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive" className="absolute top-3 right-3">
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">(4.0)</span>
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="hover:bg-primary hover:text-white transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          {showAddToCart && (
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}