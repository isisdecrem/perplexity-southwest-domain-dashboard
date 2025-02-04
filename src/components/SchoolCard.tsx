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
      className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl border-l-4 border-perplexity-primary shadow-sm hover:shadow-lg transition-shadow"
    >
      <div className="flex justify-between items-center">
        {/* School Name */}
        <h3 className="text-xl font-bold text-perplexity-primary">
          {name}
        </h3>

        {/* Feb Activations */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            Activations
          </span>
          <span className="stats-badge text-2xl font-bold text-perplexity-secondary">
            {febActivations}
          </span>
        </div>
      </div>

      {/* Domains */}
      <div className="mt-4 flex flex-wrap gap-2">
        {domains.map((domain) => (
          <span
            key={domain}
            className="inline-flex items-center rounded-full bg-perplexity-secondary px-3 py-1 text-sm font-medium text-white"
          >
            {domain}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
