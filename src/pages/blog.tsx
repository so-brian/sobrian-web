import { NextPage } from "next";
import { BlogCard } from "../components/blog-card";

// const Blog: NextPage = () => {
//     return (
//         <div style={{
//             flexGrow: '1',
//             display: 'flex',
//             flexDirection: 'column',
//         }}>
//             <div style={{
//                 flexGrow: '2',
//                 backgroundColor: 'green',
//             }}>
//                 <BlogCard />

//             </div>

//             <div style={{
//                 flexGrow: '1',
//                 backgroundColor: 'orange',
//             }}>

//             </div>
//         </div>
//     );
// };

// export default Blog;

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type Repo = {
    name: string;
    stargazers_count: number;
};

export const getServerSideProps: GetServerSideProps<{
    repo: Repo;
}> = async () => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    return { props: { repo } };
};

export default function Page({
    repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return repo.stargazers_count;
}