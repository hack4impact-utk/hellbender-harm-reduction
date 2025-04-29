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

// component for a bar chart that shows the count of referral sources across users
export default function ReferralInfo({ referrals }: ReferralInfoProps) {
  // formats info for use in bar chart
  const dataset = [
    referrals.reduce(
      (acc, curr) => {
        acc[curr.source] = curr.count;
        return acc;
      },
      {} as Record<string, number>
    ),
  ];

  // each source becomes a separate series (1 bar per series)
  const series = referrals.map((item) => ({
    dataKey: item.source,
    label: item.source,
  }));

  // returns actual bar chart
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
      }}
    >
      <BarChart
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
        sx={{ height: '90%', width: '90%', paddingRight: '20px' }}
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
