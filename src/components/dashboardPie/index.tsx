import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Treinos", value: 400 },
  { name: "Colaboradores", value: 300 },
  { name: "Financeiro", value: 300 },
  { name: "Alunos", value: 200 },
];

// Cores que combinam com o tema da aplicação
const COLORS = [
  "#002c5f", // blue-primary
  "#0050ab", // blue-secondary
  "#d36d00", // orange-1
  "#5e3c00", // brown
];

const DashboardPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [value, name]}
          labelStyle={{ color: "#002c5f" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
