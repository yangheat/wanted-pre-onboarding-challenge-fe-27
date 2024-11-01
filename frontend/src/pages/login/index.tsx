import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    async function login() {
        const resoponse = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        return resoponse.json()
    }

    function handleLoginButtonClick() {
        login().then((result) => {
            if (result.details) {
                setErrorMessage(result.details)
            } else {
                localStorage.setItem('sessionToken', result.token)
                navigate('/')
            }
        }, (error) => {
            console.log('error:', error)
        })
    }

    return (
        <>
            <h1>login page</h1>
            <section>
                <label htmlFor="email">이메일: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </section>
            <section>
                <label htmlFor="password">패스워드: </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </section>
            <section>
                <button onClick={handleLoginButtonClick}>로그인</button>
                <button onClick={() => navigate('/signup')}>회원가입</button>
            </section>
            <section>
                {errorMessage ? errorMessage : null}
            </section>
        </>
    )
}