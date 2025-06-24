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
  const statuses = ['requested', 'in progress', 'completed', 'denied'];
  const [rows, setRows] = useState(reqs);

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

    if (newStatus === 'completed') {
      const confirmed = confirm(
        'Are you sure you want to mark this as completed? This will remove the request and give this user the certification.'
      );

      if (confirmed) {
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
    } else if (newStatus === 'denied') {
      const confirmed = confirm(
        'Are you sure you want to mark this as denied? This will remove the request and deny this user the certification.'
      );

      if (confirmed) {
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
  );
}
