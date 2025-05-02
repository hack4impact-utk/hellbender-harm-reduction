import {
  Stack,
  Chip,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  List,
  ListItem,
  ListItemText,
  Box,
  IconButton,
  Paper,
  Select,
  MenuItem,
  Button,
  TextField,
} from '@mui/material';

import HealingIcon from '@mui/icons-material/Healing';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Props
interface CustomReminder {
  daysPrior: number;
  time: string;
}

interface NotificationInfoProps {
  id: string;
  eventPreferences?: string[];
  newEvents?: string;
  reminders?: string[];
  custReminders?: CustomReminder[];
}

const types = [
  'Harm Reduction Services',
  'Syringe Pick-Up',
  'Community Education and Advocacy',
  'In-Kind Fundraising',
  'Building Work Days',
  'Fundraising',
  'Special Events',
];

const rems = [
  '30 Minutes Before',
  'Day Before',
  '2 Days Before',
  'A Week Before',
];

// Maps a specific phrase to an icon
const iconMap = {
  'Harm Reduction Services': <HealingIcon sx={{ color: '#f0f5ef' }} />,
  'Syringe Pick-Up': <VaccinesIcon sx={{ color: '#f0f5ef' }} />,
  'Community Education and Advocacy': (
    <HandshakeIcon sx={{ color: '#f0f5ef' }} />
  ),
  'In-Kind Fundraising': <AddBusinessIcon sx={{ color: '#f0f5ef' }} />,
  'Building Work Days': <HomeWorkIcon sx={{ color: '#f0f5ef' }} />,
  Fundraising: <AttachMoneyIcon sx={{ color: '#f0f5ef' }} />,
  'Special Events': <LocalActivityIcon sx={{ color: '#f0f5ef' }} />,
};

// Main function
export function NotificationInfo(props: NotificationInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [eventPreferences, setEventPreferences] = useState(
    props.eventPreferences || []
  );
  const [newEvents, setNewEvents] = useState(props.newEvents || '');
  const [reminders, setReminders] = useState(props.reminders || []);
  const [custReminders, setCustReminders] = useState(
    (props.custReminders || []).map((rem) => ({
      daysPrior: rem.daysPrior,
      time: typeof rem.time === 'string' ? rem.time : String(rem.time),
    }))
  );
  const [selectedReminders, setSelectedReminders] = useState<string[]>(
    props.reminders || []
  );
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    props.eventPreferences || []
  );
  const [prefSelect, setPrefSelect] = useState('');
  const [reminderSelect, setReminderSelect] = useState('');
  const [customDays, setCustomDays] = useState<number>(1);
  const [customTime, setCustomTime] = useState<Dayjs | null>(dayjs());

  const [initialState, setInitialState] = useState({
    eventPreferences: props.eventPreferences || [],
    newEvents: props.newEvents || '',
    reminders: props.reminders || [],
    custReminders: (props.custReminders || []).map((rem) => ({
      daysPrior: rem.daysPrior,
      time: typeof rem.time === 'string' ? rem.time : String(rem.time),
    })),
    selectedReminders: props.reminders || [],
    selectedPreferences: props.eventPreferences || [],
    prefSelect: '',
    reminderSelect: '',
    customDays: 1,
    customTime: dayjs() as Dayjs | null,
  });

  const handleEdit = () => {
    setInitialState({
      eventPreferences: [...eventPreferences],
      newEvents,
      reminders: [...reminders],
      custReminders: [...custReminders],
      selectedReminders: [...selectedReminders],
      selectedPreferences: [...selectedPreferences],
      prefSelect: '',
      reminderSelect: '',
      customDays: customDays,
      customTime: customTime,
    });
    setEditMode(true);
  };

  const handleSubmit = async () => {
    try {
      await fetch(`/api/users/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventPreferences: selectedPreferences,
          newEvents,
          reminders: selectedReminders,
          custReminders: custReminders.map((rem) => ({
            daysPrior: rem.daysPrior,
            time: rem.time,
          })),
        }),
      });

      setInitialState({
        eventPreferences: [...selectedPreferences],
        newEvents,
        reminders: [...selectedReminders],
        custReminders: [...custReminders],
        selectedReminders,
        selectedPreferences,
        prefSelect: '',
        reminderSelect: '',
        customDays,
        customTime,
      });

      // Reflect updates in local state
      setEventPreferences([...selectedPreferences]);
      setReminders([...selectedReminders]);
      setCustReminders([...custReminders]);

      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);

    // Reset values to the initial state captured when the user started editing
    setEventPreferences(initialState.eventPreferences);
    setNewEvents(initialState.newEvents);
    setReminders(initialState.reminders);
    setCustReminders(initialState.custReminders);
    setSelectedReminders(initialState.selectedReminders);
    setSelectedPreferences(initialState.selectedPreferences);
    setPrefSelect(initialState.prefSelect);
    setReminderSelect(initialState.reminderSelect);
    setCustomDays(initialState.customDays);
    setCustomTime(initialState.customTime);
  };

  return (
    <Box sx={{ position: 'relative', padding: '20px', height: '100%' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 15,
          right: 15,
          display: 'flex',
          gap: 1,
        }}
      >
        {editMode ? (
          <>
            <Button
              onClick={handleCancel}
              variant="outlined"
              sx={{
                borderColor: '#f0f5ef',
                color: '#f0f5ef',
                '&:hover': {
                  backgroundColor: '#5a7a50',
                  borderColor: '#f0f5ef',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: '#5a7a50',
                color: '#f0f5ef',
                '&:hover': { backgroundColor: '#6b8a60' },
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <IconButton
            onClick={handleEdit}
            sx={{
              color: '#f0f5ef',
              backgroundColor: '#42603c',
              '&:hover': { backgroundColor: '#5a7a50' },
            }}
          >
            <Edit />
          </IconButton>
        )}
      </Box>
      <Grid
        container
        direction="column"
        sx={{ height: '100%', padding: '25px' }}
      >
        <Grid item xs={5}>
          <Typography
            gutterBottom
            fontFamily="Verdana"
            fontWeight={'bold'}
            variant="h3"
            color="#f0f5ef"
          >
            Preferred Events
          </Typography>
          {editMode ? (
            <Stack spacing={2}>
              <Select
                value={prefSelect}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !selectedPreferences.includes(value)) {
                    setSelectedPreferences([...selectedPreferences, value]);
                  }
                  setPrefSelect('');
                }}
                displayEmpty
                fullWidth
                size="small"
                sx={{
                  color: '#f0f5ef',
                  backgroundColor: '#42603c',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f0f5ef',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f0f5ef',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f0f5ef',
                  },
                  '& .MuiSelect-icon': {
                    color: '#f0f5ef', // dropdown arrow icon
                  },
                }}
              >
                <MenuItem value="">Select a event type</MenuItem>
                {types.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedPreferences.map((pref, index) => (
                  <Paper
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#42603c',
                      padding: '2px 8px',
                      borderRadius: '16px',
                    }}
                  >
                    <Typography
                      sx={{ marginRight: 1, marginLeft: 1, color: '#f0f5ef' }}
                    >
                      {pref}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        setSelectedPreferences(
                          selectedPreferences.filter((_, i) => i !== index)
                        )
                      }
                      sx={{ color: '#f0f5ef' }}
                    >
                      ×
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
              {/*Displays all the preferred events for the user */}
              {eventPreferences.map((pref, index) => (
                <Chip
                  key={index}
                  // matches icon to label
                  icon={iconMap[pref as keyof typeof iconMap]}
                  label={pref}
                  sx={{
                    backgroundColor: '#42603c',
                    color: '#f0f5ef',
                    fontSize: '20px',
                    mb: 1,
                    padding: '20px',
                    '& .MuiChip-icon': {
                      color: '#f0f5ef !important',
                    },
                  }}
                />
              ))}
            </Stack>
          )}
        </Grid>
        <Grid item xs={7}>
          <Typography
            gutterBottom
            fontFamily="Verdana"
            fontWeight={'bold'}
            variant="h3"
            color="#f0f5ef"
          >
            Email Settings
          </Typography>
          <Grid container spacing={4} sx={{ height: '90%' }}>
            <Grid item xs={12} md={6} sx={{ height: '100%' }}>
              {/*Displays in disabled radio format, what option the user picked
              for event notifications */}
              <Box
                sx={{
                  backgroundColor: '#42603c',
                  borderRadius: '20px',
                  height: '85%',
                }}
              >
                <Box sx={{ padding: '20px', fontFamily: 'Verdana' }}>
                  <Typography
                    variant="h5"
                    fontFamily="Verdana"
                    color="#f0f5ef"
                    gutterBottom
                  >
                    New Event Notifications
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={newEvents}
                      onChange={(e) => setNewEvents(e.target.value)}
                      sx={{
                        '&.Mui-disabled': {
                          opacity: 1, // override MUI's default faded look
                        },
                        '& .MuiFormControlLabel-root': {
                          color: '#f0f5ef !important', // custom label color when disabled
                          fontVariant: 'h6 !important',
                        },
                        '& .MuiRadio-root': {
                          color: '#f0f5ef !important', // radio color when disabled
                          fontVariant: 'h6 !important',
                        },
                        '& .MuiSvgIcon-root': {
                          fill: '#f0f5ef', // circle color
                        },
                        '& .MuiFormControlLabel-label': {
                          fontVariant: 'h4',
                          fontFamily: 'Verdana',
                        },
                      }}
                    >
                      <FormControlLabel
                        value="All Events"
                        control={<Radio disabled={!editMode} />}
                        label={
                          <Typography variant="h6" color="#f0f5ef">
                            All Events
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="Preferred Events"
                        control={<Radio disabled={!editMode} />}
                        label={
                          <Typography variant="h6" color="#f0f5ef">
                            Preferred Events
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        value="None"
                        control={<Radio disabled={!editMode} />}
                        label={
                          <Typography variant="h6" color="#f0f5ef">
                            None
                          </Typography>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ height: '100%' }}>
              {/*This displays what the user picked for event reminder type they prefer */}
              <Box
                sx={{
                  backgroundColor: '#42603c',
                  borderRadius: '20px',
                  height: '85%',
                }}
              >
                {editMode ? (
                  <Box>
                    <Stack spacing={2}>
                      <Select
                        value={reminderSelect}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value && !selectedReminders.includes(value)) {
                            setSelectedReminders([...selectedReminders, value]);
                          }
                          setReminderSelect('');
                        }}
                        displayEmpty
                        fullWidth
                        size="small"
                        sx={{
                          color: '#f0f5ef',
                          backgroundColor: '#42603c',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f0f5ef',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f0f5ef',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#f0f5ef',
                          },
                          '& .MuiSelect-icon': {
                            color: '#f0f5ef', // dropdown arrow icon
                          },
                        }}
                      >
                        <MenuItem value="">Select a reminder</MenuItem>
                        {rems.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {selectedReminders.map((rem, index) => (
                          <Paper
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#42603c',
                              padding: '2px 8px',
                              borderRadius: '16px',
                            }}
                          >
                            <Typography
                              sx={{
                                marginRight: 1,
                                marginLeft: 1,
                                color: '#f0f5ef',
                              }}
                            >
                              {rem}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                setSelectedReminders(
                                  selectedReminders.filter(
                                    (_, i) => i !== index
                                  )
                                )
                              }
                              sx={{ color: '#f0f5ef' }}
                            >
                              ×
                            </IconButton>
                          </Paper>
                        ))}
                      </Box>
                      <Typography
                        variant="body1"
                        fontFamily={'Verdana'}
                        color="#f0f5ef"
                      >
                        Custom Reminder:
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                          label="Days Before"
                          type="number"
                          size="small"
                          value={customDays}
                          onChange={(e) =>
                            setCustomDays(Number(e.target.value))
                          }
                          sx={{
                            input: { color: '#f0f5ef' },
                            backgroundColor: '#42603c',
                          }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Time"
                            value={customTime}
                            onChange={(newValue) => setCustomTime(newValue)}
                            ampm
                            sx={{
                              '& .MuiInputBase-input': { color: '#f0f5ef' },
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: '#42603c',
                                '& fieldset': { borderColor: '#f0f5ef' },
                                '&:hover fieldset': { borderColor: '#ffffff' },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#ffffff',
                                },
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#f0f5ef',
                              },
                            }}
                            slotProps={{
                              textField: {
                                size: 'small',
                                fullWidth: false,
                              },
                            }}
                          />
                        </LocalizationProvider>
                        <Button
                          variant="contained"
                          onClick={() => {
                            if (customTime) {
                              const formattedTime = customTime.format('h:mm A');
                              const newReminder = {
                                daysPrior: customDays,
                                time: formattedTime,
                              };
                              setCustReminders([...custReminders, newReminder]); // ✅ only once
                            }
                          }}
                          sx={{
                            backgroundColor: '#5a7a50',
                            color: '#f0f5ef',
                            '&:hover': { backgroundColor: '#6b8a60' },
                          }}
                        >
                          Add
                        </Button>
                      </Stack>
                      <Box sx={{ mt: 2 }}>
                        {custReminders.map((rem, index) => (
                          <Paper
                            key={index}
                            sx={{
                              backgroundColor: '#42603c',
                              padding: '8px 12px',
                              borderRadius: '12px',
                              marginBottom: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography sx={{ color: '#f0f5ef' }}>
                              {rem.daysPrior} days before at {rem.time}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => {
                                const updated = custReminders.filter(
                                  (_, i) => i !== index
                                );
                                setCustReminders(updated); // ✅ Only call this once
                              }}
                              sx={{ color: '#f0f5ef' }}
                            >
                              ×
                            </IconButton>
                          </Paper>
                        ))}
                      </Box>
                    </Stack>
                  </Box>
                ) : (
                  <Box sx={{ padding: '20px', fontFamily: 'Verdana' }}>
                    <Typography
                      variant="h5"
                      fontFamily="Verdana"
                      color="#f0f5ef"
                      gutterBottom
                    >
                      Your Event Reminders
                    </Typography>
                    <List dense>
                      {reminders.map((reminder, index) => (
                        <ListItem key={`standard-${index}`} disablePadding>
                          <ListItemText
                            primary={
                              <Typography
                                variant="h6"
                                sx={{ color: '#f0f5ef', paddingLeft: '10px' }}
                              >
                                - {reminder}
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}

                      {Array.isArray(custReminders) &&
                        custReminders.map((rem, index) => (
                          <ListItem key={`custom-${index}`} disablePadding>
                            <ListItemText
                              primary={
                                <Typography
                                  variant="h6"
                                  sx={{ color: '#f0f5ef', paddingLeft: '10px' }}
                                >
                                  - {rem.daysPrior} days before at {rem.time}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
