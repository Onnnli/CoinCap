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
import { Button, ButtonGroup } from 'react-bootstrap';

const Chart: FC<any> = ({ data, changeInterval }) => {
  return (
    <>
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

      <ButtonGroup className="me-2" aria-label="First group">
        <Button variant="secondary" onClick={() => changeInterval('m1')}>
          1min
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('m5')}>
          5min
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('m15')}>
          15min
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('m30')}>
          30min
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('h1')}>
          1hr
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('h2')}>
          2hr
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('h6')}>
          6hr
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('h12')}>
          22hr
        </Button>
        <Button variant="secondary" onClick={() => changeInterval('d1')}>
          1day
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Chart;
