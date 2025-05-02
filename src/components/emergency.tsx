'use client';
import {
  Box,
  Grid,
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
  'Blind',
  'Deaf',
];

// Styling things
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#42603c',
  ...theme.typography.h6,
  padding: '5px',
  textAlign: 'center',
  color: '#f0f5ef',
  borderRadius: '10px',
}));

const boxStyle = {
  height: '8%',
  backgroundColor: '#42603c',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '10px',
  paddingLeft: '10px',
};

const typoStyle = {
  fontFamily: 'Verdana',
  fontSize: '1.1rem',
  color: '#f0f5ef',
};

// display, email, phone, and accomms based on array
export function EmergencyInfo(props: EmergencyInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(props.ecName || '');
  const [phone, setPhone] = useState(props.ecPhone || '');
  const combinedAccommodations = [
    ...(props.accomm || []),
    ...(props.otherAccomm ? [props.otherAccomm] : []),
  ];
  const [selectedAccoms, setSelectedAccoms] = useState<string[]>(
    props.accomm || []
  );
  const [otherAccomm, setOtherAccomm] = useState(props.otherAccomm || '');
  const [accomSelect, setAccomSelect] = useState('');

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
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', padding: '20px' }}>
      <IconButton
        onClick={() => setEditMode(!editMode)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#f0f5ef',
          backgroundColor: '#42603c',
          '&:hover': { backgroundColor: '#5a7a50' },
        }}
      >
        <Edit />
      </IconButton>
      <Stack spacing={2} sx={{ height: '100%', padding: '20px' }}>
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
        >
          Name
        </Typography>
        {editMode ? (
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        ) : (
          <Box sx={boxStyle}>
            <Typography sx={typoStyle}>{name || 'N/A'}</Typography>
          </Box>
        )}
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
        >
          Phone Number
        </Typography>
        {editMode ? (
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
        ) : (
          <Box sx={boxStyle}>
            <Typography sx={typoStyle}>{phone || 'N/A'}</Typography>
          </Box>
        )}
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
              sx={{ backgroundColor: '#fff' }}
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
                    backgroundColor: '#8ca98c',
                    padding: '2px 8px',
                    borderRadius: '16px',
                  }}
                >
                  <Typography sx={{ marginRight: 1 }}>{accom}</Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      setSelectedAccoms(
                        selectedAccoms.filter((_, i) => i !== index)
                      )
                    }
                  >
                    ×
                  </IconButton>
                </Paper>
              ))}
            </Box>

            <TextField
              label="Other Accommodation"
              value={otherAccomm}
              onChange={(e) => setOtherAccomm(e.target.value)}
              fullWidth
              sx={{ backgroundColor: '#fff' }}
            />
          </Stack>
        ) : combinedAccommodations.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {combinedAccommodations.map((accom, i) => (
              <Grid item key={i} xs={12} sm={6} md={6}>
                <Item>{accom}</Item>
              </Grid>
            ))}
          </Grid>
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
        {editMode && (
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ alignSelf: 'center' }}
          >
            Submit
          </Button>
        )}
      </Stack>
    </Box>
  );
}
