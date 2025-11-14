import React, { useEffect, useState } from "react";
import Post from "./Post";
import Loader from "./Loader";
const api_url = import.meta.env.VITE_API_URL;

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            try {   
                const response = await fetch(`${api_url}/api/posts`);
                if(!response.ok) {
                    throw new Error('failed to fetch')
                }
                const {posts} = await response.json()
                setPosts(posts)
                setLoading(false)
            } catch(error) {            
                console.log(error)
                setLoading(false)
            } 
        }

        fetchPosts()
    }, [])
    
    if(loading) {
        return <Loader />
    }
    return (
        <div className="post-card-block">
            {posts.map(({id, author, image_url, content, likes, comments, author_image_url}) => <Post id={id} author={author} image_url={image_url} content={content} likes={likes} comments={comments} author_image_url={author_image_url} />)}
        </div>
    )
}