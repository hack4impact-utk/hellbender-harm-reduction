'use client';
import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { mangoFusionPalette } from '@mui/x-charts';

interface Referrals {
  source: string;
  count: number;
}

interface ReferralInfoProps {
  referrals: Referrals[];
}

export default function ReferralInfo({ referrals }: ReferralInfoProps) {
  console.log(referrals);

  const dataset = [
    referrals.reduce(
      (acc, curr) => {
        acc[curr.source] = curr.count;
        return acc;
      },
      {} as Record<string, number>
    ),
  ];

  // Each source becomes a separate series (1 bar per series)
  const series = referrals.map((item) => ({
    dataKey: item.source,
    label: item.source,
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
            data: ['Referrals'],
            tickLabelStyle: { display: 'none' },
          },
        ]}
        colors={mangoFusionPalette}
      />
    </Box>
  );
}
