import React from "react"

export default function Comment({comment, user, created_at, user_image_url}) {
    return (
        <div className="comments-container">
        <div className="comment-card">
            <div className="comment-header">
                <div className="comment-user-section">
                {!user_image_url ? <div className="comment-avatar">
                {user.charAt(0).toUpperCase()}
                </div> : <img src={user_image_url} alt="" className="comment-avatar-img" />}
                <p className="comment-username">{user}</p>
                </div>
                <p className="comment-date">{created_at}</p>
            </div>
            <p className="comment-text">{comment}</p>
            </div>
        </div>
    )
}