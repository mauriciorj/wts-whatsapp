import { UsageCharts } from "@/components/dashboard/usageCharts";
import GetUser from "@/actions/getUser/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import { PageTitle } from "@/components/dashboard/pageTitle";

export default async function DashboardPage() {
  const data = await GetUser();
  const userData = await GetUserProfile({ userId: data?.user?.id });
  return (
    <div className="space-y-8">
      <PageTitle userName={userData?.first_name} />
      <UsageCharts userId={userData?.user_id} />
    </div>
  );
}
