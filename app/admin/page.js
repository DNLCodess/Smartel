'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, BarChart3, ShoppingCart, Package, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useStore from '@/store/useStore';
import { formatPrice } from '@/lib/utils';

export default function AdminPage() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    checkoutHistory,
    categories 
  } = useStore();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    specifications: ['']
  });

  // Calculate stats
  const totalProducts = products.length;
  const totalCheckouts = checkoutHistory.length;
  const totalRevenue = checkoutHistory.reduce((sum, checkout) => sum + checkout.total, 0);
  const avgOrderValue = totalCheckouts > 0 ? totalRevenue / totalCheckouts : 0;

  const handleAddProduct = () => {
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      specifications: newProduct.specifications.filter(spec => spec.trim() !== '')
    };
    
    addProduct(productData);
    setNewProduct({
      name: '',
      price: '',
      image: '',
      category: '',
      description: '',
      specifications: ['']
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      price: product.price.toString(),
      specifications: product.specifications || ['']
    });
  };

  const handleUpdateProduct = () => {
    const productData = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      specifications: newProduct.specifications.filter(spec => spec.trim() !== '')
    };
    
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      price: '',
      image: '',
      category: '',
      description: '',
      specifications: ['']
    });
  };

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const addSpecification = () => {
    setNewProduct({
      ...newProduct,
      specifications: [...newProduct.specifications, '']
    });
  };

  const updateSpecification = (index, value) => {
    const updatedSpecs = [...newProduct.specifications];
    updatedSpecs[index] = value;
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs
    });
  };

  const removeSpecification = (index) => {
    const updatedSpecs = newProduct.specifications.filter((_, i) => i !== index);
    setNewProduct({
      ...newProduct,
      specifications: updatedSpecs
    });
  };

  const ProductForm = ({ isEditing = false }) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          placeholder="Enter product name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select 
            value={newProduct.category} 
            onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.filter(cat => cat !== 'All').map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          placeholder="Enter product description"
          rows={3}
        />
      </div>

      <div>
        <Label>Specifications</Label>
        {newProduct.specifications.map((spec, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <Input
              value={spec}
              onChange={(e) => updateSpecification(index, e.target.value)}
              placeholder="Enter specification"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeSpecification(index)}
              disabled={newProduct.specifications.length <= 1}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSpecification}
          className="mt-2"
        >
          Add Specification
        </Button>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={isEditing ? handleUpdateProduct : handleAddProduct}
          className="flex-1"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => {
            setEditingProduct(null);
            setIsAddDialogOpen(false);
            setNewProduct({
              name: '',
              price: '',
              image: '',
              category: '',
              description: '',
              specifications: ['']
            });
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="checkouts">Checkouts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalProducts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Checkouts</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCheckouts}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPrice(avgOrderValue)}</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Checkouts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Checkouts</CardTitle>
              </CardHeader>
              <CardContent>
                {checkoutHistory.length > 0 ? (
                  <div className="space-y-4">
                    {checkoutHistory.slice(0, 5).map((checkout) => (
                      <div key={checkout.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">
                            {checkout.items.length} item{checkout.items.length !== 1 ? 's' : ''}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(checkout.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="font-bold text-primary">
                          {formatPrice(checkout.total)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No checkouts yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <Badge className={product.inStock ? 'bg-green-500' : 'bg-red-500'}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="checkouts">
            <div className="space-y-4">
              {checkoutHistory.length > 0 ? (
                checkoutHistory.map((checkout) => (
                  <Card key={checkout.id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">
                            Checkout #{checkout.id.toString().slice(-6)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(checkout.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-primary">
                          {formatPrice(checkout.total)}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">Items:</h4>
                        {checkout.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-16 text-center">
                    <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No checkouts yet</h3>
                    <p className="text-gray-600">
                      Checkout history will appear here once customers start making purchases.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Product Dialog */}
        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm isEditing={true} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Footer />
    </div>
  );
}