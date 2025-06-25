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
  Typography,
  Box,
} from '@mui/material';
import React, { useState } from 'react';

interface RequestingUser {
  userId: string;
  userName: string;
  status: string;
}

interface Request {
  _id: string;
  title: string;
  tagId: string;
  certification: boolean;
  requestingUser: RequestingUser[];
}

interface CertRequestsListProps {
  reqs: Request[];
}

export function CertRequestsList({ reqs }: CertRequestsListProps) {
  // sets up needed data
  const statuses = ['requested', 'in progress', 'completed', 'denied'];
  const [rows, setRows] = useState(reqs);

  // handles when a new status is clicked
  const handleStatusChange = async (
    event: SelectChangeEvent,
    certIndex: number,
    userIndex: number
  ) => {
    const newStatus = event.target.value;
    const currentRows = [...rows];
    const prevStatus = currentRows[certIndex].requestingUser[userIndex].status;
    const changedCert = currentRows[certIndex];
    const changedId = currentRows[certIndex].requestingUser[userIndex].userId;

    // if the status is changed to completed
    if (newStatus === 'completed') {
      // confirms with user
      const confirmed = confirm(
        'Are you sure you want to mark this as completed? This will remove the request and give this user the certification.'
      );

      if (confirmed) {
        // checks number of requesting users, if 1 request needs to be completely removed from database
        if (changedCert.requestingUser.length === 1) {
          try {
            const response = await fetch(`/api/requests/${changedCert._id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Failed to delete request');
            } else {
              const updatedRows = currentRows.filter(
                (_, idx) => idx !== certIndex
              );
              setRows(updatedRows);
            }
          } catch (err) {
            console.error('Completion delete failed:', err);
            alert(`Completion delete failed: ${err}`);
            const revertedRows = [...currentRows];
            revertedRows[certIndex].requestingUser[userIndex].status =
              prevStatus;
            setRows(revertedRows);
          }
        } else {
          // if there is more than one user you have to remove the user from the list and update database
          const newReqUsers = [
            ...changedCert.requestingUser.slice(0, userIndex),
            ...changedCert.requestingUser.slice(userIndex + 1),
          ];
          changedCert.requestingUser = newReqUsers;
          try {
            const response = await fetch(`/api/requests/${changedCert._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: changedCert.title,
                certification: changedCert.certification,
                requestingUser: changedCert.requestingUser,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to update user information');
            } else {
              currentRows[certIndex] = changedCert;
              setRows(currentRows);
            }
          } catch (err) {
            console.error('Completed update failed: ', err);
            alert(`Completed update failed: ${err}`);
            const revertedRows = [...currentRows];
            revertedRows[certIndex].requestingUser[userIndex].status =
              prevStatus;
            setRows(revertedRows);
          }
        }
        // since training was marked as completed user must be given tag
        const userRes = await fetch(`/api/users/${changedId}`);
        const userData = await userRes.json();
        try {
          const response = await fetch(`/api/users/${changedId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userTags: [
                ...userData.userTags,
                {
                  tag: changedCert.tagId,
                  tagProf: 'N/A',
                },
              ],
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update user information');
          } else {
            currentRows[certIndex] = changedCert;
            setRows(currentRows);
          }
        } catch (err) {
          console.error('Completed update failed: ', err);
          alert(`Completed update failed: ${err}`);
          const revertedRows = [...currentRows];
          revertedRows[certIndex].requestingUser[userIndex].status = prevStatus;
          setRows(revertedRows);
        }
      } else {
        const revertedRows = [...currentRows];
        revertedRows[certIndex].requestingUser[userIndex].status = prevStatus;
        setRows(revertedRows);
      }
      // handles when status is set as denied
    } else if (newStatus === 'denied') {
      // confirms with user
      const confirmed = confirm(
        'Are you sure you want to mark this as denied? This will remove the request and deny this user the certification.'
      );

      if (confirmed) {
        // if there's only one user the entire request must be deleted from the database
        if (changedCert.requestingUser.length === 1) {
          try {
            const response = await fetch(`/api/requests/${changedCert._id}`, {
              method: 'DELETE',
            });

            if (!response.ok) {
              throw new Error('Failed to delete request');
            } else {
              const updatedRows = currentRows.filter(
                (_, idx) => idx !== certIndex
              );
              setRows(updatedRows);
            }
          } catch (err) {
            console.error('Deny delete failed:', err);
            alert(`Deny delete failed: ${err}`);
            const revertedRows = [...currentRows];
            revertedRows[certIndex].requestingUser[userIndex].status =
              prevStatus;
            setRows(revertedRows);
          }
          // there's more than one user so just update requesting user list
        } else {
          const newReqUsers = [
            ...changedCert.requestingUser.slice(0, userIndex),
            ...changedCert.requestingUser.slice(userIndex + 1),
          ];
          changedCert.requestingUser = newReqUsers;
          try {
            const response = await fetch(`/api/requests/${changedCert._id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: changedCert.title,
                certification: changedCert.certification,
                requestingUser: changedCert.requestingUser,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to update user information');
            } else {
              currentRows[certIndex] = changedCert;
              setRows(currentRows);
            }
          } catch (err) {
            console.error('Deny update failed: ', err);
            alert(`Deny update failed: ${err}`);
            const revertedRows = [...currentRows];
            revertedRows[certIndex].requestingUser[userIndex].status =
              prevStatus;
            setRows(revertedRows);
          }
        }
      } else {
        const revertedRows = [...currentRows];
        revertedRows[certIndex].requestingUser[userIndex].status = prevStatus;
        setRows(revertedRows);
      }
      // if status is changed to anything other than denied or completed
    } else {
      changedCert.requestingUser[userIndex].status = newStatus;
      try {
        const response = await fetch(`/api/requests/${changedCert._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: changedCert.title,
            certification: changedCert.certification,
            requestingUser: changedCert.requestingUser,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user information');
        } else {
          currentRows[certIndex].requestingUser[userIndex].status = newStatus;
          setRows(currentRows);
        }
      } catch (err) {
        console.error('Update failed: ', err);
        alert(`Update failed: ${err}`);
        const revertedRows = [...currentRows];
        revertedRows[certIndex].requestingUser[userIndex].status = prevStatus;
        setRows(revertedRows);
      }
    }
  };

  // return actual display
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Typography
        fontFamily="Verdana"
        fontWeight="bold"
        variant="h4"
        color="white"
        alignContent="center"
        sx={{ height: '10%' }}
      >
        Certification Requests
      </Typography>
      <Box
        sx={{ height: '90%', backgroundColor: '#f0f5ef', overflowY: 'auto' }}
      >
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
              {rows.map((req, index1) =>
                req.requestingUser.map((user, index2) => (
                  <TableRow key={`${index1}, ${index2}`}>
                    <TableCell
                      sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                    >
                      {user.userName}
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
                        value={rows[index1].requestingUser[index2].status}
                        onChange={(e) => handleStatusChange(e, index1, index2)}
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
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
