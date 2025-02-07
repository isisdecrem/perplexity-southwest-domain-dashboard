
import React, { useEffect, useState } from 'react';
import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";
import todayData from "@/lib/data-today.json";
import { compareData, SchoolData } from "@/lib/comparison";

interface IndexProps {
  changes?: Record<string, SchoolData>;
}

const Index = ({ changes }: IndexProps) => {
  const [dashboardData, setDashboardData] = useState<Record<string, SchoolData> | null>(null);

  useEffect(() => {
    const computedChanges = changes || compareData(todayData);
    const updatedData = Object.entries(initialData).reduce((acc, [school, data]) => {
      acc[school] = {
        ...data,
        feb_activations: computedChanges[school]?.feb_activations || 0,
      };
      return acc;
    }, {} as Record<string, SchoolData>);
    setDashboardData(updatedData);
  }, [changes]);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return <Dashboard data={dashboardData} />;
};

export default Index;
