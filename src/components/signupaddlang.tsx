'use client';
import React, { useState } from 'react';
import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface Tags {
  tagName: string;
  tagProf: string;
}

interface SignUpAddLangProps {
  Languages: string[];
  UserTags: (Tags | null)[];
}

export function SignUpAddLang({ Languages, UserTags }: SignUpAddLangProps) {
  //const [selectedLangs, setSelectedLangs] = useState<string[]>([]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [selectedProf, setSelectedProf] = useState<string>('');

  const [userTags, setUserTags] = useState<Tags[]>(
    UserTags.filter((tag): tag is Tags => tag !== null)
  );
  //const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  const handleListItemClick = (item: string) => {
    setSelectedItem(item);
    setSelectedProf('');
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProf(event.target.value);
  };

  const handleFormSubmit = () => {
    if (!selectedItem || !selectedProf) {
      // If either selectedItem or selectedProf is not set, do not proceed with the submission
      alert('Please select a language and a profession');
      return;
    }

    // Ensure that no tag with the same tagName and tagProf exists
    if (
      !userTags.some(
        (tag) => tag.tagName === selectedItem && tag.tagProf === selectedProf
      )
    ) {
      // Create a new tag with selected tagName and tagProf
      const newTag: Tags = { tagName: selectedItem, tagProf: selectedProf };

      // Correctly update the state by using the previous state
      setUserTags((prevUserTags) => [...prevUserTags, newTag]);
    }
    // Reset selected values after submission
    setSelectedItem(null); // Reset selected language
    setSelectedProf(''); // Reset selected profession
  };

  const handleChipDelete = (chipValue: string) => {
    setUserTags((prevUserTags) =>
      prevUserTags.filter(
        (tag) => `${tag.tagName} - ${tag.tagProf}` !== chipValue
      )
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">Select an Item:</Typography>
        <List>
          {Languages.map((item) => (
            <ListItem
              button
              key={item}
              onClick={() => handleListItemClick(item)}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Grid>

      <Grid item xs={6}>
        {selectedItem && (
          <Box>
            <Typography variant="h6">
              Select a Proficiency for {selectedItem}:
            </Typography>
            <RadioGroup value={selectedProf} onChange={handleRadioChange}>
              <FormControlLabel
                value="Beginner"
                control={<Radio />}
                label="Beginner"
              />
              <FormControlLabel
                value="Intermediate"
                control={<Radio />}
                label="Intermediate"
              />
              <FormControlLabel
                value="Advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
            <Box mt={2}>
              <Button variant="contained" onClick={handleFormSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        )}
      </Grid>

      <Grid item xs={12}>
        <Box mt={3}>
          <Typography variant="h6">Current Tags:</Typography>
          <Box mt={1}>
            {userTags.length > 0 ? (
              userTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={`${tag.tagName} - ${tag.tagProf}`}
                  onDelete={() =>
                    handleChipDelete(`${tag.tagName} - ${tag.tagProf}`)
                  }
                  sx={{ margin: '4px' }}
                />
              ))
            ) : (
              <Typography>No tags available</Typography>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
