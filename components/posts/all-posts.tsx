import React from 'react';
import { TPost } from '../../types/post-types';
import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';

interface IAllPostsProps {
  posts: TPost[];
}

const AllPosts : React.FC<IAllPostsProps> = (props) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts}  />
    </section>
  )
}

export default AllPosts