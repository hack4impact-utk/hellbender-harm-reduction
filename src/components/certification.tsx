import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import { getUser } from '@/server/actions/user';
import { JSX } from 'react';
import { getCert } from '@/server/actions/certification';

interface SkillsCertsInfoProps {
  userID: string;
}

interface UserCertification {
  certification: {
    certName: string;
    certDescription: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    certPicture?: string;
  };
  dateReceived: Date;
  dateExpiration?: Date;
  certProgress?: string;
}

// Note: if we get an error with the userID, this will return an empty div.
export default async function SkillsCertsInfo({
  userID,
}: SkillsCertsInfoProps): Promise<JSX.Element> {
  // Store and unpack Accordion inside this array
  const certifications: JSX.Element[] = [];
  const userData = await getUser(userID);

  // Make dates look nice
  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  async function AccordianBlock(
    cert: UserCertification,
    id: string
  ): Promise<JSX.Element | null> {
    const Accordian_aria_controls = id + '1bh-content';
    const Accordian_summary_id = id + 'bh-header';

    const temp = await getCert(cert.certification.toString());

    const cert_name = temp?.certName ?? 'N/A';
    const cert_description = temp?.certDescription ?? 'N/A';
    const cert_dateReceived = cert.dateReceived
      ? formatDate(cert.dateReceived)
      : 'N/A';
    const cert_expiration = cert.dateExpiration
      ? formatDate(cert.dateExpiration)
      : 'N/A';
    const cert_status = cert.certProgress ?? 'N/A';

    return (
      <Accordion key={id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={Accordian_aria_controls}
          id={Accordian_summary_id}
        >
          <Typography component="span">{cert_name}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            Description: {cert_description} <br />
            Date Acquired: {cert_dateReceived} <br />
            Expiration Date: {cert_expiration} <br />
            Status: {cert_status} <br />
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  }

  const temp = userData?.certifications;
  if (temp) {
    let accordionBlockID_num: number = 1;

    // Parse certifications
    for (const cert of temp) {
      // id will always be "panel1", "panel2", "panel3", etc... in case we need to access them
      const accordionBlockID: string = 'panel' + accordionBlockID_num;

      const block = await AccordianBlock(cert, accordionBlockID);
      if (block !== null) {
        certifications.push(block);
        accordionBlockID_num++;
      }
    }
  }

  return <div>{certifications}</div>;
}
