import Image from 'next/image';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { TPostWithContent } from '../../../types/post-types';
import classes from './post-content.module.css';
import PostHeader from './post-header';
import { PrismLight as SyntaxHighlightner } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

interface IPostContentProps {
    post: TPostWithContent;
}

SyntaxHighlightner.registerLanguage('js', js);
SyntaxHighlightner.registerLanguage('css', css);

const PostContent: React.FC<IPostContentProps> = ({ post }) => {
    const { title, image, content, slug } = post;
    const imagePath = `/images/posts/${slug}/${image}`;

    const customRenderers = {
        p(paragraph: any) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                return <div className={classes.image} >
                    <Image src={`/images/posts/${post.slug}/${image.properties.src}`} alt={image.properties.alt} width={600} height={300} />
                </div>
            }

            return <p>{paragraph.children}</p>;
        },

        code(code: any) {
            const { className, children } = code;
            const language = className.split('-')[1]
            // eslint-disable-next-line react/no-children-prop
            return <SyntaxHighlightner style={atomDark} language={language} children={children} />
        }

    }

    return (
        <article className={classes.content}>
            <PostHeader title={title} image={imagePath} />
            <ReactMarkdown components={customRenderers}>
                {content}
            </ReactMarkdown>
        </article>
    )
}

export default PostContent;