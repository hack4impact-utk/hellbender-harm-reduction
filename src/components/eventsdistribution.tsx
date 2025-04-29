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
  const currentYear = new Date().getFullYear();
  const [year, setYear] = React.useState(currentYear.toString()); // sets default year as current year

  // handles when a year is selected
  const handleChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  // Calculates the range of years.
  const startYear = _props.event_years_start;
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
    <Box
      sx={{
        backgroundColor: '#f0f5ef',
        border: '2px solid',
        borderColor: '#42603c',
        borderRadius: '15px',
        height: '100%',
      }}
    >
      {/* Header Typography */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          my: 2,
          width: '95%',
        }}
      >
        <Typography
          noWrap
          sx={{
            fontWeight: 'bold',
            fontSize: '30px',
            pr: 2,
            color: '#42603c',
          }}
        >
          Events in
        </Typography>
        <FormControl
          sx={{
            width: '20%',
          }}
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
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          color: '#42603c',
          paddingTop: '15px',
          paddingBottom: '5px',
        }}
      >
        Total: {totalForYear}
      </Typography>

      {/* Pie chart */}
      <Box
        display="flex"
        flexDirection="column"
        justifyItems="center"
        alignItems="center"
        sx={{ width: '100%', height: '70%' }}
      >
        <PieChart
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
                paddingTop: '15px',
                alignItems: 'flex-start',
                color: '#42603c',
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
