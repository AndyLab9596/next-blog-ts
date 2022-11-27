type TPost = {
    title: string;
    image: string;
    excerpt: string;
    date: string;
    slug: string;
}

type TPostWithContent = TPost & {
    content: string;
    isFeatured: boolean;
}

export type {
    TPost,
    TPostWithContent
}