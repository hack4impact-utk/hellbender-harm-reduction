import {
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { Avatar, Stack, Box } from '@mui/material';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';

interface userInfoProps {
  id: string;
  profilePicture: string;
  name: string;
  pronouns: string;
}

const boxStyle = {
  height: '12%',
  width: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#42603c',
  borderRadius: '10px',
};

const typographyStyle = {
  fontSize: '25px',
  fontFamily: 'Verdana',
  color: '#f0f5ef',
};

const textFieldStyle = {
  input: { color: '#f0f5ef' },
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#42603c',
    '& fieldset': {
      borderColor: '#f0f5ef',
    },
    '&:hover fieldset': {
      borderColor: '#ffffff',
    },
  },
};

// Uses a stack for natural vertical formatting
// The id attribute for the TextFields can be changed to better fit our style
// Remove the disabled attribute when it's time to allow the fields to be edited
export function UserInfo(props: userInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(props.name);
  const [pronouns, setPronouns] = useState(props.pronouns);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/users/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          pronouns,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <IconButton
        onClick={() => setEditMode(!editMode)}
        sx={{
          position: 'absolute',
          right: 15,
          color: '#f0f5ef',
          backgroundColor: '#42603c',
          '&:hover': {
            backgroundColor: '#5a7a50',
          },
        }}
      >
        <Edit />
      </IconButton>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={props.name}
          src={props.profilePicture}
          sx={{
            width: '60%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
        <Box
          sx={{
            boxStyle,
          }}
        >
          {editMode ? (
            <TextField
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size="small"
              sx={textFieldStyle}
            />
          ) : (
            <Typography height="10%" sx={typographyStyle}>
              {props.name}
            </Typography>
          )}
        </Box>
        <Box sx={boxStyle}>
          {editMode ? (
            <Select
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              displayEmpty
              fullWidth
              size="small"
              sx={{
                ...textFieldStyle,
                backgroundColor: '#42603c',
                color: '#f0f5ef',
                '& .MuiSelect-icon': { color: '#f0f5ef' },
              }}
            >
              {[
                'he/him',
                'she/her',
                'they/them',
                'not listed',
                'chose not to answer',
              ].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography sx={typographyStyle}>{props.pronouns}</Typography>
          )}
        </Box>
        <Box>
          {editMode && (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ alignSelf: 'center', backgroundColor: '#42603c' }}
            >
              Submit
            </Button>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
