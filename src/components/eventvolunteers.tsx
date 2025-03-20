import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography } from '@mui/material';
import React from 'react';

interface emergContact {
  ecName: string;
  ecPhone: string;
}

interface utag {
  tag: string;
  tagProf: string;
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  pronouns: string;
  accomm?: string[];
  otherAccomm?: string;
  emergencyContacts?: emergContact;
  userTags?: utag[];
}

interface DataTableProps {
  data: UserData[];
}

export function EventVolunteers({ data }: DataTableProps) {
  //console.log(JSON.stringify(data));
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Pronouns</TableCell>
            <TableCell>Accommodations</TableCell>
            <TableCell>Emergency Contact</TableCell>
            <TableCell>Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.pronouns}</TableCell>
              <TableCell>
                {user.accomm && user.accomm.length > 0 ? (
                  user.accomm.map((item, idx) => (
                    <Typography key={idx} variant="body2">
                      {item}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
                {user.otherAccomm ? (
                  <Typography>{user.otherAccomm}</Typography>
                ) : (
                  <span></span>
                )}
              </TableCell>
              <TableCell>
                {user.emergencyContacts ? (
                  <Typography>
                    {user.emergencyContacts.ecName}
                    <br />
                    {user.emergencyContacts.ecPhone}
                  </Typography>
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
              <TableCell>
                {user.userTags && user.userTags.length > 0 ? (
                  user.userTags.map((item, idx) => (
                    <Typography key={idx} variant="body2">
                      {item.tag} - {item.tagProf}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
