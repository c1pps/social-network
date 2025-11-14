import React from "react";
import PostList from "../components/PostList";
import { Helmet } from 'react-helmet';
const api_url = import.meta.env.VITE_API_URL;

export default function Home() {
    return (
        <>
            <Helmet>
                <link rel="preconnect" href={api_url} />
            </Helmet>
            <PostList />
        </>
    )
}