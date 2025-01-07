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
          <Skeleton className="h-5 w-72 mx-auto" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Plan selection */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Payment section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          {/* Submit button */}
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <Skeleton className="h-5 w-48 mx-auto" />
        </div>
      </div>
    </Card>
  );
};

export default Loading;
