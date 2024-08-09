"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// fix this so that i don't get a next error with text-content not matching server-rendered html
const chartData = Array.from({ length: 90 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - 3 + i)
    return {
        date: date.toISOString().slice(0, 10),
        updates: Math.floor(Math.random() * 50),
        qualifications: Math.floor(Math.random() * 50),
    }
}) as { date: string; updates: number; qualifications: number }[];


const chartConfig = {
    views: {
        label: "Page Views",
    },
    updates: {
        label: "updates",
        color: "hsl(var(--chart-1))",
    },
    qualifications: {
        label: "qualifications",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

interface UserActivityChartProps {
    chartData: any;
};

const UserActivityChart = ({ chartData }: UserActivityChartProps) => {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("updates")

    const total = React.useMemo(
        () => ({
            updates: chartData.reduce((acc: any, curr: any) => acc + curr.updates, 0),
            qualifications: chartData.reduce((acc: any, curr: any) => acc + curr.qualifications, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Skills Activity</CardTitle>
                    <CardDescription>
                        Showing skills updates for the last 3 months
                    </CardDescription>
                </div>
                <div className="flex">
                    {["updates", "qualifications"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key as keyof typeof total].toLocaleString()}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default UserActivityChart;
