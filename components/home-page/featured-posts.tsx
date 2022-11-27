import React from 'react'
import { TPost } from '../../types/post-types';
import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

interface IFeaturedPostsProps {
  posts: TPost[];
}

const FeaturedPosts: React.FC<IFeaturedPostsProps> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default FeaturedPosts