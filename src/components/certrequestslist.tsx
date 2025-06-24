import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React, { useState } from 'react';

interface Request {
  _id: string;
  title: string;
  certification: boolean;
  status: string;
  timesRequested: number;
  requestingUser: string;
}

interface CertRequestsListProps {
  reqs: Request[];
}

export function CertRequestsList({ reqs }: CertRequestsListProps) {
  const statuses = ['requested', 'in progress', 'completed', 'denied'];
  const [rows, setRows] = useState(reqs);

  const handleStatusChange = async (
    event: SelectChangeEvent,
    rowIndex: number
  ) => {
    const newStatus = event.target.value;
    const currentRows = [...rows];
    const prevStatus = currentRows[rowIndex].status;
    const changedRequest = currentRows[rowIndex];

    if (newStatus === 'completed') {
      const confirmed = confirm(
        'Are you sure you want to mark this as completed? This will remove the request and give this user the certification.'
      );

      if (confirmed) {
        try {
          const response = await fetch(`/api/requests/${changedRequest._id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete request');
          } else {
            const updatedRows = currentRows.filter(
              (_, idx) => idx !== rowIndex
            );
            setRows(updatedRows);
          }
        } catch (err) {
          console.error('Completion delete failed:', err);
          alert(`Completion delete failed: ${err}`);
        }
      } else {
        const revertedRows = [...currentRows];
        revertedRows[rowIndex].status = prevStatus;
        setRows(revertedRows);
      }
    } else if (newStatus === 'denied') {
      const confirmed = confirm(
        'Are you sure you want to mark this as denied? This will remove the request and deny this user the certification.'
      );

      if (confirmed) {
        try {
          const response = await fetch(`/api/requests/${changedRequest._id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete request');
          } else {
            const updatedRows = currentRows.filter(
              (_, idx) => idx !== rowIndex
            );
            setRows(updatedRows);
          }
        } catch (err) {
          console.error('Deny delete failed:', err);
          alert(`Deny delete failed: ${err}`);
        }
      } else {
        const revertedRows = [...currentRows];
        revertedRows[rowIndex].status = prevStatus;
        setRows(revertedRows);
      }
    } else {
      try {
        const response = await fetch(`/api/requests/${changedRequest._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: changedRequest.title,
            certification: changedRequest.certification,
            status: newStatus,
            timesRequested: changedRequest.timesRequested,
            requestingUser: changedRequest.requestingUser,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user information');
        } else {
          currentRows[rowIndex].status = newStatus;
          setRows(currentRows);
        }
      } catch (err) {
        console.error('Update failed: ', err);
        alert(`Update failed: ${err}`);
      }
    }
  };

  return (
    <TableContainer>
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
              User
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Certification
            </TableCell>
            <TableCell
              sx={{
                backgroundColor: '#42603C',
                fontFamily: 'Verdana',
                color: 'white',
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((req, index) => (
            <TableRow key={index}>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {req.requestingUser}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                {req.title}
              </TableCell>
              <TableCell
                sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
              >
                <Select
                  value={rows[index].status}
                  onChange={(e) => handleStatusChange(e, index)}
                  fullWidth
                  size="small"
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
