import React, { FC, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { usePostContext } from './PostContext.tsx';

const PostFilter: FC = () => {
  // variables changes in PostContext
  const {
    userSearch,
    setUserSearch,
    keywordSearch,
    setKeywordSearch,
  } = usePostContext();

  // handle username search field input
  const handleUserSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserSearch(event.target.value);
  };

  // handle keyword search field input
  const handleKeywordSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setKeywordSearch(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography gutterBottom variant="h6" component="div">
        Filter Posts
      </Typography>
      <Container sx={{
        display: 'flex',
        maxWidth: { xs: 'none', md: 'none' },
        margin: '0',
        padding: { xs: '0', md: '0' },
        flexDirection: { xs: 'column', md: 'row' },
        columnGap: '20px',
        rowGap: '20px',
      }}
      >
        <TextField
          sx={{
            width: { xs: '100%', md: '50%' },
          }}
          value={userSearch}
          id="user-search"
          label="Username"
          variant="outlined"
          onChange={handleUserSearchChange}
        />
        <TextField
          sx={{
            width: { sm: '100%', md: '50%' },
          }}
          id="keyword-search"
          label="Keywords"
          variant="outlined"
          value={keywordSearch}
          onChange={handleKeywordSearchChange}
        />
      </Container>
    </div>
  );
};

export default PostFilter;
