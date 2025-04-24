import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';
import React from 'react';

// needed interfaces
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
  userTags?: (utag | null)[];
  events: string[];
}

interface DataTableProps {
  users: UserData[];
}

// exports list of volunteers by event
export function DashVolunteerList({ users }: DataTableProps) {
  //returns actual component
  return (
    <Box
      sx={{
        backgroundColor: '#F0F5EF',
        height: '100%',
        borderRadius: '5px',
      }}
    >
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Pronouns
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Accommodations
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Emergency Contact
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: 'Verdana',
                  backgroundColor: '#42603C',
                  color: 'white',
                }}
              >
                Tags
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.name}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.phone}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.email}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.pronouns}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.accomm && user.accomm.length > 0 ? (
                    user.accomm.map((item, idx) => (
                      <Typography key={idx} variant="body2">
                        {item}
                      </Typography>
                    ))
                  ) : user.otherAccomm ? (
                    <Typography variant="body2">{user.otherAccomm}</Typography>
                  ) : (
                    <Typography variant="body2">N/A</Typography>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {user.emergencyContacts ? (
                    <Typography variant="body2">
                      {user.emergencyContacts.ecName}
                      <br />
                      {user.emergencyContacts.ecPhone}
                    </Typography>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: 'Verdana',
                    backgroundColor: '#F0F5Ef',
                  }}
                >
                  {Array.isArray(user.userTags) &&
                  user.userTags.filter(Boolean).length > 0 ? (
                    user.userTags
                      .filter(
                        (tag): tag is { tag: string; tagProf: string } =>
                          tag !== null
                      )
                      .map((item, idx) => (
                        <Typography key={idx} variant="body2">
                          {item.tag}
                          {item.tagProf !== 'N/A' && ` - ${item.tagProf}`}
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
    </Box>
  );
}
