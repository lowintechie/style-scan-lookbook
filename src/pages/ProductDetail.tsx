import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { ArrowLeft, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, toast]);

  const handleGenerateQR = () => {
    toast({
      title: "QR Code Generated",
      description: `QR code for ${product?.name} is ready for in-store display.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/')}>Return to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-foreground">Nashy Clothesy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-muted">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No image available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                {product.sku && (
                  <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <Badge 
                variant={product.stock > 0 ? "success" : "destructive"}
                className="text-sm"
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Badge>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button 
                variant="fashion" 
                size="lg" 
                className="w-full"
                onClick={handleGenerateQR}
              >
                <QrCode className="h-5 w-5 mr-2" />
                Generate QR Code
              </Button>
              
              <div className="text-sm text-muted-foreground text-center">
                Scan QR codes in-store for instant product information
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;