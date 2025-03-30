'use client';
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Checkbox,
  Chip,
  Box,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';

interface Custom {
  daysPrior: string;
  time: string;
}

interface AddLangProps {
  custReminders?: Custom[];
  reminders?: string[];
}

// can take in a users reminders and custom reminders
export function SetReminders({
  custReminders = [],
  reminders = [],
}: AddLangProps) {
  // list of preset reminder options
  const reminderOptions = [
    '30 Minutes Before',
    'Day Before',
    '2 Days Before',
    'A Week Before',
  ];

  // needed state values
  const [checked, setChecked] = useState(reminders);
  const [daysBefore, setDaysBefore] = useState('1');
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const [userCustoms, setUserCustoms] = useState<Custom[]>(custReminders);

  // handles when list checkboxes are toggled
  const handleToggle = (item: string) => () => {
    const newChecked = [...checked];
    const currentIndex = newChecked.indexOf(item);

    // If item is already checked, remove it; otherwise, add it
    if (currentIndex === -1) {
      newChecked.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // set checked value
    setChecked(newChecked);
  };

  // keeps updating
  useEffect(() => {
    setChecked(reminders);
  }, [reminders]);

  const handleFormSubmit = () => {
    // makes sure selectedTime isn't null
    if (selectedTime) {
      // Ensure that no tag with the same tagName and tagProf exists
      if (
        !userCustoms.some(
          (rem) =>
            rem.daysPrior === daysBefore &&
            rem.time === String(selectedTime.format('hh:mm a'))
        )
      ) {
        // Create a new custom reminder with days prior and time information
        const newCustom: Custom = {
          daysPrior: daysBefore,
          time: String(selectedTime.format('hh:mm a')),
        };

        // Correctly update the state by using the previous state
        setUserCustoms((prevUserCustoms) => [...prevUserCustoms, newCustom]);
      }
    }
    // Reset selected values after submission
    setDaysBefore('1'); // Reset selected language
    setSelectedTime(null); // Reset selected profession
  };

  // if you delete one of the languages at the bottom
  const handleChipDelete = (chipValue: string) => {
    setUserCustoms((prevUserCustoms) =>
      prevUserCustoms.filter(
        (rem) => `${rem?.daysPrior} Days Before At ${rem?.time}` !== chipValue
      )
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          //minHeight: '500px', // Minimum height when no item is selected
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">
          Want Reminders For Your Upcoming Events?
        </Typography>
        <List>
          {reminderOptions.map((item, index) => (
            <ListItemButton
              role={undefined}
              onClick={handleToggle(item)}
              dense
              key={index}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(item)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItemButton>
          ))}

          <Accordion>
            <AccordionSummary>
              <Typography>Custom Reminder</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction="row" spacing={2} alignItems={'center'}>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Want reminders
                </Typography>
                <TextField
                  variant="outlined"
                  type="number"
                  value={daysBefore}
                  onChange={(e) => setDaysBefore(e.target.value)}
                  sx={{
                    marginLeft: 2,
                    marginRight: 2,
                    maxWidth: 75,
                    alignItems: 'bottom',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ marginTop: 2, marginRight: 2 }}
                >
                  Days Before, At
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={selectedTime}
                    onChange={(newValue: Dayjs | null) =>
                      setSelectedTime(newValue)
                    }
                  />
                </LocalizationProvider>
              </Stack>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFormSubmit}
                disabled={!selectedTime || parseInt(daysBefore) < 0}
                sx={{ marginTop: 2 }}
              >
                Submit
              </Button>
            </AccordionDetails>
          </Accordion>
        </List>
      </Grid>

      <Grid item xs={12}>
        <Box mt={3}>
          <Typography variant="h6">Current Reminders:</Typography>
          <Box mt={1}>
            {checked.length > 0 ? (
              checked.map((item, index) => (
                <Chip key={index} label={`${item}`} sx={{ margin: '4px' }} />
              ))
            ) : (
              <Typography></Typography>
            )}
          </Box>
          <Box mt={1}>
            {userCustoms.length > 0 ? (
              userCustoms.map((item, index) => (
                <Chip
                  key={index}
                  label={`${item?.daysPrior} Days Before At ${item?.time}`}
                  onDelete={() =>
                    handleChipDelete(
                      `${item?.daysPrior} Days Before At ${item?.time}`
                    )
                  }
                  sx={{ margin: '4px' }}
                />
              ))
            ) : (
              <Typography></Typography>
            )}
          </Box>
          <Box mt={1}>
            {userCustoms.length <= 0 && checked.length <= 0 ? (
              <Typography>No Reminders Selected</Typography>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

/*
<Box mt={1}>
            {custReminders.length > 0 ? (
              custReminders.map((item, index) => (
                <Chip
                  key={index}
                  label={`${item?.daysPrior} Days Before at ${item?.time}`}
                  onDelete={() =>
                    handleChipDelete(`${item?.daysPrior} Days Before at ${item?.time}`)
                  }
                  sx={{ margin: '4px' }}
                />
              ))
            ) : (
              <Typography></Typography>
            )}
          </Box>
          */
