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
      className="school-card"
    >
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <div className="flex space-x-4 mb-4">
        <div className="stats-badge">
          Feb Activations: {newOnboards}
        </div>
        <div className="stats-badge">
          Initial Count: {initialCount}
        </div>
      </div>
      <div className="flex flex-wrap">
        {domains.map((domain) => (
          <span key={domain} className="domain-tag">
            {domain}
          </span>
        ))}
      </div>
    </motion.div>
  );
};