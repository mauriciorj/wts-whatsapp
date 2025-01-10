"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function ProfileLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" /> {/* Logo */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9" /> {/* Theme toggle */}
            <Skeleton className="h-8 w-8 rounded-full" /> {/* User avatar */}
          </div>
        </div>
      </header>

      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-6">
            <Skeleton className="h-8 w-48 mb-6" /> {/* Profile Settings title */}
            
            <div className="space-y-4">
              {/* Profile fields */}
              {[
                "First Name",
                "Last Name",
                "Email",
                "Current Plan",
                "Next Payment Date"
              ].map((field) => (
                <div key={field} className="flex justify-between items-center py-4 border-b last:border-0">
                  <Skeleton className="h-5 w-32" /> {/* Field label */}
                  <Skeleton className="h-5 w-48" /> {/* Field value */}
                </div>
              ))}

              {/* Reset Password button */}
              <div className="mt-6">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((section) => (
              <div key={section}>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <Skeleton key={item} className="h-5 w-32" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}