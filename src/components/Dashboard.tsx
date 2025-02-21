import { useMemo } from "react";
import { SchoolCard } from "./SchoolCard";
import { motion } from "framer-motion";

interface School {
  domains: string[];
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
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Header Section */}
      <div className="py-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">
          <img
            src="/lovable-uploads/50de9c24-ca29-4bc3-98e4-3563edae6ec4.png"
            alt="Perplexity Logo"
            className="h-12 object-contain mb-2"
          />
          <h1 className="text-3xl font-bold mb-1" style={{ color: "#13343B" }}>
            Perplexity Southwest February Growth
          </h1>
          <div className="text-lg font-semibold" style={{ color: "#13343B" }}>
            Total Feb Activations: {totalFebActivations}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Last updated 2.21
          </div>
        </div>
      </div>

      {/* School Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto p-4 space-y-4"
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
