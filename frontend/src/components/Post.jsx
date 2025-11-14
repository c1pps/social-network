import { useState, memo } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Suspense } from 'react';
import Loader from './Loader';
const api_url = import.meta.env.VITE_API_URL;

function Post({id, author, image_url, content, likes, comments, author_image_url}) {
    const [likeCount, setLikeCount] = useState(likes)
    const [commentss, setCommentss] = useState(comments)
    const [showComments, setShowComments] = useState(false)

    async function handleClickOnLike() {
      const token = localStorage.getItem('jwt-token')
      try {
        const response = await fetch(`${api_url}/posts/${id}/like`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });
        if(!response.ok) {
          throw new Error('failed to fetch')
        }
          await response.json()
          setLikeCount((prev) => prev+1)
        } catch(error){                                 
         console.log(error)
      } 
    }

    async function createComment(comment) {
      const token = localStorage.getItem('jwt-token')
        try {
            const response = await fetch(`${api_url}/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    comment: comment,
                })
            });

            if(!response.ok) {
                throw new Error('failed to fetch')
            }
            const newComment = await response.json()
            setCommentss((prev) => [...prev, newComment.comment])
        } catch(error){
            console.log(error)
        }
    }

    return (        
      <Suspense fallback={{Loader}}>
        <div className="post-card-container">
          <Helmet>
            <title>Page d'Accueil</title>
            <meta name="description" content="Page d'accueil de l'application" />
          </Helmet>

          <article className="post-card" id={id}>
            <div className="post-header">
              {!author_image_url ? <div className="avatar">
                {author.split(' ').map(n => n[0]).join('')}
              </div> : <img src={author_image_url} alt="avatar" className="avatar" loading="lazy" decoding="async" />}
              <div className="author-info">
                <h3 tabIndex="0">{author}</h3>
                <p tabIndex="0">Il y a 2 heures</p>
              </div>
            </div>

            <img 
              src={image_url} 
              alt="publication" 
              className="post-image"
              tabIndex="0"
              loading="lazy"
              decoding="async"
            />

            <div className="post-content">
              <Link to={`/post/${id}`} style={{textDecoration: 'none'}}>
              <p className="post-text">{content}</p>
              </Link>

              <div className="post-footer">
                <div onClick={() => handleClickOnLike()} className="likes-section" tabIndex="0">
                  <svg 
                    className="heart-icon" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="likes-count">{likeCount.toLocaleString()}</span>
                  <span className="likes-label">J'aime</span>
                </div>

                <div className="action-buttons">
                  <button 
                    className="action-btn"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="action-label">{commentss.length}</span>
                  </button>
                  <button className="action-btn">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="partage-label">Partage</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {showComments && (
            <div className="comments-section">
              <CommentForm createComment={createComment} />
              <CommentList comments={commentss} />
            </div>
          )}
        </div>
      </Suspense>
    )
}

export default memo(Post)