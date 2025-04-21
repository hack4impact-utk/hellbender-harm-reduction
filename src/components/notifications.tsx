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
  Paper,
  Box,
} from '@mui/material';

import HealingIcon from '@mui/icons-material/Healing';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

interface NotificationInfoProps {
  eventPreferences?: string[];
  newEvents?: string;
  reminders?: string[];
}

const iconMap = {
  'Harm Reduction Services': <HealingIcon />,
  'Syringe Pick-Up': <VaccinesIcon />,
  'Community Education and Advocacy': <HandshakeIcon />,
  'In-Kind Fundraising': <AddBusinessIcon />,
  'Building Work Days': <HomeWorkIcon />,
  Fundraising: <AttachMoneyIcon />,
  'Special Events': <LocalActivityIcon />,
};

export function NotificationInfo(props: NotificationInfoProps) {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ backgroundColor: 'hhr.light', p: 4, borderRadius: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: 'hhr.dark' }}
          gutterBottom
        >
          Preferred Events
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
          {props.eventPreferences?.map((pref, index) => (
            <Chip
              key={index}
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
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Email Settings
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                New Event Notifications
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup value={props.newEvents}>
                  <FormControlLabel
                    value="All Events"
                    control={<Radio disabled />}
                    label="All Events"
                  />
                  <FormControlLabel
                    value="Preferred Events"
                    control={<Radio disabled />}
                    label="Preferred Events"
                  />
                  <FormControlLabel
                    value="None"
                    control={<Radio disabled />}
                    label="None"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
