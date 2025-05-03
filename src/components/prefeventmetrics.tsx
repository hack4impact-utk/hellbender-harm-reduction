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

// component for bar chart that displays count of preferred event types across users
export default function PrefEventMetrics({ events }: PrefEventProps) {
  // prepares data for use in bar chart
  const dataset = [
    events.reduce(
      (acc, curr) => {
        acc[curr.type] = curr.count;
        return acc;
      },
      {} as Record<string, number>
    ),
  ];

  // each source becomes a separate series (1 bar per series)
  const series = events.map((item) => ({
    dataKey: item.type,
    label: item.type,
  }));

  // return actual bar chart
  return (
    <Box
      sx={{
        backgroundColor: '#f0f5ef',
        border: '2px solid',
        borderColor: '#42603c',
        borderRadius: '15px',
        height: '45%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <BarChart
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
        sx={{ height: '90%', width: '90%', paddingRight: '25px' }}
        slotProps={{
          legend: {
            position: {
              vertical: 'top',
              horizontal: 'center',
            },
            sx: {
              color: '#42603c',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              mt: 2,
            },
          },
        }}
      />
    </Box>
  );
}
