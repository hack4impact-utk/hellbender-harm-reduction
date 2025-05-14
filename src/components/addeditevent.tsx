'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  Chip,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Add } from '@mui/icons-material';

interface Tag {
  _id: string;
  tagName: string;
}

interface Event {
  eventName: string;
  eventStart: string;
  eventEnd: string;
  eventDescription: string;
  eventType: string;
  eventRequirements?: string[];
  eventPreferences?: string[];
}

interface AEEventProps {
  open: boolean;
  onSubmit: (event: Event) => void;
  onCancel: () => void;
  tags: Tag[];
  event?: Event;
}

export function AddEditEvent({
  open,
  onSubmit,
  onCancel,
  tags,
  event,
}: AEEventProps) {
  // event types
  const types = [
    'Harm Reduction Services',
    'Syringe Pick-Up',
    'Community Education and Advocacy',
    'In-Kind Fundraising',
    'Building Work Days',
    'Fundraising',
    'Special Events',
  ];

  // values needed to save for event object
  const [eventName, setEventName] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStart, setEventStart] = useState<Dayjs | null>(null);
  const [eventEnd, setEventEnd] = useState<Dayjs | null>(null);

  // keeps track of selected requirements
  const [selectedRequirements, setSelectedRequirements] = useState<Tag[]>([]);
  const [selectedReqName, setSelectedReqName] = useState<string>('');

  // loads component with event info if you're editing an event
  useEffect(() => {
    if (event) {
      console.log(event.eventRequirements);
      setEventName(event.eventName);
      setEventType(event.eventType);
      setEventDescription(event.eventDescription);
      setEventStart(dayjs(event.eventStart));
      setEventEnd(dayjs(event.eventEnd));
      setSelectedRequirements(
        tags.filter((tag) => event.eventRequirements?.includes(tag._id))
      );
      setSelectedPreferences(
        tags.filter((tag) => event.eventPreferences?.includes(tag._id))
      );
    } else {
      setEventName('');
      setEventType('');
      setEventDescription('');
      setEventStart(null);
      setEventEnd(null);
      setSelectedRequirements([]);
      setSelectedPreferences([]);
    }
  }, [event, tags, open]);

  // function for adding a requirement
  const handleAddReq = () => {
    const tagToAdd = tags.find((tag) => tag.tagName === selectedReqName);
    if (
      tagToAdd &&
      !selectedRequirements.find((t) => t.tagName === tagToAdd.tagName)
    ) {
      setSelectedRequirements((prev) => [...prev, tagToAdd]);
    }
    setSelectedReqName('');
  };

  // function for deleting a requirement
  const handleReqDelete = (tagNameToDelete: string) => {
    setSelectedRequirements((prev) =>
      prev.filter((tag) => tag.tagName !== tagNameToDelete)
    );
  };

  // keeps track of preferred events
  const [selectedPreferences, setSelectedPreferences] = useState<Tag[]>([]);
  const [selectedPrefName, setSelectedPrefName] = useState<string>('');

  // function for adding preferred event
  const handleAddPref = () => {
    const tagToAdd = tags.find((tag) => tag.tagName === selectedPrefName);
    if (
      tagToAdd &&
      !selectedPreferences.find((t) => t.tagName === tagToAdd.tagName)
    ) {
      setSelectedPreferences((prev) => [...prev, tagToAdd]);
    }
    setSelectedPrefName('');
  };

  // function for deleting a preferred event
  const handlePrefDelete = (tagNameToDelete: string) => {
    setSelectedPreferences((prev) =>
      prev.filter((tag) => tag.tagName !== tagNameToDelete)
    );
  };

  // function that handles when the form/dialog is submitted
  const handleSubmit = () => {
    if (!eventName || !eventStart || !eventEnd || !eventType) return;

    const newEvent: Event = {
      eventName,
      eventType,
      eventStart: eventStart.toISOString(),
      eventEnd: eventEnd.toISOString(),
      eventDescription,
      eventRequirements: selectedRequirements.map((tag) => tag._id),
      eventPreferences: selectedPreferences.map((tag) => tag._id),
    };

    onSubmit(newEvent);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { backgroundColor: '#e2e7e2' } }}
    >
      <DialogTitle
        variant="h3"
        sx={{ padding: '25px', fontFamily: 'Verdana', color: '#42603c' }}
      >
        {event ? 'Edit Event' : 'Add Event'}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            backgroundColor: '#f0f5ef',
            padding: '25px',
            border: '2px solid',
            borderRadius: '5px',
            borderColor: '#42603c',
          }}
        >
          <Grid container direction="column" spacing={5}>
            <Grid item xs={1}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Event Name</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Event Type</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <Select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    >
                      {types.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Event Start</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Event End</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={eventStart}
                      onChange={(newStart) => {
                        if (!newStart) return;
                        setEventStart(newStart);

                        if (
                          eventEnd &&
                          (!newStart.isSame(eventEnd, 'day') ||
                            newStart.isAfter(eventEnd))
                        ) {
                          setEventEnd(newStart.add(1, 'hour'));
                        }
                      }}
                      slots={{ textField: TextField }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      value={eventEnd}
                      minDateTime={eventStart ?? undefined}
                      maxDateTime={eventStart?.endOf('day')}
                      onChange={(newEnd) => {
                        if (!newEnd || !eventStart) return;

                        if (
                          newEnd.isSame(eventStart, 'day') &&
                          newEnd.isAfter(eventStart)
                        ) {
                          setEventEnd(newEnd);
                        }
                      }}
                      slots={{ textField: TextField }}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography>Description</Typography>
              <TextField
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={5}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Event Requirements</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Event Preferences</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormControl
                      fullWidth
                      sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                    >
                      <Select
                        value={selectedReqName}
                        onChange={(e) => setSelectedReqName(e.target.value)}
                        input={<OutlinedInput />}
                        sx={{ flexGrow: 0.75 }}
                      >
                        {tags.map((tag) => (
                          <MenuItem key={tag.tagName} value={tag.tagName}>
                            {tag.tagName}
                          </MenuItem>
                        ))}
                      </Select>
                      <IconButton
                        onClick={handleAddReq}
                        disabled={!selectedReqName}
                        sx={{
                          backgroundColor: '#6e8569',
                          padding: '5px',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#5a6d57',
                          },
                          borderRadius: '50%',
                          width: '15%',
                        }}
                      >
                        <Add />
                      </IconButton>
                    </FormControl>
                    <Box
                      sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                      {selectedRequirements.map((tag) => (
                        <Chip
                          key={tag.tagName}
                          label={tag.tagName}
                          onDelete={() => handleReqDelete(tag.tagName)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <FormControl
                      fullWidth
                      sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                    >
                      <Select
                        value={selectedPrefName}
                        onChange={(e) => setSelectedPrefName(e.target.value)}
                        input={<OutlinedInput />}
                        sx={{ flexGrow: 1 }}
                      >
                        {tags.map((tag) => (
                          <MenuItem key={tag.tagName} value={tag.tagName}>
                            {tag.tagName}
                          </MenuItem>
                        ))}
                      </Select>
                      <IconButton
                        onClick={handleAddPref}
                        disabled={!selectedPrefName}
                        sx={{
                          backgroundColor: '#6e8569',
                          padding: '5px',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#5a6d57',
                          },
                          borderRadius: '50%',
                          width: '15%',
                        }}
                      >
                        <Add />
                      </IconButton>
                    </FormControl>
                    <Box
                      sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                      {selectedPreferences.map((tag) => (
                        <Chip
                          key={tag.tagName}
                          label={tag.tagName}
                          onDelete={() => handlePrefDelete(tag.tagName)}
                        />
                      ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '20px' }}>
        <Button onClick={onCancel} sx={{ color: '#42603c' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!eventName || !eventStart || !eventEnd || !eventType}
          sx={{ backgroundColor: '#42603c' }}
        >
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
