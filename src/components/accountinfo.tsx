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
  tags: userTag[];
}

export function AccountInfo(props: AccountInfoProps) {
  const normalTags = props.tags;
  const priorityTags: userTag[] = [];
  for (let i = 0; i < normalTags.length; i++) {
    if (normalTags[i].tag.tagName === "Hellbender Harm Reduction 101" || normalTags[i].tag.tagName === "Bloodborne Pathogens Training") {
      priorityTags.push(normalTags[i]);
      normalTags.splice(i, 1); // Remove the tag from the original array
      i--; // Updating where we are in the array
    }
  }
  return (
    <div>
      <Stack spacing={2}>
        <Typography variant="h5"> Email </Typography>
        <TextField disabled defaultValue={props.email} />
        <Typography variant="h5"> Phone Number </Typography>
        <TextField disabled defaultValue={props.phone} />

      </Stack>
      <Grid container spacing={2}>
      {priorityTags.map((userTag) => {
          let tagColor;
          if (userTag.tagProf !== "N/A") {
            tagColor = "#808080";   // The user has the tag, set the color to grey
          }
          else {
            tagColor = "#ffffff";   // The user does not have the tag, set the color to white
          }
          return (
            <Grid item xs={6} key={userTag.tag.tagName}>
              <Box sx={
                {
                  backgroundColor: tagColor,
                  border: 1,
                  borderRadius: 2
                }
              }>
                <Typography variant="h6" align="center"> {userTag.tag.tagName}: {userTag.tagProf} </Typography>
              </Box>
            </Grid>
          );
        })}
        {normalTags.map((userTag) => {
          let tagColor;
          if (userTag.tagProf !== "N/A") {
            tagColor = "#808080";   // The user has the tag, set the color to grey
          }
          else {
            tagColor = "#ffffff";   // The user does not have the tag, set the color to white
          }
          return (
            <Grid item xs={4} key={userTag.tag.tagName}>
              <Box sx={
                {
                  backgroundColor: tagColor,
                  border: 1,
                  borderRadius: 2
                }
              }>
                <Typography variant="h6" align="center"> {userTag.tag.tagName}: {userTag.tagProf} </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
