import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/post-util';
import { TPostWithContent } from '../../types/post-types';

export const getStaticProps: GetStaticProps<{ posts: TPostWithContent[] }> = async () => {
  const featuredPosts = getAllPosts();
  return {
    props: {
      posts: featuredPosts,
    },
  }
}

const AllPostsPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name='description' content='A list of all programming-related tutorials and posts' />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  )
}

export default AllPostsPage