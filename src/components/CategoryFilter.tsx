import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={activeCategory === category.name ? "fashion" : "secondary"}
          className="h-10 px-4 font-medium transition-all duration-200"
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
  );
};