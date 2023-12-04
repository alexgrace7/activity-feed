import React, { FC, CSSProperties } from 'react';
import CreatePost from './CreatePost.tsx';
import ActivityPosts from './ActivityPosts.tsx';
import PostFilter from './PostFilter.tsx';
import { PostProvider } from './PostContext.tsx';

const Posts: FC = () => {
  //Posts Section of the App: Create Post, Post Filter, Activity Posts List

  const postsContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
  };

  return (
    <PostProvider>
      <div style={postsContainerStyle}>
        <CreatePost /> 
        <PostFilter />
        <ActivityPosts />
      </div>
    </PostProvider>
  );
};

export default Posts;
