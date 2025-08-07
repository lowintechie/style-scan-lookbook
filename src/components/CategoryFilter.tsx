import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: { name: string; count: number }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="mb-6 md:mb-8">
      {/* Mobile: Horizontal scrolling with scroll area */}
      <div className="md:hidden">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 p-1">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? "fashion" : "secondary"}
                className="h-9 px-4 font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0"
                onClick={() => onCategoryChange(category.name)}
              >
                {category.name}
                <Badge 
                  variant="secondary" 
                  className="ml-2 text-xs bg-background/30 text-current border-0"
                >
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* Desktop: Flex wrap */}
      <div className="hidden md:flex flex-wrap gap-3">
        {categories.map((category) => (
          <Button
            key={category.name}
            variant={activeCategory === category.name ? "fashion" : "secondary"}
            className="h-10 px-4 font-medium transition-all duration-200 hover:scale-105"
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
            <Badge 
              variant="secondary" 
              className="ml-2 text-xs bg-background/20 text-current border-0"
            >
              {category.count}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};