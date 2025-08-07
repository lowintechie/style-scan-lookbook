import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import { QrCode, Store, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Import product images
import jacketImage from "@/assets/product-jacket.jpg";
import sneakersImage from "@/assets/product-sneakers.jpg";
import pantsImage from "@/assets/product-pants.jpg";
import runningImage from "@/assets/product-running.jpg";
import retroImage from "@/assets/product-retro.jpg";
import socksImage from "@/assets/product-socks.jpg";

// Mock product data inspired by your reference
const products = [
  {
    id: "1",
    name: "StyleScan Tech Jacket",
    description: "Crafted with stretchy, breathable material, the perfect modern jacket for any occasion.",
    price: 130.83,
    stock: 198,
    image: jacketImage,
    category: "Clothing",
  },
  {
    id: "2",
    name: "Urban Waffle Debut",
    description: "Retro gets modernized in this Urban Waffle Debut. Remember that smooth comfort.",
    price: 80.00,
    stock: 218,
    image: sneakersImage,
    category: "Shoes",
  },
  {
    id: "3",
    name: "Elite Crew Basketball Socks",
    description: "The Elite Crew Basketball Socks offer a supportive fit and feel perfect for any activity.",
    price: 16.50,
    stock: 123,
    image: socksImage,
    category: "Others Product",
  },
  {
    id: "4",
    name: "P-6000 Running Shoes",
    description: "The P-6000 draws on the 2006 Air Pegasus, bringing forward iconic design elements.",
    price: 115.28,
    stock: 121,
    image: runningImage,
    category: "Shoes",
  },
  {
    id: "5",
    name: "Zoom Vomero Roam",
    description: "Designed for city conditions, this winterized version offers superior comfort and style.",
    price: 187.43,
    stock: 119,
    image: retroImage,
    category: "Shoes",
  },
  {
    id: "6",
    name: "Men's Fleece Cargo Pants",
    description: "Clean meets casual with these brushed fleece cargo pants that offer comfort and style.",
    price: 65.42,
    stock: 192,
    image: pantsImage,
    category: "Clothing",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Product");
  const { toast } = useToast();

  // Calculate categories with counts
  const categories = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const allCount = products.length;
    
    return [
      { name: "All Product", count: allCount },
      ...Object.entries(categoryCount).map(([name, count]) => ({ name, count })),
    ];
  }, []);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Product" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const handleViewQR = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toast({
      title: "QR Code Generated",
      description: `QR code for ${product?.name} is ready for in-store display.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-fashion rounded-lg">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">StyleScan</h1>
                <p className="text-sm text-muted-foreground">Digital Fashion Lookbook</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
              <Button variant="fashion" className="h-11 px-4">
                <Store className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onViewQR={handleViewQR}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
