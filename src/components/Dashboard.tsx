import { useState, useMemo } from "react";
import { SchoolCard } from "./SchoolCard";
import { motion } from "framer-motion";

interface School {
  domains: string[];
  initial_count: number;
  feb_activations: number;
}

interface DashboardProps {
  data: Record<string, School>;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const sortedSchools = useMemo(() => {
    return Object.entries(data).sort(([, a], [, b]) => b.feb_activations - a.feb_activations);
  }, [data]);

  const totalFebActivations = useMemo(() => {
    return Object.values(data).reduce((sum, school) => sum + school.feb_activations, 0);
  }, [data]);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/50de9c24-ca29-4bc3-98e4-3563edae6ec4.png" 
            alt="Perplexity Logo" 
            className="h-16 object-contain"
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Perplexity Southwest February Growth
          </h1>
          <div className="stats-badge text-lg">
            Total Feb Activations: {totalFebActivations}
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {sortedSchools.map(([name, school]) => (
            <SchoolCard
              key={name}
              name={name}
              febActivations={school.feb_activations}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
