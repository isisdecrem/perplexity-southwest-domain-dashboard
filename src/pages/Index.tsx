import React, { useEffect, useState } from 'react';
import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";
import { handleFileUpload } from "@/lib/uploadHandler";

const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const changes = await handleFileUpload('path/to/uploaded/file.json'); // Update with actual file path
        const updatedData = Object.entries(initialData).reduce((acc, [school, data]) => {
          acc[school] = {
            ...data,
            new_onboards: changes[school]?.new_count || 0,
          };
          return acc;
        }, {} as Record<string, any>);
        setDashboardData(updatedData);
      } catch (error) {
        console.error("Error processing file upload:", error);
      }
    };

    fetchChanges();
  }, []);

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return <Dashboard data={dashboardData} />;
};

export default Index;
