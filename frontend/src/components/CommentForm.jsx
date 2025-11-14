import { useState } from "react"

export default function CommentForm({createComment}) {
    // const [user, setUser] = useState('')
    const [comment, setComment] = useState('')
    let token = localStorage.getItem('jwt-token')

    async function handleSubmit(e) {
        e.preventDefault()
        let usernameAccount = localStorage.getItem('username')
        console.log({comment})
        await createComment(comment)
    }

    return token ? (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                {/* <label htmlFor="user">Utilisateur</label>
                <input type="text" onChange={(e) => setUser(e.target.value)} /> */}

                <label htmlFor="comment">Commentaire</label>
                <input name="comment" id="comment" onChange={(e) => setComment(e.target.value)} />

                <button type="submit">Envoyer</button>
            </form>
        </div>
    ) : ( <div></div>)
}