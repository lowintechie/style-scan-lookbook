import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  onImageZoom?: (image: string, name: string) => void;
  onViewQR?: (id: string) => void;
}

export const ProductCard = ({
  id,
  name,
  description,
  image,
  category,
  onImageZoom,
  onViewQR,
}: ProductCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-fashion/10 hover:bg-card-hover border-border hover:border-fashion/50 hover:-translate-y-1 h-full flex flex-col cursor-pointer"
      onClick={() => onImageZoom?.(image, name)}
    >
      {/* New Arrival Badge */}
      <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-10">
        <Badge
          variant="success"
          className="text-[10px] sm:text-xs font-medium px-1 py-0.5 sm:px-1.5 rounded-full bg-fashion backdrop-blur-sm md:px-2 md:py-1 border shadow-sm"
        >
          <span className="hidden sm:inline">New Arrival</span>
          <span className="sm:hidden">New</span>
        </Badge>
      </div>

      {/* QR Code Button */}
      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
        <Button
          size="sm"
          variant="secondary"
          className="h-5 w-5 sm:h-6 sm:w-6 p-0 bg-background/95 backdrop-blur-sm hover:bg-fashion hover:text-fashion-foreground border shadow-sm md:h-8 md:w-8"
          onClick={() => onViewQR?.(id)}
        >
          <QrCode className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
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
      <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-grow bg-background">
        <div className="flex-grow space-y-1 mb-2 sm:mb-3 md:mb-4">
          <h3 className="font-semibold text-card-foreground text-xs leading-tight sm:text-sm md:text-lg line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3.5rem] group-hover:text-fashion transition-colors duration-200">
            {name}
          </h3>
          <p className="text-muted-foreground text-[10px] line-clamp-3 sm:line-clamp-2 sm:text-xs md:block md:text-sm min-h-[2.4rem] sm:min-h-[2rem]">
            {description}
          </p>
        </div>

        {/* Button - Always at bottom */}
        {/* <div className="flex justify-center mt-auto">
          <Button
            size="sm"
            variant="fashion"
            className="h-7 px-2 text-[10px] font-medium sm:h-8 sm:px-3 sm:text-xs md:h-9 md:px-4 md:text-sm transition-all duration-200 hover:scale-105 w-full sm:w-auto"
            onClick={() => onViewProduct?.(id)}
          >
            <Eye className="h-2.5 w-2.5 mr-1 sm:h-3 sm:w-3 md:h-4 md:w-4" />
            <span className="hidden xs:inline sm:hidden">View</span>
            <span className="xs:hidden sm:inline">View Details</span>
            <span className="hidden max-xs:inline">•••</span>
          </Button>
        </div> */}
      </div>
    </Card>
  );
};
