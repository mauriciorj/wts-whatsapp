"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen">
      {/* Sidebar Skeleton */}
      <div className="fixed left-0 top-0 h-full w-64 bg-background border-r p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-32 mb-8" /> {/* Logo */}
          <nav className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <Skeleton className="h-5 w-5" /> {/* Icon */}
                <Skeleton className="h-5 w-24" /> {/* Link text */}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        <main className="p-8">
          <div className="space-y-8">
            {/* Header Section */}
            <div>
              <Skeleton className="h-9 w-48 mb-2" /> {/* Welcome text */}
              <Skeleton className="h-6 w-64" /> {/* Subtitle */}
            </div>

            {/* Usage Chart */}
            <Card className="w-full h-[300px] p-6">
              <Skeleton className="h-7 w-36 mb-4" /> {/* Chart title */}
              <div className="h-[calc(100%-40px)]">
                <Skeleton className="w-full h-full" /> {/* Chart area */}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="w-full p-6">
              <Skeleton className="h-7 w-40 mb-4" /> {/* Section title */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24" /> {/* Activity type */}
                    <Skeleton className="h-6 w-32" /> {/* Recipient */}
                    <Skeleton className="h-6 w-24" /> {/* Date */}
                    <Skeleton className="h-6 w-20" /> {/* Status */}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
