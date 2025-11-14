import React, { memo } from "react"

function Comment({comment, user, created_at, user_image_url}) {
    return (
        <div className="comments-container">
        <div className="comment-card">
            <div className="comment-header">
                <div className="comment-user-section">
                {!user_image_url ? <div className="comment-avatar">
                {user.charAt(0).toUpperCase()}
                </div> : <img src={user_image_url} alt="" className="comment-avatar-img" loading="lazy" decoding="async" />}
                <p className="comment-username" tabIndex="0">{user}</p>
                </div>
                <p className="comment-date" tabIndex="0">{created_at}</p>
            </div>
            <p className="comment-text" tabIndex="0">{comment}</p>
            </div>
        </div>
    )
}

export default memo(Comment)