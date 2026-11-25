
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import { salesData } from "../../data/dashboardData";

function SalesChart() {
  return (
    <div className="chart-container">
      <div className="section-heading">
        <div>
          <h3>Revenue Overview</h3>
          <p>Monthly revenue and expenses</p>
        </div>

        <span className="chart-period">Last 7 months</span>
      </div>

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="revenueColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expenseColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
            />

            <Legend />

            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#2563eb"
              fill="url(#revenueColor)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#14b8a6"
              fill="url(#expenseColor)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
