'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { TextField, Stack, Typography, Grid, Box } from '@mui/material';

interface Tag {
  tagName: string;
  certification: boolean;
}

// enum tagProfEnum {   // according to the schema there is an enum, but what we actually have in the database is a string
//   "Beginner",
//   "Intermediate", 
//   "Expert",
//   "N/A",
// }

interface userTag {
  tag: Tag;
  tagProf: "Beginner" | "Intermediate" | "Expert" | "N/A";  // Not an enum but a union of possible strings (goes against schema)
}

interface AccountInfoProps {
  email: string;
  phone: string;
  tags:  userTag[];
}

export function AccountInfo(props: AccountInfoProps) {
  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h5"> Email </Typography>
        <TextField disabled defaultValue={props.email} />
        <Typography variant="h5"> Phone Number </Typography>
        <TextField disabled defaultValue={props.phone} />
        
        <Grid container spacing={2}>
          {props.tags.map((userTag) => {
            return (
              <Grid item xs={6} key={userTag.tag.tagName}>
                <Box>
                  <Typography variant="h6" align="center"> {userTag.tag.tagName}: {userTag.tagProf} </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </div>
  );
}
