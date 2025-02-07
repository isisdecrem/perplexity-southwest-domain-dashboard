// File: src/lib/comparison.ts
import { initialData } from './data';

interface SchoolData {
  domains: string[];
  initial_count: number;
  feb_activations: number;
  [key: string]: any;
}

interface NewData {
  "Strategist Region": string;
  "Country": string;
  "US State": string;
  "School Name": string;
  "Email Domain": string;
  "Activations (BTS 2025 Spring)": string;
  "Queries (from BTS 2025 Spring Registrations)": string;
  "Queries": string;
}

const getSchoolByDomain = (emailDomain: string): string | null => {
  for (const school in initialData) {
    if (initialData[school].domains.some(domain => emailDomain.endsWith(domain))) {
      return school;
    }
  }
  return null;
};

export const compareData = (newData: NewData[]): Record<string, SchoolData> => {
  const changes = {};

  newData.forEach(item => {
    const school = getSchoolByDomain(item["Email Domain"]);
    if (school) {
      if (!changes[school]) {
        changes[school] = { ...initialData[school], feb_activations: 0 };
      }
      changes[school].feb_activations += parseInt(item["Activations (BTS 2025 Spring)"]) || 0;
    }
  });

  Object.keys(changes).forEach(school => {
    changes[school].feb_activations -= initialData[school].initial_count;
  });

  return changes;
};
