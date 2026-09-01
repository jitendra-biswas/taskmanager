"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import ProductivityChart from "./ProductivityChart";

const Chart = ({ tasks = [] }) => {
  const data = tasks.map((task) => ({
    day: new Date(task.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    completed: task.completed ? 1 : 0,
  }));

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm flex mt-5">
      
      <div className="w-full pr-10">
        {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-zinc-800">
          Task Completion Trends
        </h2>

        <span className="text-xs text-zinc-400">
          Last 7 Days
        </span>
      </div>

      {/* Chart */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="80%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            {/* Horizontal grid only */}
            <CartesianGrid
              strokeDasharray="2 4"
              vertical={false}
              stroke="#f1f1f1"
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
              tick={{
                fontSize: 11,
                fill: "#9ca3af",
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#e5e7eb",
                strokeWidth: 1,
              }}
              contentStyle={{
                border: "none",
                borderRadius: "10px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
              }}
            />

            {/* Area under line */}
            <defs>
              <linearGradient
                id="taskGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#6b8f68"
                  stopOpacity={0.25}
                />

                <stop
                  offset="100%"
                  stopColor="#6b8f68"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="completed"
              stroke="none"
              fill="url(#taskGradient)"
            />

            {/* Main line */}
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#5f7f5b"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
              }}
              name="Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      </div>
      <ProductivityChart tasks={tasks}/>
    </div>
  );
};

export default Chart;