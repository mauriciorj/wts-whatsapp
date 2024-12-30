"use client";

import { UsageChart } from "@/components/dashboard/usage-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Bem vindo, John</h1>
        <p className="text-muted-foreground mt-2">Seu Dashboard com as últimas informações</p>
      </div>

      <UsageChart />
      <RecentActivity />
    </div>
  );
}