import Image from 'next/legacy/image';
import Link from 'next/link';
import React from 'react'
import { TPost } from '../../types/post-types';
import classes from './post-item.module.css';

interface IPostItemProps {
  post: TPost;
}

const PostItem: React.FC<IPostItemProps> = (props) => {
  const { title, image, excerpt, date, slug } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`} legacyBehavior>
        <a>
          <div className={classes.image}>
            <Image src={imagePath} alt={title} width={300} height={200} layout='responsive' />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
          </div>
        </a>
      </Link>
    </li>
  )
}

export default PostItem