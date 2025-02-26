// File: src/lib/daily-counts.ts

interface DailyCounts {
  [date: string]: {
    [school: string]: number;
  };
}

export const dailyCounts: DailyCounts = {
  "2024-02-29": {
    "Arizona State University": 45,
    "Baylor University": 8,
    "New Mexico State University": 1,
    "Rice University": 5,
    "Southern Methodist University": 2,
    "Texas A&M University": 30,
    "Texas Tech University": 3,
    "Texas Woman's University": 1,
    "University of Arizona": 12,
    "University of Houston": 4,
    "University of New Mexico": 1,
    "University of Texas at Arlington": 2,
    "University of Texas at Austin": 55,
    "University of Texas at Dallas": 15,
    "University of Texas Rio Grande Valley": 1,
    "University of North Texas": 3,
    "Texas Christian University": 1
  }
} as const;

// Helper function to calculate new onboards
export const calculateNewOnboards = (schoolName: string, initialCount: number) => {
  const latestDate = Object.keys(dailyCounts).sort().pop();
  if (!latestDate) return 0;

  const currentCount = dailyCounts[latestDate][schoolName as keyof typeof dailyCounts[typeof latestDate]] || 0;
  return Math.max(0, currentCount - initialCount);
};
