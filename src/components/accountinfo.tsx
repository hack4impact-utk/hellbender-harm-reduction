'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import { ArrowDownward } from '@mui/icons-material';
import { TextField, Stack, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';

interface Tag {
  tagName: string;
  cartPicture: string;
  certification: boolean;
}

enum tagProfEnum {
  Beginner,
  Intermediate, 
  Expert,
  NotApplicable,
}

interface userTag {
  tag: Tag;
  tagProf: tagProfEnum;
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
      </Stack>
      <Grid container spacing={2}>
        
        <Grid size={6}>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowDownward />} aria-controls="tag-information">

            </AccordionSummary>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}
