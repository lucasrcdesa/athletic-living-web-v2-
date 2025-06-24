import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    mes: "Jan",
    mensalidades: 8000,
    avulsas: 2500,
    loja: 1500,
  },
  {
    mes: "Fev",
    mensalidades: 8500,
    avulsas: 3000,
    loja: 1000,
  },
  {
    mes: "Mar",
    mensalidades: 9000,
    avulsas: 3200,
    loja: 1000,
  },
  {
    mes: "Abr",
    mensalidades: 8300,
    avulsas: 2700,
    loja: 1500,
  },
];

const FinanceByCategoryBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]}
          labelStyle={{ color: "#002c5f" }}
        />
        <Legend />
        <Bar dataKey="mensalidades" stackId="a" fill="#002c5f" />
        <Bar dataKey="avulsas" stackId="a" fill="#d36d00" />
        <Bar dataKey="loja" stackId="a" fill="#5e3c00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinanceByCategoryBarChart;
