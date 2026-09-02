"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const ProductivityChart = ({ tasks = [] }) => {

  // Calculate completed tasks
  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  // Calculate total tasks
  const total = tasks.length;

  // Calculate percentage
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  const remaining = 100 - percentage;

  const data = [
    {
      name: "Completed",
      value: percentage,
    },
    {
      name: "Remaining",
      value: remaining,
    },
  ];

  return (
    <div className="w-[27vw] rounded-2xl border border-zinc-200 bg-gray-200 p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-800">
            Overall Productivity
          </h2>

          <p className="text-xs text-zinc-400 mt-1">
            Your task completion rate
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative h-[270px] w-full">

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={72}
              outerRadius={88}
              paddingAngle={0}
              cornerRadius={18}
              stroke="none"
            >
              <Cell fill="#f59e0b" />
              <Cell fill="#edf2f7" />
            </Pie>

          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

          <span className="text-4xl font-bold tracking-tight text-zinc-800">
            {percentage}%
          </span>

          <span className="text-sm text-zinc-400 mt-1">
            completion
          </span>

        </div>

      </div>

      {/* Bottom Information */}
      <div className="flex items-center justify-center gap-6 -mt-2">

        {/* Completed */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />

          <span className="text-sm text-zinc-500">
            {completed} Completed
          </span>
        </div>

        {/* Remaining */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />

          <span className="text-sm text-zinc-500">
            {total - completed} Remaining
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProductivityChart;