import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('ENE', 10),
  createData('FEBR', 10),
  createData('MAR', 15),
  createData('ABR', 16),
  createData('MAY', 17),
  createData('JUN', 17),
  createData('JUL', 20),
  createData('AGO', 22),
  createData('SET', 23),
  createData('OCT', 25),
  createData('NOV', 27),
  createData('DIC', 28),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Durante el Mes</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Impresiones (#)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}