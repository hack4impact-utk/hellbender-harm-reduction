'use client';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { mangoFusionPalette } from '@mui/x-charts';

interface Events {
  type: string;
  count: number;
}

interface PrefEventProps {
  events: Events[];
}

export default function PrefEventMetrics({ events }: PrefEventProps) {
  console.log(events);

  const dataset = [
    events.reduce(
      (acc, curr) => {
        acc[curr.type] = curr.count;
        return acc;
      },
      {} as Record<string, number>
    ),
  ];

  // Each source becomes a separate series (1 bar per series)
  const series = events.map((item) => ({
    dataKey: item.type,
    label: item.type,
  }));

  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ef',
        border: '2px solid',
        borderColor: '#42603c',
        borderRadius: '10px',
      }}
    >
      <BarChart
        height={300}
        dataset={dataset}
        layout="horizontal"
        series={series}
        yAxis={[
          {
            scaleType: 'band',
            data: ['Event Types'],
            tickLabelStyle: { display: 'none' },
          },
        ]}
        colors={mangoFusionPalette}
      />
    </Box>
  );
}
