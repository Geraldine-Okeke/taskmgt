import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

function ProgressChart({ progress }) {
  const data = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress },
  ];

  const colors = ['#36A2EB', '#FF6384'];

  return (
    <PieChart width={100} height={100}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        outerRadius={40}
        innerRadius={30}
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default ProgressChart;
