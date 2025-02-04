import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";

const Index = () => {
  // Transform the data to include new_onboards
  const dashboardData = Object.entries(initialData).reduce((acc, [school, data]) => {
    acc[school] = {
      ...data,
      new_onboards: 0, // This would be updated with real data
    };
    return acc;
  }, {} as Record<string, any>);

  return <Dashboard data={dashboardData} />;
};

export default Index;