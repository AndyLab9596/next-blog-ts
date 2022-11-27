import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { TPostWithContent } from '../types/post-types';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles() {
    return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // remove file extension

    const filePath = path.join(postsDirectory, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);


    const postData = {
        slug: postSlug,
        ...data,
        content
    } as TPostWithContent;

    return postData
}

export function getAllPosts() {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map((postFile) => getPostData(postFile));
    allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
    return allPosts;
}

export function getFeaturedPosts() {
    const allPosts = getAllPosts()
    return allPosts.filter((post) => post.isFeatured)
}