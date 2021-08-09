import React, { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface IHistoryResponse {
  priceUsd: string;
  time: number;
  date: string;
}

interface IChart {
  data: IHistoryResponse[];
}

const Chart: FC<IChart> = ({ data }) => {
  return (
    <ResponsiveContainer height={260} width="100%">
      <LineChart width={100} height={260} data={data}>
        <CartesianGrid />
        <XAxis
          dataKey="name"
          height={60}
          axisLine={false}
          tickLine={false}
          tickMargin={20}
          tickCount={7}
        />
        <YAxis type="number" domain={['auto', 'auto']} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeWidth={4}
          activeDot={{ r: 6 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
