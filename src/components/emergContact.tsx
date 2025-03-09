import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

//required interface
interface emergContactInfoProps {
  name: string;
  mobile_phone: string;
  work_phone?: string;
  home_phone?: string;
  email?: string;
  address?: string;
  relation?: string;
}

// exports accordion, only prints values that aren't undefined
export default function EmergContactInfo(props: emergContactInfoProps) {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>{props.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {props.mobile_phone && (
              <>
                Mobile Phone: {props.mobile_phone} <br />
              </>
            )}
            {props.work_phone && (
              <>
                Work Phone: {props.work_phone} <br />
              </>
            )}
            {props.home_phone && (
              <>
                Home Phone: {props.home_phone} <br />
              </>
            )}
            {props.email && (
              <>
                Email: {props.email} <br />
              </>
            )}
            {props.address && (
              <>
                Address: {props.address} <br />
              </>
            )}
            {props.relation && (
              <>
                Relation: {props.relation} <br />
              </>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
