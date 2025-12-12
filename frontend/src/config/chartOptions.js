import {
    Users,
    Globe,
    TrendingUp,
    Percent,
    Timer
} from "lucide-react";

export const chartOptions = [
    {
        label: "Offers created per salesman",
        value: "offersPerSalesman",
        chart: "bar",
        icon: Users,
    },
    {
        label: "Offers per country",
        value: "offersPerCountry",
        chart: "bar",
        icon: Globe,
    },
    {
        label: "Total value of offers over time",
        value: "totalValueOverTime",
        chart: "line",
        icon: TrendingUp,
    },
    {
        label: "Conversion rate from offer to order",
        value: "conversionRate",
        chart: "line",
        icon: Percent,
    },
    {
        label: "Lead time analysis (from offer to acceptance)",
        value: "leadTimeAnalysis",
        chart: "line",
        icon: Timer,
    },
];
