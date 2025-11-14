import React, { memo } from "react";
import PostList from "./PostList";
import Comment from "./Comment";

function CommentList({comments}) {
    return (
        <div className="comments-container">
            {comments.map(({comment, user, created_at, user_image_url}, idx) => (
                <Comment 
                    key={created_at ?? idx}
                    comment={comment} 
                    user={user} 
                    created_at={created_at} 
                    user_image_url={user_image_url}
                />
            ))}
        </div>
    )
}

export default memo(CommentList)