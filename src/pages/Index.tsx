import React, { useState } from 'react';
import { Dashboard } from "@/components/Dashboard";
import { initialData } from "@/lib/data";
import { handleFileUpload } from "@/lib/uploadHandler";

const Index = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const changes = await handleFileUpload(file);
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
    }
  };

  if (!dashboardData) {
    return (
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
    );
  }

  return <Dashboard data={dashboardData} />;
};

export default Index;
