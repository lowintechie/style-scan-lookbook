import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SearchBar } from "@/components/SearchBar";
import {
  QrCode,
  Store,
  Scan,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Product");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();

  // Banner slides data
  const bannerSlides = [
    {
      id: 1,
      title: "Chic Collection 2025",
      subtitle: "Feminine & Stylish",
      description: "Discover elegant pieces that celebrate your unique style",
      buttonText: "Shop Now",
      bgColor: "from-fashion via-fashion/80 to-fashion/60",
      imageUrl:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 2,
      title: "Effortless Elegance",
      subtitle: "Digital Fashion",
      description: "Experience fashion with our smart QR lookbook technology",
      buttonText: "Discover",
      bgColor: "from-foreground via-foreground/80 to-foreground/60",
      imageUrl:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      id: 3,
      title: "Pretty in Pink",
      subtitle: "Curated with Love",
      description: "Handpicked pieces for the modern, confident woman",
      buttonText: "Explore",
      bgColor: "from-fashion/80 via-fashion/60 to-fashion/40",
      imageUrl:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerSlides.length]);

  // Calculate categories with counts
  const categories = useMemo(() => {
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const allCount = products.length;

    return [
      { name: "All Product", count: allCount },
      ...Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description &&
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));
      const matchesCategory =
        activeCategory === "All Product" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleViewQR = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    toast({
      title: "QR Code Generated",
      description: `QR code for ${product?.name} is ready for in-store display.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 py-3 md:px-4 md:py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-fashion rounded-lg">
                <img
                  src="/images/logo.jpg"
                  alt="logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Nashy Clothesy
                </h1>
                <p className="text-xs text-muted-foreground">Chic & Digital</p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              >
                {mobileSearchOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
              <Badge variant="fashion" className="text-xs px-2 py-1">
                {products.length}
              </Badge>
            </div>
          </div>

          {/* Mobile Search Dropdown */}
          {mobileSearchOpen && (
            <div className="mt-4 md:hidden">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
            </div>
          )}

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-fashion rounded-lg">
                <img
                  src="/images/logo.jpg"
                  alt="logo"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Nashy Clothesy
                </h1>
                <p className="text-sm text-muted-foreground">
                  Chic Digital Fashion Lookbook
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                {products.length} Products
              </Badge>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-fashion/10 to-background overflow-hidden">
        <div className="container mx-auto px-3 md:px-4">
          <div className="relative">
            {/* Banner Slide */}
            <div
              className={`relative rounded-2xl mx-2 md:mx-0 mt-4 md:mt-8 mb-6 md:mb-12 overflow-hidden bg-gradient-to-r ${bannerSlides[currentSlide].bgColor} text-white min-h-[200px] md:min-h-[300px] flex items-center`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={bannerSlides[currentSlide].imageUrl}
                  alt={bannerSlides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

              {/* Content */}
              <div className="relative z-10 p-6 md:p-12 flex flex-col justify-center h-full max-w-2xl">
                <Badge
                  variant="secondary"
                  className="w-fit mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm"
                >
                  {bannerSlides[currentSlide].subtitle}
                </Badge>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                  {bannerSlides[currentSlide].title}
                </h2>
                <p className="text-sm md:text-lg text-white/90 mb-4 md:mb-6 max-w-md drop-shadow-sm">
                  {bannerSlides[currentSlide].description}
                </p>
                <Button
                  variant="secondary"
                  className="w-fit bg-white text-foreground hover:bg-white/90 shadow-lg"
                  onClick={() => navigate("/products")}
                >
                  {bannerSlides[currentSlide].buttonText}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {bannerSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white shadow-lg"
                        : "bg-white/50"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="container mx-auto px-3 md:px-4 mb-6 md:mb-8">
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <Card className="hover:shadow-md transition-shadow border-fashion/20">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-fashion" />
                </div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Trending
                </p>
                <p className="text-sm md:text-lg font-bold text-foreground">
                  Chic Styles
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow border-fashion/20">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-4 w-4 md:h-5 md:w-5 text-fashion" />
                </div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Quality
                </p>
                <p className="text-sm md:text-lg font-bold text-foreground">
                  Premium
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow border-fashion/20">
              <CardContent className="p-3 md:p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <QrCode className="h-4 w-4 md:h-5 md:w-5 text-fashion" />
                </div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground">
                  Digital
                </p>
                <p className="text-sm md:text-lg font-bold text-foreground">
                  Smart
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-3 py-2 md:px-4 md:py-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Our Chic Collection
            </h2>
            <p className="text-sm text-muted-foreground">
              Find your perfect style, beautifully curated
            </p>
          </div>
          <Badge variant="outline" className="hidden md:flex border-fashion/30">
            {filteredProducts.length} items
          </Badge>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 items-start">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="text-destructive mb-2">Error loading products</div>
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 items-start">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description || ""}
                  price={product.price}
                  stock={product.stock}
                  image={product.image_url || ""}
                  category={product.category}
                  onViewProduct={handleViewProduct}
                  onViewQR={handleViewQR}
                />
              ))}
            </div>

            {/* Load More Button */}
            {filteredProducts.length > 12 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg" className="px-8">
                  Load More Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-fashion/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCode className="h-10 w-10 text-fashion" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              variant="fashion"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All Product");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Modern Footer Section */}
        <div className="mt-20">
          {/* Main Footer */}
          <footer className="bg-gradient-to-br from-background to-fashion/5 border-t border-fashion/20">
            <div className="container mx-auto px-3 md:px-4 py-8 md:py-12">
              {/* Footer Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-fashion rounded-xl">
                      <img
                        src="/images/logo.jpg"
                        alt="logo"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Nashy Clothesy
                      </h3>
                      <p className="text-xs text-fashion font-medium">
                        Chic & Digital
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto md:mx-0">
                    Your premier destination for elegant, modern fashion with
                    smart digital shopping technology.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-3">
                    <div className="w-8 h-8 bg-fashion/20 rounded-full flex items-center justify-center hover:bg-fashion/30 transition-colors cursor-pointer">
                      <span className="text-fashion text-sm font-bold">f</span>
                    </div>
                    <div className="w-8 h-8 bg-fashion/20 rounded-full flex items-center justify-center hover:bg-fashion/30 transition-colors cursor-pointer">
                      <span className="text-fashion text-sm font-bold">@</span>
                    </div>
                    <div className="w-8 h-8 bg-fashion/20 rounded-full flex items-center justify-center hover:bg-fashion/30 transition-colors cursor-pointer">
                      <span className="text-fashion text-sm font-bold">in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
