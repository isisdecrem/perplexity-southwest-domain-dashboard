import { useState, useMemo } from "react";
import { SchoolCard } from "./SchoolCard";
import { motion } from "framer-motion";

interface School {
  domains: string[];
  initial_count: number;
  new_onboards: number;
}

interface DashboardProps {
  data: Record<string, School>;
}

export const Dashboard = ({ data }: DashboardProps) => {
  const [sortBy, setSortBy] = useState<"new" | "total">("new");

  const sortedSchools = useMemo(() => {
    return Object.entries(data).sort(([, a], [, b]) => {
      if (sortBy === "new") {
        return b.new_onboards - a.new_onboards;
      }
      return (b.initial_count + b.new_onboards) - (a.initial_count + a.new_onboards);
    });
  }, [data, sortBy]);

  const totalNewOnboards = useMemo(() => {
    return Object.values(data).reduce((sum, school) => sum + school.new_onboards, 0);
  }, [data]);

  const totalInitial = useMemo(() => {
    return Object.values(data).reduce((sum, school) => sum + school.initial_count, 0);
  }, [data]);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto" // Changed from max-w-7xl to max-w-4xl for better single-column layout
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Perplexity Southwest February Growth
          </h1>
          <div className="flex justify-center space-x-8">
            <div className="stats-badge text-lg">
              Total Feb Activations: {totalNewOnboards}
            </div>
            <div className="stats-badge text-lg">
              Total Initial: {totalInitial}
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-end">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button
              onClick={() => setSortBy("new")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                sortBy === "new"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Sort by Feb Activations
            </button>
            <button
              onClick={() => setSortBy("total")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                sortBy === "total"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              Sort by Total
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-4"> {/* Changed from grid to flex column */}
          {sortedSchools.map(([name, school], index) => (
            <SchoolCard
              key={name}
              name={name}
              domains={school.domains}
              initialCount={school.initial_count}
              newOnboards={school.new_onboards}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};