import { motion } from "framer-motion";

interface SchoolCardProps {
  name: string;
  domains: string[];
  initialCount: number;
  newOnboards: number;
}

export const SchoolCard = ({ name, domains, initialCount, newOnboards }: SchoolCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h3 className="text-lg font-semibold mb-2 md:mb-0">{name}</h3>
        <div className="flex flex-wrap gap-4">
          <div className="stats-badge">
            Feb Activations: {newOnboards}
          </div>
          <div className="stats-badge">
            Initial Count: {initialCount}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {domains.map((domain) => (
          <span key={domain} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {domain}
          </span>
        ))}
      </div>
    </motion.div>
  );
};