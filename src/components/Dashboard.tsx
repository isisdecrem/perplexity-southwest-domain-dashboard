import { useMemo } from "react";
import { SchoolCard } from "./SchoolCard";
import { motion } from "framer-motion";

interface School {
  domains: string[];
  // new_onboards: number; // Removed since we're no longer displaying onboards
  feb_activations: number;
}

interface DashboardProps {
  data: Record<string, School>;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const sortedSchools = useMemo(() => {
    return Object.entries(data).sort(
      ([, a], [, b]) => b.feb_activations - a.feb_activations
    );
  }, [data]);

  const totalFebActivations = useMemo(() => {
    return Object.values(data).reduce(
      (sum, school) => sum + school.feb_activations,
      0
    );
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero/Header Section */}
      <div className="bg-perplexity-primary py-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <img
            src="/lovable-uploads/50de9c24-ca29-4bc3-98e4-3563edae6ec4.png"
            alt="Perplexity Logo"
            className="h-16 object-contain mb-4"
          />
          <h1 className="text-5xl font-extrabold text-white mb-2">
            Perplexity Southwest February Growth
          </h1>
          <div className="stats-badge text-xl font-bold text-white">
            Total Feb Activations: {totalFebActivations}
          </div>
        </div>
      </div>

      {/* School Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-8 space-y-6"
      >
        {sortedSchools.map(([name, school]) => (
          <SchoolCard
            key={name}
            name={name}
            domains={school.domains}
            febActivations={school.feb_activations}
          />
        ))}
      </motion.div>
    </div>
  );
};
