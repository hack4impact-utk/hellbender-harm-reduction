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
} from '@mui/material';

import HealingIcon from '@mui/icons-material/Healing';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

// Props
interface NotificationInfoProps {
  eventPreferences?: string[];
  newEvents?: string;
  reminders?: string[];
}

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
  return (
    // Styling for preferred events
    <Grid container direction="column" sx={{ height: '100%', padding: '25px' }}>
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
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
          {/*Displays all the preferred events for the user */}
          {props.eventPreferences?.map((pref, index) => (
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
        <Grid container spacing={4} sx={{ height: '100%' }}>
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
                    value={props.newEvents}
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
                      control={<Radio disabled />}
                      label={
                        <Typography variant="h6" color="#f0f5ef">
                          All Events
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="Preferred Events"
                      control={<Radio />}
                      label={
                        <Typography variant="h6" color="#f0f5ef">
                          Preferred Events
                        </Typography>
                      }
                      disabled
                    />
                    <FormControlLabel
                      value="None"
                      control={<Radio />}
                      label={
                        <Typography variant="h6" color="#f0f5ef">
                          None
                        </Typography>
                      }
                      disabled
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
                  {props.reminders?.map((reminder, index) => (
                    <ListItem key={index} disablePadding>
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
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
