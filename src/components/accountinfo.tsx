'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { ArrowDownward } from '@mui/icons-material';
import { TextField, Stack, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';

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
          
          <Grid item xs={6}>
            <Accordion>
              <AccordionSummary expandIcon={<ArrowDownward />} aria-controls="tag-information">
                <Typography variant="h5"> {props.tags[0].tag.tagName} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                Ur mom is hot and also gay
              </AccordionDetails>
            </Accordion>
          </Grid>
          
        </Grid>
      </Stack>
    </div>
  );
}
