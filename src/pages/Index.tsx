import React, { useEffect, useState } from 'react';
import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";
import todayData from "@/lib/data-today.json";
import { compareData } from "@/lib/comparison"; // Ensure this import is correct based on your project structure

const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const changes = compareData(todayData);
    const updatedData = Object.entries(initialData).reduce((acc, [school, data]) => {
      acc[school] = {
        ...data,
        feb_activations: changes[school]?.feb_activations || 0,
      };
      return acc;
    }, {} as Record<string, any>);
    setDashboardData(updatedData);
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return <Dashboard data={dashboardData} />;
};

export default Index;
