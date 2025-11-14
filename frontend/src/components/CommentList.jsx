import React from "react";
import PostList from "./PostList";
import Comment from "./Comment";

export default function CommentList({comments}) {
    return (
        <div className="comments-container">
            {comments.map(({comment, user, created_at, user_image_url}) => (
                <Comment 
                    comment={comment} 
                    user={user} 
                    created_at={created_at} 
                    user_image_url={user_image_url}
                />
            ))}
        </div>
    )
}