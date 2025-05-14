'use client';
import {
  Box,
  Paper,
  Stack,
  styled,
  Typography,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';

// name, #, accoms
interface EmergencyInfoProps {
  id: string;
  ecName?: string;
  ecPhone?: string;
  accomm?: string[];
  otherAccomm?: string;
}

const accommodations = [
  'Accessible Parking',
  'Service Dogs Allowed',
  'Sensory Space',
  'Large Print',
  'Wheelchair Accessible',
  'Provided Seating',
  'No Heavy Lifting',
  'Flexible Breaks',
];

// Styling things
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#42603c',
  ...theme.typography.h6,
  textAlign: 'center',
  color: '#f0f5ef',
  borderRadius: '10px',
  padding: '10px',
}));

const boxStyle = {
  height: '8%',
  backgroundColor: '#42603c',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  paddingLeft: '10px',
};

// display, email, phone, and accomms based on array
export function EmergencyInfo(props: EmergencyInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(props.ecName || '');
  const [phone, setPhone] = useState(props.ecPhone || '');

  const [initialState, setInitialState] = useState({
    name: props.ecName || '',
    phone: props.ecPhone || '',
    selectedAccoms: [...(props.accomm || [])],
    otherAccomm: props.otherAccomm || '',
  });

  const [combinedAccommodations, setCombinedAccommodations] = useState<
    string[]
  >([
    ...(props.accomm || []),
    ...(props.otherAccomm ? [props.otherAccomm] : []),
  ]);
  const [selectedAccoms, setSelectedAccoms] = useState<string[]>(
    props.accomm || []
  );
  const [otherAccomm, setOtherAccomm] = useState(props.otherAccomm || '');
  const [accomSelect, setAccomSelect] = useState('');

  const handleEdit = () => {
    setInitialState({
      name,
      phone,
      selectedAccoms: [...selectedAccoms],
      otherAccomm,
    });
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setName(initialState.name);
    setPhone(initialState.phone);
    setSelectedAccoms(initialState.selectedAccoms);
    setOtherAccomm(initialState.otherAccomm);
    setCombinedAccommodations([
      ...initialState.selectedAccoms,
      ...(initialState.otherAccomm ? [initialState.otherAccomm] : []),
    ]);
  };

  const handleSubmit = async () => {
    try {
      await fetch(`/api/users/${props.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emergencyContacts: {
            ecName: name,
            ecPhone: phone,
          },
          accomm: selectedAccoms,
          otherAccomm,
        }),
      });
      setInitialState({
        name,
        phone,
        selectedAccoms: [...selectedAccoms],
        otherAccomm,
      });
      setCombinedAccommodations([
        ...selectedAccoms,
        ...(otherAccomm ? [otherAccomm] : []),
      ]);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', padding: '20px' }}>
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
                  backgroundColor: '#42603c',
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
                backgroundColor: '#42603c',
                color: '#f0f5ef',
                '&:hover': { backgroundColor: '#354d30' },
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
      <Stack
        spacing={2}
        sx={{ width: '95%', margin: '0 auto', padding: '10px' }}
      >
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
        >
          Emergency Contact Name
        </Typography>
        {editMode ? (
          <TextField
            value={name}
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: '#f0f5ef' } }}
            sx={{
              '& .MuiInputBase-input': {
                color: '#f0f5ef', // text color
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#42603c',
                '& fieldset': {
                  borderColor: '#f0f5ef',
                },
                '&:hover fieldset': {
                  borderColor: '#ffffff',
                },
              },
            }}
          />
        ) : (
          <Box sx={boxStyle}>
            <Typography
              fontFamily={'Verdana'}
              color="#f0f5ef"
              variant="h5"
              padding="4px"
            >
              {name || 'N/A'}
            </Typography>
          </Box>
        )}
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
        >
          Emergency Contact Phone Number
        </Typography>
        {editMode ? (
          <TextField
            value={phone}
            variant="outlined"
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            InputLabelProps={{ style: { color: '#f0f5ef' } }}
            sx={{
              '& .MuiInputBase-input': {
                color: '#f0f5ef', // text color
              },
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#42603c',
                '& fieldset': {
                  borderColor: '#f0f5ef',
                },
                '&:hover fieldset': {
                  borderColor: '#ffffff',
                },
              },
            }}
          />
        ) : (
          <Box sx={boxStyle}>
            <Typography
              fontFamily={'Verdana'}
              color="#f0f5ef"
              variant="h5"
              padding="4px"
            >
              {phone || 'N/A'}
            </Typography>
          </Box>
        )}
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
          paddingTop="30px"
        >
          Accommodations
        </Typography>
        {editMode ? (
          <Stack spacing={2}>
            <Select
              value={accomSelect}
              onChange={(e) => {
                const value = e.target.value;
                if (value && !selectedAccoms.includes(value)) {
                  setSelectedAccoms([...selectedAccoms, value]);
                }
                setAccomSelect('');
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
              <MenuItem value="">Select an accommodation</MenuItem>
              {accommodations.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedAccoms.map((accom, index) => (
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
                    {accom}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      setSelectedAccoms(
                        selectedAccoms.filter((_, i) => i !== index)
                      )
                    }
                    sx={{ color: '#f0f5ef' }}
                  >
                    ×
                  </IconButton>
                </Paper>
              ))}
            </Box>
            <Typography variant="body1" fontFamily={'Verdana'} color="#f0f5ef">
              Other Accommodation:
            </Typography>
            <TextField
              value={otherAccomm}
              variant="outlined"
              onChange={(e) => setOtherAccomm(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: '#f0f5ef' } }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#f0f5ef', // text color
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#42603c',
                  '& fieldset': {
                    borderColor: '#f0f5ef',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
          </Stack>
        ) : combinedAccommodations.length > 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2, // spacing between items
              width: '100%',
            }}
          >
            {combinedAccommodations.map((accom, i) => (
              <Box
                key={i}
                sx={{
                  flex: '1 1 calc(50% - 16px)', // 2 items per row with a 16px gap
                  minWidth: '250px', // optional: minimum width for smaller screens
                }}
              >
                <Item>{accom}</Item>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography
            fontFamily="Verdana"
            variant="h6"
            color="#f0f5ef"
            sx={{ mt: 1 }}
          >
            No Accommodations
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
