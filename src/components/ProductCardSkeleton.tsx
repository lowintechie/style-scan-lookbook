import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full flex flex-col">
      {/* Image skeleton */}
      <div className="aspect-square">
        <Skeleton className="w-full h-full rounded-t-lg" />
      </div>
      
      {/* Content skeleton */}
      <CardContent className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="flex-grow space-y-2 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full hidden md:block" />
          <Skeleton className="h-3 w-2/3 hidden md:block" />
        </div>
        
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-full md:w-24" />
        </div>
      </CardContent>
    </Card>
  );
};
