'use client';
import React, { useState, useEffect } from 'react';
import { Box, Pagination, Typography } from '@mui/material';

interface DisplayFactsProps {
  facts: string[];
}

const shuffleArray = (array: string[]): string[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function DisplayFacts({ facts }: DisplayFactsProps) {
  const [shuffledItems, setShuffledItems] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setShuffledItems(shuffleArray(facts));
  }, [facts]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box
      height="90%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      padding="10px"
    >
      <Box
        flexGrow={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="h6"
          fontFamily="Verdana"
          color="#42603c"
          align="center"
        >
          {shuffledItems[page - 1] || 'No items to display'}
        </Typography>
      </Box>

      <Pagination
        count={shuffledItems.length}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
}
