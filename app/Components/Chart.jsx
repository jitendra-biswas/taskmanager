"use client";

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
  
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;


  const groupedTasks = tasks.reduce((acc, task) => {
    const day = new Date(task.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!acc[day]) {
      acc[day] = {
        completed: 0,
        pending: 0,
      };
    }

    if (task.completed) {
      acc[day].completed += 1;
    } else {
      acc[day].pending += 1;
    }

    return acc;
  }, {});

  
  const data = Object.entries(groupedTasks).map(([day, values]) => ({
    day,
    completed: values.completed,
    pending: values.pending,
  }));

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-gray-200 p-5 shadow-sm mt-5">
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        

        <div className="w-full lg:w-2/3">
          {/* Header */}

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-zinc-800">
                Task Completion Trends
              </h2>

              <p className="mt-1 text-xs text-zinc-400">
                Task progress overview
              </p>
            </div>

            <span className="text-xs text-zinc-400">Last 7 Days</span>
          </div>

          {/* Chart */}

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >
                {/* Grid */}

                <CartesianGrid
                  strokeDasharray="2 4"
                  vertical={false}
                  stroke="#f1f1f1"
                />

                {/* X Axis */}

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

                {/* Y Axis */}

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  tick={{
                    fontSize: 11,
                    fill: "#9ca3af",
                  }}
                />

                {/* Tooltip */}

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
                  formatter={(value, name) => [value, name]}
                />

                {/* Gradient */}

                <defs>
                  <linearGradient id="taskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b8f68" stopOpacity={0.25} />

                    <stop offset="100%" stopColor="#6b8f68" stopOpacity={0} />
                  </linearGradient>
                </defs>

                {/* Completed Area */}

                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="none"
                  fill="url(#taskGradient)"
                />

                {/* Completed */}

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

                {/* Pending */}

                <Line
                  type="monotone"
                  dataKey="pending"
                  stroke="#d4a72c"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                  }}
                  name="Pending"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex gap-5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5f7f5b]" />
              <span className="text-zinc-500">
                Completed:{" "}
                <span className="font-semibold text-zinc-700">
                  {completedTasks}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a72c]" />
              <span className="text-zinc-500">
                Pending:{" "}
                <span className="font-semibold text-zinc-700">
                  {pendingTasks}
                </span>
              </span>
            </div>

            <div className="text-zinc-400">
              Total:{" "}
              <span className="font-semibold text-zinc-600">{totalTasks}</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <ProductivityChart tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
