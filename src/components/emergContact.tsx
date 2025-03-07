import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

interface emergContactInfoProps {
  name: string;
  mobile_phone: string;
  work_phone?: string;
  home_phone?: string;
  email?: string;
  address?: string;
  relation?: string;
}

export default function EmergContactInfo(props: emergContactInfoProps) {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Mobile Phone: {props.mobile_phone} <br></br>
            Work Phone: {props.work_phone} <br></br>
            Home Phone: {props.home_phone} <br></br>
            Email: {props.email}
            <br></br>
            Address: {props.address}
            <br></br>
            Relation: {props.relation}
            <br></br>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
