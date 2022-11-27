import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import React, { Fragment } from 'react'
import FeaturedPosts from '../components/home-page/featured-posts'
import Hero from '../components/home-page/hero'
import { getFeaturedPosts } from '../lib/post-util';
import { TPostWithContent } from '../types/post-types';

export const getStaticProps: GetStaticProps<{ posts: TPostWithContent[] }> = async () => {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts,
    },
    revalidate: 60
  }
}

const HomePage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <title>Tang Wei</title>
        <meta name='description' content='I post about programming and web development' />
      </Head>
      {/* Hero */}
      <Hero />
      {/* FeaturedPosts */}
      <FeaturedPosts posts={posts} />
    </Fragment>
  )
}

export default HomePage