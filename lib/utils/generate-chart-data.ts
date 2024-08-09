// utils/generateChartData.ts
export const generateChartData = () => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);

    return Array.from({ length: 90 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        return {
            date: date.toISOString().slice(0, 10),
            updates: Math.floor(Math.random() * 50),
            qualifications: Math.floor(Math.random() * 50),
        };
    }) as { date: string; updates: number; qualifications: number }[];
};