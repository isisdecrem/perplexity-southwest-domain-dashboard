import { motion } from "framer-motion";

interface SchoolCardProps {
  name: string;
  domains: string[];
  febActivations: number;
}

export const SchoolCard = ({ name, domains, febActivations }: SchoolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
      style={{
        backgroundColor: "#FBFAF4", // Paper White for card background
      }}
    >
      <div className="flex justify-between items-center">
        {/* School Name */}
        <h3 className="text-xl font-bold" style={{ color: "#13343B" }}>
          {name}
        </h3>
        {/* February Activations */}
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-wide" style={{ color: "#2E565E" }}>
            Activations
          </span>
          <span className="text-2xl font-bold" style={{ color: "#1FB8CD" }}>
            {febActivations}
          </span>
        </div>
      </div>
      {/* Domain Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        {domains.map((domain) => (
          <span
            key={domain}
            className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: "#20808D", // True Turquoise for domain pill background
              color: "#FBFAF4", // Paper White for text inside the pills
            }}
          >
            {domain}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

