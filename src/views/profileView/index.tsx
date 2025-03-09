'use client';
import { AccountInfo } from '@/components/accountinfo';
import NavBar from '@/components/navbar';
import { UserInfo } from '@/components/userinfo';
import hhrColors from '@/utils/hhr-theme';
import { Box, Grid, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface profileProps {
  profilePicture: string;
  name: string;
  pronouns: string;
  email: string;
  phone: string;
}

export default function ProfileView(props: profileProps) {
  return (
    <Box>
      {/* Top Navigation Bar */}
      <NavBar></NavBar>
      <Box display="flex" justifyContent="center">
        <Grid
          container
          spacing={3}
          sx={{ mt: 3 }}
          width="100%"
          maxWidth="1400px"
        >
          {/* Profile Section (Left Side) */}
          <Grid item xs={12} md={3}>
            <Box
              padding={3}
              borderRadius={2}
              sx={{
                backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
              }}
            >
              <UserInfo
                profilePicture={props.profilePicture}
                name={props.name}
                pronouns={props.pronouns}
              ></UserInfo>
            </Box>
          </Grid>

          {/* Welcome & Account Information (Right Side) */}
          <Grid item xs={12} md={9}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Thank You for Volunteering {props.name}!
            </Typography>
            <Box
              padding={3}
              borderRadius={2}
              sx={{
                backgroundColor: alpha(hhrColors.palette.hhr.main, 0.75),
              }}
            >
              <AccountInfo
                email={props.email}
                phone={props.phone}
              ></AccountInfo>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
