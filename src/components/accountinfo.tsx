'use client'; // Makes the client use their resources to render the component instead of having the server render it first (epic)
import {
  TextField,
  Stack,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { Edit } from '@mui/icons-material';
import { CertificationPopUp } from './certificationpopup';

interface Tag {
  _id: string;
  tagName: string;
  tagDescription: string;
  certification: boolean;
}

interface userTag {
  tagId: string;
  tag: string;
  tagProf: string;
}

interface reqUser {
  userId: string;
  status: string;
}

interface Request {
  _id: string;
  title: string;
  certification: boolean;
  requestingUser: reqUser[];
}

interface AccountInfoProps {
  id: string;
  email: string;
  phone: string;
  utags?: userTag[];
  tags: Tag[];
  requests: Request[];
}

export function AccountInfo({
  id,
  email,
  phone,
  utags,
  tags,
  requests,
}: AccountInfoProps) {
  const [editMode, setEditMode] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [newTags, setNewTags] = useState(utags ?? []);
  const [selectedLangId, setSelectedLangId] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('');
  const [savedEmail, setSavedEmail] = useState(email);
  const [savedPhone, setSavedPhone] = useState(phone);
  const [savedTags, setSavedTags] = useState(utags ?? []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestedCert, setRequestedCert] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [languageReq, setLanguageReq] = useState('');
  const [requestedLanguages, setRequestedLanguages] = useState<string[]>([]);

  const handleRemoveTag = (tagIdToRemove: string) => {
    setNewTags((prev) => (prev ?? []).filter((t) => t.tagId !== tagIdToRemove));
  };

  const userTagIds = new Set(
    (utags ?? []).map((utag) => utag.tagId?.trim()).filter(Boolean)
  );
  const priorityTags = tags.filter((tag) => tag.certification);
  const langs = tags.filter((tag) => !tag.certification);

  const handleRequest = async () => {
    setDialogOpen(false);

    const certMatch = requests.find((req) => req.title === selectedTitle);

    if (!certMatch) {
      try {
        const response = await fetch(`/api/requests`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: selectedTitle,
            certification: true,
            requestingUser: [
              {
                userId: String(id),
                status: 'requested',
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to make certification request');
        } else {
          setRequestedCert((prev) => [...prev, selectedTitle.trim()]);
        }
      } catch (err) {
        console.error('Certification request failed:', err);
        alert(`Certification request failed`);
      }
    } else {
      try {
        const response = await fetch(`/api/requests/${certMatch._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: certMatch.title,
            certification: certMatch.certification,
            requestingUser: [
              ...certMatch.requestingUser,
              {
                userId: id,
                status: 'requested',
              },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update certification request');
        } else {
          setRequestedCert((prev) => [...prev, selectedTitle.trim()]);
        }
      } catch (err) {
        console.error('Certification update failed:', err);
        alert(`Certification update failed`);
      }
    }
    setSelectedTitle('');
    setSelectedDescription('');
  };

  const handleLanguageRequest = async () => {
    const cleanedInput = languageReq.replace(/[^a-zA-Z]/g, '').trim();
    if (cleanedInput.length === 0) {
      alert('Improper Input');
      setLanguageReq('');
    } else {
      const newLang =
        cleanedInput.charAt(0).toUpperCase() +
        cleanedInput.slice(1).toLowerCase();

      const oldRepeat = requests.find(
        (req) =>
          req.title === newLang &&
          req.requestingUser.some((user) => user.userId === id)
      );

      const newRepeat = requestedLanguages.find((req) => req === newLang);

      if (oldRepeat || newRepeat) {
        alert('Language Already Requested');
      } else {
        const confirmed = confirm(
          `Are you sure you sure you want to request that ${newLang} is added?.`
        );
        if (confirmed) {
          const langMatch = requests.find((req) => req.title === newLang);
          if (langMatch) {
            try {
              const response = await fetch(`/api/requests/${langMatch._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: newLang,
                  certification: false,
                  requestingUser: [
                    ...langMatch.requestingUser,
                    {
                      userId: id,
                      status: 'requested',
                    },
                  ],
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to update user information');
              } else {
                setRequestedLanguages((prev) => [...prev, newLang]);
              }
            } catch (err) {
              console.error('Language request failed:', err);
              alert('Language request failed');
            }
          } else {
            try {
              const response = await fetch(`/api/requests`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  title: newLang,
                  certification: false,
                  requestingUser: [
                    {
                      userId: id,
                      status: 'requested',
                    },
                  ],
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to update user information');
              } else {
                setRequestedLanguages((prev) => [...prev, newLang]);
              }
            } catch (err) {
              console.error('Language request failed:', err);
              alert('Language request failed');
            }
          }
        }
      }
    }
    setLanguageReq('');
  };

  const handleSubmit = async () => {
    try {
      const formattedTags = (newTags ?? []).map((tag) => ({
        tag: tag.tagId, // Use the tag ID
        tagProf: tag.tagProf, // Keep the proficiency
      }));
      console.log('Submitting:', {
        email: newEmail,
        phone: newPhone,
        userTags: formattedTags,
      });
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newEmail,
          phone: newPhone,
          userTags: formattedTags,
        }),
      });

      if (!response.ok) {
        console.log('Submitting:', {
          email: newEmail,
          phone: newPhone,
          userTags: formattedTags,
        });
        throw new Error('Failed to update user information');
      }

      setSavedEmail(newEmail);
      setSavedPhone(newPhone);
      setSavedTags(newTags ?? []);
      setEditMode(false);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <Box sx={{ position: 'relative', padding: '20px' }}>
      <CertificationPopUp
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTitle('');
          setSelectedDescription('');
        }}
        onSubmit={handleRequest}
        title={selectedTitle}
        description={selectedDescription}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 15,
          right: 15,
          display: 'flex',
          gap: 1,
        }}
      >
        {editMode ? (
          <>
            <Button
              onClick={() => {
                setNewEmail(savedEmail);
                setNewPhone(savedPhone);
                setNewTags(savedTags);
                setSelectedLangId('');
                setSelectedProficiency('');
                setEditMode(false);
              }}
              variant="outlined"
              sx={{
                borderColor: '#f0f5ef',
                color: '#f0f5ef',
                '&:hover': {
                  backgroundColor: '#42603c',
                  borderColor: '#f0f5ef',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: '#42603c',
                color: '#f0f5ef',
                '&:hover': { backgroundColor: '#354d30' },
              }}
            >
              Submit
            </Button>
          </>
        ) : (
          <IconButton
            onClick={() => setEditMode(true)}
            sx={{
              color: '#f0f5ef',
              backgroundColor: '#42603c',
              '&:hover': { backgroundColor: '#5a7a50' },
            }}
          >
            <Edit />
          </IconButton>
        )}
      </Box>
      <Stack>
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
          mb="5px"
        >
          Email
        </Typography>
        <Box mb="25px">
          <Box
            sx={{
              height: '8%',
              backgroundColor: '#42603c',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              paddingLeft: '10px',
            }}
          >
            <Typography
              fontFamily={'Verdana'}
              color="#f0f5ef"
              variant="h5"
              padding="4px"
            >
              {newEmail}
            </Typography>
          </Box>
        </Box>
        <Typography
          fontFamily="Verdana"
          fontWeight="bold"
          variant="h4"
          color="#f0f5ef"
          mb="5px"
        >
          {' '}
          Phone Number{' '}
        </Typography>
        <Box>
          {editMode ? (
            <TextField
              variant="outlined"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              fullWidth
              size="small"
              InputLabelProps={{ style: { color: '#f0f5ef' } }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#f0f5ef', // text color
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#42603c',
                  '& fieldset': {
                    borderColor: '#f0f5ef',
                  },
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
          ) : (
            <Box
              sx={{
                height: '8%',
                backgroundColor: '#42603c',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
                paddingLeft: '10px',
              }}
            >
              <Typography
                fontFamily={'Verdana'}
                color="#f0f5ef"
                variant="h5"
                padding="4px"
              >
                {newPhone}
              </Typography>
            </Box>
          )}
        </Box>
        <Grid container pt="25px">
          <Grid item xs={12}>
            <Typography
              fontFamily="Verdana"
              fontWeight="bold"
              variant="h4"
              color="#f0f5ef"
              mb="5px"
            >
              Tags:
            </Typography>
          </Grid>
          {priorityTags.map((tag) => {
            const hasTag = userTagIds.has(tag._id.trim());
            const hasRequest = requests.find(
              (req) =>
                req.title === tag.tagName &&
                Array.isArray(req.requestingUser) &&
                req.requestingUser.some((user) => user.userId === id)
            );
            const matchedUser = hasRequest?.requestingUser.find(
              (user) => user.userId === id
            );
            const matchStatus = matchedUser?.status;
            const wasRequested = requestedCert.includes(tag.tagName);
            const bgColor = hasTag ? '#42603c' : '#5d7159';

            return (
              <Grid
                item
                xs={5}
                key={tag._id}
                sx={{
                  backgroundColor: bgColor,
                  padding: 1,
                  m: 2,
                  borderRadius: 1,
                  border: '1px solid',
                }}
              >
                <Grid container>
                  <Grid item xs={10}>
                    <Typography
                      fontFamily="Verdana"
                      color="#f0f5ef"
                      variant="h6"
                    >
                      {tag.tagName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {hasRequest ? (
                      <Typography
                        fontFamily="Verdana"
                        color="#cce5cc"
                        variant="body2"
                      >
                        Status: {matchStatus}
                      </Typography>
                    ) : wasRequested ? (
                      <Typography
                        fontFamily="Verdana"
                        color="#cce5cc"
                        variant="body2"
                      >
                        Status: requested
                      </Typography>
                    ) : hasTag ? (
                      <Typography></Typography>
                    ) : (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ mt: 1 }}
                        onClick={() => {
                          setDialogOpen(true);
                          setSelectedTitle(tag.tagName);
                          setSelectedDescription(tag.tagDescription);
                        }}
                      >
                        Add
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
          {!editMode &&
            langs
              .filter((tag) =>
                (savedTags ?? []).some((utag) => utag.tagId === tag._id)
              )
              .map((tag) => {
                const matchedTag = savedTags.find(
                  (utag) => utag.tagId === tag._id
                );
                return (
                  <Grid
                    item
                    xs={5}
                    key={tag._id}
                    sx={{
                      padding: 1,
                      m: 2,
                      borderRadius: 1,
                      backgroundColor: '#42603c',
                      border: '1px solid',
                    }}
                  >
                    <Typography
                      fontFamily="Verdana"
                      color="#f0f5ef"
                      variant="h6"
                    >
                      {tag.tagName} – {matchedTag?.tagProf || 'N/A'}
                    </Typography>
                  </Grid>
                );
              })}
        </Grid>
        {editMode && (
          <>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ mt: 2, ml: 0.2 }}
            >
              <Grid item xs={5}>
                <TextField
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  value={selectedLangId}
                  onChange={(e) => setSelectedLangId(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black', // text color
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#42603c',
                      '& fieldset': {
                        borderColor: '#f0f5ef',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <option value="">Select a language</option>
                  {langs.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.tagName}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  select
                  fullWidth
                  SelectProps={{ native: true }}
                  value={selectedProficiency}
                  onChange={(e) => setSelectedProficiency(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'black', // text color
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#42603c',
                      '& fieldset': {
                        borderColor: '#f0f5ef',
                      },
                      '&:hover fieldset': {
                        borderColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <option value="">Select proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                  <option value="N/A">N/A</option>
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  disabled={!selectedLangId || !selectedProficiency}
                  onClick={() => {
                    const selectedTag = langs.find(
                      (tag) => tag._id === selectedLangId
                    );
                    if (!selectedTag) return;
                    if (
                      (newTags ?? []).some((t) => t.tagId === selectedTag._id)
                    )
                      return;

                    const newTag: userTag = {
                      tagId: selectedTag._id,
                      tag: selectedTag.tagName,
                      tagProf: selectedProficiency,
                    };

                    setNewTags((prev) => [...(prev ?? []), newTag]);
                    setSelectedLangId('');
                    setSelectedProficiency('');
                  }}
                  sx={{
                    backgroundColor: '#42603c',
                    color: '#f0f5ef',
                    '&:hover': { backgroundColor: '#354d30' },
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
            {/* Show added language tags as chips */}
            <Box
              sx={{ mt: 2, ml: 1.5, display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
              {(newTags ?? [])
                .filter((t) => langs.some((lang) => lang._id === t.tagId))
                .map((t, i) => (
                  <Chip
                    key={i}
                    label={`${t.tag} – ${t.tagProf}`}
                    onDelete={() => handleRemoveTag(t.tagId)}
                    sx={{
                      backgroundColor: '#42603c',
                      color: '#f0f5ef',
                    }}
                  />
                ))}
            </Box>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ mt: 2, ml: 0.2 }}
            >
              <Grid item xs={5}>
                <Typography>
                  Want a Language Not Listed? Request Here:
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={languageReq}
                  onChange={(e) => setLanguageReq(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  disabled={!languageReq}
                  onClick={handleLanguageRequest}
                >
                  Request
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Stack>
    </Box>
  );
}
