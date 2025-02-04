import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";
import { calculateNewOnboards } from "@/lib/daily-counts";

const Index = () => {
  // Transform the data to include new_onboards
  const dashboardData = Object.entries(initialData).reduce((acc, [school, data]) => {
    acc[school] = {
      ...data,
      new_onboards: calculateNewOnboards(school, data.initial_count),
    };
    return acc;
  }, {} as Record<string, any>);

  return <Dashboard data={dashboardData} />;
};

export default Index;