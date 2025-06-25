import { Add, Delete, Edit } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
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

interface Tags {
  _id: string;
  tagName: string;
  tagDescription: string;
  certification: boolean;
}

interface LanguageListsProps {
  reqs: Request[];
  tags: Tags[];
}

export function LanguageLists({ reqs, tags }: LanguageListsProps) {
  const langReqs = reqs.filter((req) => req.certification === false);
  const [reqRows, setReqRows] = useState(langReqs);
  const [languages, setLanguages] = useState<Tags[] | undefined>(tags);
  const [editingLang, setEditingLang] = useState<string | undefined>();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [addingLang, setAddingLang] = useState<boolean>(false);

  const getLanguages = async () => {
    const tagRes = await fetch('/api/tags');
    const tagData: Tags[] = await tagRes.json();
    if (tagData) {
      const langs = tagData.filter((lang) => lang.certification === false);
      setLanguages(langs);
    }
  };

  const handleReqAdd = async (index: number) => {
    const currentRows = [...reqRows];
    const changedReq = currentRows[index];

    const confirmed = confirm(
      'Are you sure you want to add this language? This will add the language and remove the request'
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/requests/${changedReq._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete request');
        } else {
          try {
            const response = await fetch(`/api/tags`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tagName: changedReq.title,
                tagDescription: `ability to speak/read/write ${changedReq.title}`,
                certification: false,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to create new language');
            } else {
              const updatedRows = currentRows.filter((_, idx) => idx !== index);
              setReqRows(updatedRows);
              getLanguages();
            }
          } catch (err) {
            console.error('Add language tag failed: ', err);
          }
        }
      } catch (err) {
        console.error('Requested language Add failed:', err);
        alert(`Requested language Add failed: ${err}`);
      }
    }
  };

  const handleReqDelete = async (index: number) => {
    const currentRows = [...reqRows];
    const changedReq = currentRows[index];

    const confirmed = confirm(
      'Are you sure you want to deny/delete this request?'
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/requests/${changedReq._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete request');
        } else {
          const updatedRows = currentRows.filter((_, idx) => idx !== index);
          setReqRows(updatedRows);
        }
      } catch (err) {
        console.error('Language request delete failed:', err);
        alert(`Language request delete failed: ${err}`);
      }
    }
  };

  const handleLangEdit = async () => {
    if (editingLang) {
      try {
        const response = await fetch(`/api/tags/${editingLang}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tagName: newTitle,
            tagDescription: newDescription,
            certification: false,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update tag');
        } else {
          getLanguages();
          setEditingLang(undefined);
          setNewTitle('');
          setNewDescription('');
        }
      } catch (err) {
        console.error('Language edit failed: ', err);
        alert(`Language edit failed: ${err}`);
        setEditingLang(undefined);
        setNewTitle('');
        setNewDescription('');
      }
    } else {
      console.log('changed language not set');
    }
  };

  const handleLangDelete = async (index: number) => {
    if (languages) {
      const changedLang = languages[index];

      const confirmed = confirm(
        'Are you sure you want to delete this language?'
      );
      if (confirmed) {
        try {
          const response = await fetch(`/api/tags/${changedLang._id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete tag');
          } else {
            getLanguages();
          }
        } catch (err) {
          console.error('Language delete failed:', err);
          alert(`Language delete failed: ${err}`);
        }
      }
    }
  };

  const handleAddLang = async () => {
    try {
      const response = await fetch(`/api/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagName: newTitle,
          tagDescription: newDescription,
          certification: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create new language');
      } else {
        getLanguages();
        setAddingLang(false);
        setNewTitle('');
        setNewDescription('');
      }
    } catch (err) {
      console.error('Add language tag failed: ', err);
      alert(`Language add failed: ${err}`);
    }
  };

  return (
    <Stack sx={{ height: '100%', width: '100%' }}>
      <Typography
        fontFamily="Verdana"
        fontWeight="bold"
        variant="h4"
        color="white"
        alignContent="center"
        sx={{ height: '10%' }}
      >
        Language Requests
      </Typography>
      <TableContainer
        sx={{ height: '30%', backgroundColor: '#f0f5ef', overflowY: 'auto' }}
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
                Language
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#42603C',
                  fontFamily: 'Verdana',
                  color: 'white',
                }}
              >
                Number of Requests
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#42603C',
                  fontFamily: 'Verdana',
                  color: 'white',
                }}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {reqRows.map((req, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  {req.title}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  {req.requestingUser.length}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  <Grid container>
                    <Grid item xs={3}>
                      <IconButton onClick={() => handleReqAdd(index)}>
                        <Add />
                      </IconButton>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton onClick={() => handleReqDelete(index)}>
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container sx={{ height: '10%' }}>
        <Grid item>
          <Typography
            fontFamily="Verdana"
            fontWeight="bold"
            variant="h4"
            color="white"
            alignContent="center"
            pb="5%"
            pt="4%"
          >
            Language Management
          </Typography>
        </Grid>
        <Grid item pl="34%" pt="2.5%">
          {addingLang ? (
            <span />
          ) : (
            <Button
              onClick={() => {
                setAddingLang(true);
                setNewTitle('');
                setNewDescription(`ability to speak/read/write ${newTitle}`);
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
              Add Language
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
                Language
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#42603C',
                  fontFamily: 'Verdana',
                  color: 'white',
                }}
              >
                Description
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#42603C',
                  fontFamily: 'Verdana',
                  color: 'white',
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {languages?.map((lang, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  {editingLang === lang._id ? (
                    <TextField
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  ) : (
                    <span>{lang.tagName}</span>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  {editingLang === lang._id ? (
                    <TextField
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  ) : (
                    <span>{lang.tagDescription}</span>
                  )}
                </TableCell>
                <TableCell
                  sx={{ fontFamily: 'Verdana', backgroundColor: '#F0F5Ef' }}
                >
                  {editingLang === lang._id ? (
                    <Grid container>
                      <Grid item xs={6}>
                        <Button onClick={() => handleLangEdit()}>Submit</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          onClick={() => {
                            setNewTitle('');
                            setNewDescription('');
                            setEditingLang(undefined);
                          }}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Grid item xs={6}>
                        <IconButton
                          onClick={() => {
                            setEditingLang(lang._id);
                            setNewTitle(lang.tagName);
                            setNewDescription(lang.tagDescription);
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
            {addingLang ? (
              <TableRow>
                <TableCell>
                  <TextField
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button onClick={() => handleAddLang()}>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => {
                          setAddingLang(false);
                          setNewTitle('');
                          setNewDescription('');
                        }}
                      >
                        Cancel
                      </Button>
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
    </Stack>
  );
}
