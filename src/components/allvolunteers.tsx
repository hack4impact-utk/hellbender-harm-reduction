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
  data: UserData[]; // The data array passed into the component
}

export function AllVolunteers({ data }: DataTableProps) {
  //console.log("Data received in AllVolunteers:", data)
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

/*interface Column {
  id: 'name' | 'phone' | 'email' | 'pronoun' | 'emergencyContacts';
  label: string,
  align?: 'left';
  format?: (value: any) => string | number;
}

const columns: readonly Column[] = [
    {id: 'name', label: 'Name'},
    {id: 'phone', label: 'Phone'},
    {id: 'email', label: 'Email'},
    {id: 'pronoun', label: 'Pronouns'},
    {id: 'emergencyContacts', label: 'Emergency Contact'},
];

interface emergencyContacts {
    name: string,
    phone: string,
}

interface Data {
    name: string,
    phone: string,
    email: string,
    pronoun: string,
    emergencyContacts?: emergencyContacts,
}

function createData(
    name: string,
    phone: string,
    email: string,
    pronoun: string,
    ecname: string | undefined,
    ecphone: string | undefined,
): Data {
    return {
        name,
        phone,
        email,
        pronoun,
        emergencyContacts: ecname && ecphone ? { name: ecname, phone: ecphone } : undefined,
    };
}

export function AllVolunteers() {

  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
        try {
            const users = await getAllUsers();

            const rowsFetch = users.map((item) => createData(
                item.name,
                item.phone,
                item.email,
                item.pronouns,
                item.emergencyContacts?.name,
                item.emergencyContacts?.phone,
            ));

            setRows(rowsFetch);
        } catch (error) {
            console.error("FUCK", error);
        }
    };

    fetchData();
  }, [])

  return (
    <TableContainer component={Paper}>
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'emergencyContacts' ? (
                                // Check if `value` is an object of type `emergencyContacts`
                                value && typeof value === 'object' && 'name' in value && 'phone' in value ? (
                                  // If `value` exists and has `name` and `phone`, render `name` and `phone`
                                  `${value.name ?? 'Unknown'} (${value.phone ?? 'N/A'})`
                                ) : (
                                  // If `value` is undefined or not in the expected shape, show 'N/A'
                                  'N/A'
                                )
                              ) : (
                                column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value ?? 'N/A'
                              )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
        </Table>
    </TableContainer>
  );
}*/
