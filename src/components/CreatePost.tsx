import React, { useState, useRef, ChangeEvent, FC } from 'react';
import Container from '@mui/material/Container';
import { Button, TextField } from '@mui/material';
import { usePostContext } from './PostContext.tsx';

const CreatePost: FC = () => {
  const { localData, setLocalData } = usePostContext();
  const [textInput, setTextInput] = useState<string>('');
  const textFieldRef = useRef<HTMLInputElement>(null);

  // handle input from create post text field
  const handleTextInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setTextInput(event.target.value);
  };

  // generate new post date formatted like posts at endpoint (consistency)
  const generateDate = (): string => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
    return formattedDate;
  };

  const handleSubmit = (): void => {
    const date = generateDate();
    // original format does not include seconds
    // generate date w/ secs so 2 posts in same minute don't match
    const dateId = Date.now();
    const newPost = {
      id: `${localData.user.userName}${dateId}`,
      postContent: textInput,
      likeCount: 0,
      profileImage: localData.user.profileImage,
      timeStamp: date,
      username: localData.user.userName,
    };
    // push new post to top of posts array
    localData.activity.unshift(newPost);
    // clear text field
    setTextInput('');
    // update localData
    setLocalData({ ...localData });
  };

  return (
    <Container 
      sx={{
        display: 'flex',
        padding: { xs: '0', md: '0' },
        flexDirection: 'column',
        rowGap: '10px',
        marginBottom: '50px',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        value={textInput}
        label="Create a Post"
        id="create-post"
        multiline
        inputProps={{ maxLength: 200 }}
        onChange={handleTextInput}
        ref={textFieldRef}
      />
      <Button
        sx={{ maxWidth: '200px', color: 'white' }}
        variant="contained"
        onClick={handleSubmit}
        disabled={textInput.trim().length === 0}
      >
        Submit
      </Button>
    </Container>
  );
};

export default CreatePost;
