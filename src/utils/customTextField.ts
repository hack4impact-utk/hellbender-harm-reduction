import { TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export const UserInfoTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: 18,
  },
  '& .Mui-disabled': {
    'text-fill-color': alpha('#FFFFFF', 0.6),
  },
});

export const AccountInfoTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontSize: 20,
  },
  '& .Mui-disabled': {
    '-webkit-text-fill-color': alpha('#FFFFFF', 0.6),
  },
});
