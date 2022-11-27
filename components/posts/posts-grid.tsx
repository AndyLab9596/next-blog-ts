import React from 'react';
import { TPost } from '../../types/post-types';
import PostItem from './post-item';
import classes from './posts-grid.module.css';

interface IPostsGridProps {
    posts: TPost[];
}

const PostsGrid: React.FC<IPostsGridProps> = (props) => {
    const { posts } = props;

    return (
        <ul className={classes.grid}>
            {posts.map((post) => (
                <PostItem key={post.slug} post={post} />
            ))}
        </ul>
    )
}

export default PostsGrid