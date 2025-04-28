'use client';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { mangoFusionPalette } from '@mui/x-charts/colorPalettes';
import { EventTypeEnum } from '@/types/event';

interface events {
  event_years_start: number;
  event_types: Map<number, Map<EventTypeEnum, number>>;
  event_total: Map<number, number>;
}

// literally just takes in a number and presents it in a nice little box.
export function EventDistribution(_props: events) {
  const theme = useTheme();
  const [year, setYear] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  // Calculates the range of years.
  const startYear = _props.event_years_start;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, year_length) => startYear + year_length
  );

  // Gets data from the map and transforms it into divs
  const dataForPie = React.useMemo(() => {
    const typeMap = _props.event_types.get(Number(year));
    if (!typeMap) return [];

    return Array.from(typeMap.entries()).map(([etype, count], idx) => ({
      id: idx,
      value: count,
      label: etype,
      legendLabel: `${etype}: ${count}`,
    }));
  }, [_props.event_types, year]);

  // Gets total events count for the year
  const totalForYear = _props.event_total.get(Number(year)) ?? 0;

  return (
    <Box>
      {/* Header Typography */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          my: 2,
          flexWrap: 'nowrap',
        }}
      >
        <Typography
          variant="h6"
          noWrap
          sx={{
            flex: '0 1 auto',
            minWidth: 'fit-content',
            fontWeight: 'bold',
            pr: 1,
            color: 'text.primary',
          }}
        >
          Events in
        </Typography>
        <FormControl
          fullWidth
          sx={{ flex: '1 1 200px', maxWidth: { xs: '100%', sm: '300px' } }}
        >
          <InputLabel id="year-select-label">year</InputLabel>
          <Select
            labelId="year-simple-select-label"
            id="year-simple-select"
            value={year}
            label="Year to Display"
            onChange={handleChange}
          >
            {years.map((year_num) => (
              <MenuItem key={year_num} value={year_num}>
                {year_num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Total Events */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', mt: 2 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Total: {totalForYear}
        </Typography>
      </Box>

      {/* Pie chart */}
      <Box
        display="flex"
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
        sx={{ width: '100%', height: 400, my: 4 }}
      >
        <PieChart
          height={400}
          series={[
            {
              data: dataForPie,
              highlightScope: { highlight: 'item', fade: 'global' },
              highlighted: { additionalRadius: 8 },
              arcLabel: (item) => `${item.value}`,
            },
          ]}
          colors={mangoFusionPalette(theme.palette.mode)}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
              direction: 'horizontal',
              sx: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                '& .MuiChartsLegend-series': {
                  flexBasis: '100%',
                  maxWidth: '100% !important',
                },
                my: 1,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}
