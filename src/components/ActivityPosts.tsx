import React, { FC } from 'react';
import {
  Card, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePostContext, Post } from './PostContext.tsx';

const ActivityPosts: FC = () => {
  const {
    localData, setLocalData, keywordSearch, userSearch,
  } = usePostContext();

  // format date to be more readable (UX)
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString(undefined, options);
  };

  // inc/dec like count for post
  // add liked post to user's liked array so they can only like once
  const handleLike = (postId: string): void => {
    const likedPost: Post | undefined = localData.activity.find((obj) => obj.id === postId);
    if(!likedPost) return;
    if (localData.user.likedPosts.includes(postId)) {
      localData.user.likedPosts = localData.user.likedPosts.filter((post) => post !== postId);
      likedPost.likeCount -= 1;
    } else {
      localData.user.likedPosts.push(postId);
      likedPost.likeCount += 1;
    }
    setLocalData({ ...localData });
  };

  // delete a user's post
  const handleDelete = (postId: string): void => {
    // remove from posts array
    const updatedActivity = localData.activity.filter((post) => post.id !== postId);
    // remove from likedPosts if user liked it
    localData.user.likedPosts = localData.user.likedPosts.filter((post) => post !== postId);

    // udpate localData
    setLocalData((prevData) => ({
      ...prevData,
      activity: updatedActivity,
    }));
  };

  return (
    <>
      {localData.activity.map((post) => {
        const {
          username, profileImage, postContent, likeCount, timeStamp, id,
        } = post;

        // filter for username
        if (username && !username.toLowerCase().includes(userSearch.toLowerCase())) return null;
        if (postContent && !postContent.toLowerCase().includes(keywordSearch.toLowerCase())) return null;

        const isLiked = localData.user.likedPosts.includes(id);
        const thumbColor = isLiked ? 'primary' : 'secondary';
        const ownsPost = id.includes(localData.user.userName);
        const displayDate = formatDate(timeStamp);

        // eslint-disable-next-line consistent-return
        return (
          <div key={id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                margin: '20px 0',
                alignItems: 'center',
                borderRadius: '30px',
                boxShadow: '0px 2px 10px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
              }}
              component="div"
            >
              <div style={{
                padding: '20px',
                textAlign: 'center',
              }}
              >
                <CardMedia
                  sx={{
                    height: 100, width: 100, borderRadius: '50px', margin: '15px',
                  }}
                  image={profileImage}
                  title="green iguana"
                />
                <Typography gutterBottom variant="h6" component="div">
                  {username}
                </Typography>
              </div>
              <CardContent sx={{ width: '80%' }}>
                <Typography 
                  gutterBottom
                  variant="body2"
                  sx={{
                    wordBreak: 'break-word',
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {postContent}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {displayDate}
                </Typography>
                <CardActions sx={{justifyContent: { xs: 'center', md: 'left' } }}>
                  <Typography variant="body2" color="text.secondary" sx={{ marginRight: '10px' }}>
                    {likeCount}
                  </Typography>
                  <ThumbUpIcon color={thumbColor} onClick={() => handleLike(id)} style={{ cursor: 'pointer' }} />
                  {ownsPost && (
                    <DeleteIcon
                      color="error"
                      onClick={() => handleDelete(id)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </CardActions>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default ActivityPosts;
