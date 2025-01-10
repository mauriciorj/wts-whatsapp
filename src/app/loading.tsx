"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function HomeLoading() {
  return (
    <>
      {/* Header Skeleton */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-9" /> {/* Theme toggle */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" /> {/* Login button */}
              <Skeleton className="h-9 w-32" /> {/* Create Account button */}
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section Loading */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Skeleton className="h-16 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-40" />
              </div>
              <div className="relative">
                <Skeleton className="h-[500px] w-full rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section Loading */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-72 mx-auto mb-16" />
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <Skeleton className="h-12 w-12 mb-4" />
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-20 w-full" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section Loading */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-64 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2].map((i) => (
                <Card key={i} className="p-8">
                  <div className="space-y-6">
                    <div>
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-10 w-24 mb-2" />
                      <Skeleton className="h-6 w-48" />
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5" />
                          <Skeleton className="h-6 flex-1" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section Loading */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <Skeleton className="h-12 w-80 mx-auto mb-12" />
            <div className="max-w-3xl mx-auto space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-8 w-full" />
                </Card>
              ))}
            </div>
          </div>
        </section>
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
