import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function PostDetails() {
    const [post, setPost] = useState(null);
    const {id} = useParams()
    console.log(id)

    useEffect(() => {
    async function fetchPost() {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!response.ok) {
                throw new Error('failed to fetch')
            }
            const postData = await response.json()
            console.log(postData.post)
            setPost(postData.post)

            } catch(error){                                 
                console.log(error)
            } 
        }

        fetchPost()
    }, [])
    return (
  <div className="post-details">
    {post ? (
      <article className="post-details-card">
        <header className="post-details-header">
          {!post.author_image_url ? <div className="avatar">
              {author.split(' ').map(n => n[0]).join('')}
            </div> : <img src={post.author_image_url} alt="" className="avatar" />}
          <div className="author-info">
            <h3>{post.author}</h3>
            <p>Publié récemment</p>
          </div>
        </header>

        <img
          className="post-details-image"
          src={post.image_url}
          alt={post.author}
        />

        <section className="post-details-body">
          <p className="post-details-content">{post.content}</p>

          <div className="post-details-stats">
            <span>❤️ {post.likes.toLocaleString()} likes</span>
            <span>💬 {post.comments.length} commentaires</span>
          </div>
        </section>

        <section className="post-details-comments">
          <h4>Commentaires</h4>
          <ul>
            {post.comments.map((c, i) => (
              <li key={i} className="comment-item">
                <div className="comment-header">
                  <strong>{c.user}</strong>
                  <time>{new Date(c.created_at).toLocaleDateString()}</time>
                </div>
                <p>{c.comment}</p>
              </li>
            ))}
          </ul>
        </section>
      </article>
    ) : (
      <div></div>
    )}
  </div>
);
}