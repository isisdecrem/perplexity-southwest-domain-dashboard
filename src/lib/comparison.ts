// File: src/lib/comparison.ts
import { initialData } from './data';

interface SchoolData {
  domains: string[];
  initial_count: number;
  [key: string]: any;
}

interface NewData {
  [key: string]: any;
}

const getSchoolByDomain = (email: string): string | null => {
  for (const school in initialData) {
    if (initialData[school].domains.some(domain => email.endsWith(domain))) {
      return school;
    }
  }
  return null;
};

export const compareData = (newData: NewData[]): any => {
  const changes = {};

  newData.forEach(item => {
    const school = getSchoolByDomain(item.email);
    if (school) {
      if (!changes[school]) {
        changes[school] = { ...initialData[school], new_count: 0 };
      }
      changes[school].new_count += 1;
    }
  });

  return changes;
};
