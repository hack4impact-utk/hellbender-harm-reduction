'use client';
import {
  Box,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface signUpProps {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm(props: signUpProps) {
  // const [name, setName] = useState(props.name);
  const [email, setEmail] = useState(props.email);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setPronouns(event.target.value as string);
  // };
  const [password, setPassword] = useState(props.password);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleNext = () => {};

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignSelf="center"
        alignItems="center"
        height="80%"
        width="80%"
        sx={{ marginTop: 5 }}
      >
        {/* Header */}
        <Box alignSelf="center" justifySelf="start">
          <Typography
            variant="h2"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Create an account
          </Typography>
        </Box>
        <Grid
          container
          direction="column"
          spacing={3}
          justifyContent="center"
          sx={{ flexGrow: 1, width: '100%' }} // Ensures content is centered and responsive
        >
          <Grid item>
            <TextField
              required
              label="Email"
              variant="filled"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                marginBottom: 1,
              }}
            />
          </Grid>
          <Grid item>
            <FormControl
              required
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="outlined-adornment-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              required
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
                marginBottom: 1,
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm Password
              </InputLabel>
              <FilledInput
                id="outlined-adornment-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{
                  backgroundColor: '#fff',
                }}
                type={showCPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showCPassword
                          ? 'hide the password'
                          : 'display the password'
                      }
                      onClick={handleClickShowCPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            {/* Next Button */}
            <Box sx={{ marginTop: 2, textAlign: 'right' }}>
              <IconButton aria-label="Next" size="large" onClick={handleNext}>
                <ArrowCircleRightOutlinedIcon
                  sx={{ fontSize: 65, color: 'white' }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        {/* Footer */}
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            marginTop: 'auto',
          }}
        >
          <Box
            component="img"
            src="https://i.imgur.com/meVm0JE.png"
            alt="Footer Image"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
          <Typography variant="body2" sx={{ fontSize: 20, marginTop: 4 }}>
            Have an account?{' '}
            <Link href="/" underline="hover" sx={{ color: '#F0F5EF' }}>
              Log-in here
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

{
  /* <Grid item xs={12} sm={12}>
            <TextField
              required
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="pronouns-select-label">Pronouns</InputLabel>
              <Select
                labelId="pronouns-select-label"
                value={pronouns}
                label="Pronouns"
                onChange={handleChange}
              >
                <MenuItem value={'She/Her'}>She/Her</MenuItem>
                <MenuItem value={'He/Him'}>He/Him</MenuItem>
                <MenuItem value={'They/Them'}>They/Them</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
                <MenuItem value={'Prefer Not to Answer'}>
                  Prefer Not to Answer
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid mt={12} item xs={12}>
            <TextField
              required
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Grid> */
}
