import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="container mx-auto h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex flex-col w-full space-y-4 container mx-auto">
        <Skeleton className="h-[56px] mb-4" />

        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[96px] md:w-[166px]" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-[48px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
          <Skeleton className="h-[57px]" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-[32px] w-[493px]" />
        </div>
      </div>
    </div>
  );
}
