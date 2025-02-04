// File: src/lib/comparison.ts
import { initialData } from './data';

interface SchoolData {
  domains: string[];
  initial_count: number;
  new_onboards: number;
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
        changes[school] = { ...initialData[school], new_onboards: 0 };
      }
      changes[school].new_onboards += parseInt(item["Activations (BTS 2025 Spring)"]) || 0;
    }
  });

  return changes;
};
