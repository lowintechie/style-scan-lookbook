import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  onViewProduct?: (id: string) => void;
  onViewQR?: (id: string) => void;
}

const getStockStatus = (stock: number) => {
  if (stock === 0) return { variant: "secondary", text: "Out of Stock", color: "stock-out" };
  if (stock < 10) return { variant: "destructive", text: `${stock} Stock`, color: "stock-low" };
  if (stock < 50) return { variant: "warning", text: `${stock} Stock`, color: "stock-medium" };
  return { variant: "success", text: `${stock} Stock`, color: "stock-high" };
};

export const ProductCard = ({
  id,
  name,
  description,
  price,
  stock,
  image,
  category,
  onViewProduct,
  onViewQR,
}: ProductCardProps) => {
  const stockStatus = getStockStatus(stock);

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-card-hover border-border/50">
      {/* Stock Badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge 
          variant={stockStatus.variant as any}
          className="text-xs font-medium px-2 py-1 rounded-md bg-card/90 backdrop-blur-sm"
        >
          {stockStatus.text}
        </Badge>
      </div>

      {/* QR Code Button */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-card/90 backdrop-blur-sm hover:bg-fashion hover:text-fashion-foreground"
          onClick={() => onViewQR?.(id)}
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-card-foreground text-lg leading-tight">{name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-card-foreground">
            ${price.toFixed(2)}
          </div>
          <Button
            size="sm"
            variant="fashion"
            className="h-9 px-4 font-medium"
            onClick={() => onViewProduct?.(id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};