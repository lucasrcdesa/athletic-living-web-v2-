import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Jan", receita: 12000 },
  { mes: "Fev", receita: 13500 },
  { mes: "Mar", receita: 14200 },
  { mes: "Abr", receita: 12500 },
  { mes: "Mai", receita: 15000 },
  { mes: "Jun", receita: 13800 },
];

const FinanceTotalBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`R$ ${value.toLocaleString()}`, "Receita"]}
          labelStyle={{ color: "#002c5f" }}
        />
        <Bar dataKey="receita" fill="#002c5f" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinanceTotalBarChart;
