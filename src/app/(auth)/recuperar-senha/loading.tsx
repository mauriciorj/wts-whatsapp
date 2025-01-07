"use server";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <Card className="w-full max-w-lg mx-auto p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2 text-center">
          <Skeleton className="h-8 w-56 mx-auto" />
          <Skeleton className="h-5 w-80 mx-auto" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email field */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Login link */}
        <div className="text-center">
          <Skeleton className="h-5 w-44 mx-auto" />
        </div>
      </div>
    </Card>
  );
};

export default Loading;
