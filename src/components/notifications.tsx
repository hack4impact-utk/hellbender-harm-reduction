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
  Container,
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
  'Harm Reduction Services': <HealingIcon />,
  'Syringe Pick-Up': <VaccinesIcon />,
  'Community Education and Advocacy': <HandshakeIcon />,
  'In-Kind Fundraising': <AddBusinessIcon />,
  'Building Work Days': <HomeWorkIcon />,
  'Fundraising': <AttachMoneyIcon />,
  'Special Events': <LocalActivityIcon />,
};

// Main function
export function NotificationInfo(props: NotificationInfoProps) {
  return (
    // Styling for preferred events
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ backgroundColor: 'hhr.light', p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
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
                backgroundColor: 'hhr.light',
                color: 'text.primary',
                border: '1px solid',
                borderColor: 'hhr.dark',
                fontWeight: 500,
                mb: 1,
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Email Settings
            </Typography>
            {/*Displays in disabled radio format, what option the user picked
              for event notifications */}
            <Typography variant="subtitle1" gutterBottom>
              New Event Notifications
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup value={props.newEvents}>
                <FormControlLabel
                  value='All Events'
                  control={<Radio disabled />}
                  label='All Events'
                />
                <FormControlLabel
                  value='Preferred Events'
                  control={<Radio disabled />}
                  label='Preferred Events'
                />
                <FormControlLabel
                  value='None'
                  control={<Radio disabled />}
                  label='None'
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            {/*This displays what the user picked for event reminder type they prefer */}
            <Typography variant="h6" gutterBottom>
              Your Event Reminders
            </Typography>
            <List dense>
              {props.reminders?.map((reminder, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ color: 'text.primary' }}
                      >
                        {reminder}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
