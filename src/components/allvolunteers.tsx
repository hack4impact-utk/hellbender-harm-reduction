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

interface UserData {
  name: string;
  phone: string;
  email: string;
  pronouns: string;
  emergencyContacts?: emergContact;
}

interface DataTableProps {
  data: UserData[];
}

export function AllVolunteers({ data }: DataTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Pronouns</TableCell>
            <TableCell>Emergency Contact</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
