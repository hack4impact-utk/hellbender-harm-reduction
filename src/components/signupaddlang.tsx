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
  // state for list item
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // state for proficiency
  const [selectedProf, setSelectedProf] = useState<string>('');

  // state for all tags (imported and added)
  const [userTags, setUserTags] = useState<Tags[]>(
    UserTags.filter((tag): tag is Tags => tag !== null)
  );

  // if list item is clicked
  const handleListItemClick = (item: string) => {
    setSelectedItem(item);
    setSelectedProf('');
  };

  // if proficiency is selected
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProf(event.target.value);
  };

  // if language is added
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

  // if you delete one of the languages at the bottom
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
            <br></br>
            <RadioGroup value={selectedProf} onChange={handleRadioChange}>
              <Typography>
                At the Beginner level, an individual can communicate short
                messages on highly predictable, familiar every day topics. They
                can piece together vocabulary to create sentences but tend to
                rely on memorized and learned phrases.
              </Typography>
              <FormControlLabel
                value="Beginner"
                control={<Radio />}
                label="Beginner"
              />
              <br></br>
              <Typography>
                At the Intermediate level, an individual can handle
                uncomplicated tasks and social situations requiring an exchange
                of information. They can provide paragraph-length narratives in
                past, present, and future but with inconsistency.
              </Typography>
              <FormControlLabel
                value="Intermediate"
                control={<Radio />}
                label="Intermediate"
              />
              <br></br>
              <Typography>
                At the Advanced level, an individual is either a native-speaker
                or can speak the language with near-native fluency and accuracy.
                They will be sufficient in formal and professional conversations
                and can handle both concrete and abstract concepts.
              </Typography>
              <FormControlLabel
                value="Advanced"
                control={<Radio />}
                label="Advanced"
              />
            </RadioGroup>
            <Box mt={2}>
              <Button variant="contained" onClick={handleFormSubmit}>
                Add Language
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
