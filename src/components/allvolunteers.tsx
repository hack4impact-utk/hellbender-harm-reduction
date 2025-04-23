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

//needed interfaces
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

// exported component
export function AllVolunteers({ data }: DataTableProps) {
  // returns a table with volunteer data
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Pronouns
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Emergency Contact
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {user.name}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {user.phone}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {user.email}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {user.pronouns}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {user.emergencyContacts ? (
                  <Typography variant={'body2'} fontFamily={'Verdana'}>
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
