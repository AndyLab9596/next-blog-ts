import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import React, { Fragment } from 'react'
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/post-util';
import { TPostWithContent } from '../../types/post-types';

const PostDetailPage = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  const postFiles = getPostsFiles();
  const slugs = postFiles.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') }
  }));

  return {
    paths: slugs,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<{ post: TPostWithContent }> = async (context: GetStaticPropsContext<ParsedUrlQuery>) => {
  const { params } = context;
  const { slug } = params as ParsedUrlQuery;
  const postData = getPostData(slug as string);

  return {
    props: {
      post: postData
    },
    revalidate: 600
  }
}

export default PostDetailPage