import { Accordion, AccordionSummary } from '@mui/material';
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
          {props.name}
        </AccordionSummary>
      </Accordion>
    </>
  );
}
