import { Check, Clear, Delete, Edit } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';

interface FunFact {
  _id: string;
  fact: string;
}

interface FunFactProps {
  open: boolean;
  onClose: () => void;
  facts: FunFact[];
}

export function FunFactManager({ open, onClose, facts }: FunFactProps) {
  const [editingFacts, setEditingFacts] = useState<string>('');
  const [addingFacts, setAddingFacts] = useState<boolean>(false);
  const [factList, setFactList] = useState(facts);
  const [newFact, setNewFact] = useState<string>('');

  const getFacts = async () => {
    const factRes = await fetch('/api/facts');
    const factData: FunFact[] = await factRes.json();
    setFactList(factData);
  };

  const handleFactEdit = async (index: number) => {
    //const currentRows = [...factList];
    const fact = factList[index];
    if (editingFacts) {
      try {
        const response = await fetch(`/api/facts/${fact._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fact: fact.fact,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update fact');
        } else {
          const updateRows = [...factList];
          updateRows[index].fact = newFact;
          setFactList(updateRows);
          setEditingFacts('');
          setNewFact('');
        }
      } catch (err) {
        console.error('Fact edit failed: ', err);
        alert(`Fact edit failed: ${err}`);
        setEditingFacts('');
        setNewFact('');
      }
    } else {
      console.log('not set to editing');
    }
  };

  const handleLangDelete = async (index: number) => {
    //if (languages) {
    const fact = factList[index];

    const confirmed = confirm('Are you sure you want to delete this fun fact?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/facts/${fact._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete tag');
        } else {
          const updatedRows = factList.filter((_, idx) => idx !== index);
          setFactList(updatedRows);
        }
      } catch (err) {
        console.error('Fact delete failed:', err);
        alert(`Fact delete failed: ${err}`);
      }
    }
    //}
  };

  const handleAddLang = async () => {
    try {
      const response = await fetch(`/api/facts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fact: newFact,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new fact');
      } else {
        setAddingFacts(false);
        setNewFact('');
        getFacts();
      }
    } catch (err) {
      console.error('Add fact tag failed: ', err);
      alert(`Fact add failed: ${err}`);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ height: '100%', weight: '100%' }}
    >
      <DialogContent sx={{ backgroundColor: '#e2e7e2' }}>
        <Grid container sx={{ height: '10%' }}>
          <Grid item>
            <Typography
              fontFamily="Verdana"
              fontWeight="bold"
              variant="h4"
              color="#42603c"
              alignContent="center"
              pb="5%"
              pt="4%"
            >
              Manage Fun Facts
            </Typography>
          </Grid>
          <Grid item ml="7%" mt="3%">
            {addingFacts ? (
              <span />
            ) : (
              <Button
                onClick={() => {
                  setAddingFacts(true);
                  setNewFact('');
                }}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: '#f0f5ef',
                  '&:hover': {
                    backgroundColor: '#d4e2d1',
                  },
                  marginTop: '1%',
                  color: '#42630c',
                }}
              >
                Add Fun Fact
              </Button>
            )}
          </Grid>
        </Grid>
        <TableContainer
          sx={{ height: '50%', backgroundColor: '#f0f5ef', overflowY: 'auto' }}
        >
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
                  Fun Fact
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: '#42603C',
                    fontFamily: 'Verdana',
                    color: 'white',
                  }}
                >
                  Manage
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {factList?.map((fact, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                  >
                    {editingFacts === fact._id ? (
                      <TextField
                        fullWidth
                        value={newFact}
                        onChange={(e) => setNewFact(e.target.value)}
                      />
                    ) : (
                      <span>{fact.fact}</span>
                    )}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                  >
                    {editingFacts === fact._id ? (
                      <Grid container>
                        <Grid item xs={6}>
                          <IconButton onClick={() => handleFactEdit(index)}>
                            <Check />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton
                            onClick={() => {
                              setNewFact('');
                              setEditingFacts('');
                            }}
                          >
                            <Clear />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container>
                        <Grid item xs={6}>
                          <IconButton
                            onClick={() => {
                              setEditingFacts(fact._id);
                              setNewFact(fact.fact);
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Grid>
                        <Grid item xs={6}>
                          <IconButton onClick={() => handleLangDelete(index)}>
                            <Delete />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {addingFacts ? (
                <TableRow>
                  <TableCell>
                    <TextField
                      fullWidth
                      value={newFact}
                      onChange={(e) => setNewFact(e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Grid container>
                      <Grid item xs={6}>
                        <IconButton onClick={() => handleAddLang()}>
                          <Check />
                        </IconButton>
                      </Grid>
                      <Grid item xs={6}>
                        <IconButton
                          onClick={() => {
                            setAddingFacts(false);
                            setNewFact('');
                          }}
                        >
                          <Clear />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ) : (
                <span />
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#e2e7e2', pb: '2%', pr: '3%' }}>
        <Button
          onClick={onClose}
          autoFocus
          sx={{ color: '#42603c', fontFamily: 'Verdana', fontSize: '100%' }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
