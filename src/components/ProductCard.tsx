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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-fashion/10 hover:bg-card-hover border-border hover:border-fashion/50 hover:-translate-y-1 h-full flex flex-col">
      {/* Stock Badge */}
      <div className="absolute top-2 left-2 z-10">
        <Badge 
          variant={stockStatus.variant as any}
          className="text-xs font-medium px-1.5 py-0.5 rounded-full bg-background/95 backdrop-blur-sm md:px-2 md:py-1 border shadow-sm"
        >
          <span className="hidden sm:inline">{stockStatus.text}</span>
          <span className="sm:hidden">{stock}</span>
        </Badge>
      </div>

      {/* QR Code Button */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
        <Button
          size="sm"
          variant="secondary"
          className="h-6 w-6 p-0 bg-background/95 backdrop-blur-sm hover:bg-fashion hover:text-fashion-foreground border shadow-sm md:h-8 md:w-8"
          onClick={() => onViewQR?.(id)}
        >
          <QrCode className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="aspect-square overflow-hidden bg-muted/20">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Product Details - Flex grow to fill remaining space */}
      <div className="p-3 md:p-4 flex flex-col flex-grow bg-background">
        <div className="flex-grow space-y-1 mb-3 md:mb-4">
          <h3 className="font-semibold text-card-foreground text-sm leading-tight md:text-lg line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem] group-hover:text-fashion transition-colors duration-200">{name}</h3>
          <p className="text-muted-foreground text-xs line-clamp-2 hidden md:block md:text-sm min-h-[2rem]">{description}</p>
        </div>

        {/* Price and Button - Always at bottom */}
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0 mt-auto">
          <div className="text-lg font-bold text-foreground md:text-xl">
            ${price.toFixed(2)}
          </div>
          <Button
            size="sm"
            variant="fashion"
            className="h-8 px-3 text-xs font-medium md:h-9 md:px-4 md:text-sm transition-all duration-200 hover:scale-105"
            onClick={() => onViewProduct?.(id)}
          >
            <Eye className="h-3 w-3 mr-1 md:h-4 md:w-4" />
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">View</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};