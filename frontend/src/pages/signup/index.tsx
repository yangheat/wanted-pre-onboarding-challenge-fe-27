import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    function handleSignupButtonClick() {
        if (password !== passwordConfirm) {
            setErrorMessage('패스워드가 다릅니다.')
            return
        }

        fetch('http://localhost:8080/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then((response) => response.json()).then((result)=> {
            if (result.details) {
                setErrorMessage(result.details)
            } else {
                console.log('계정 생성에 성공했습니다.')
                navigate('/login')
            }
            console.log(result)
        })
    }

    return (
        <>
            <h1>회원가입</h1>
            <section>
                <label htmlFor="email">이메일: </label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
            </section>
            <section>
                <label htmlFor="password">패스워드: </label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </section>
            <section>
            <label htmlFor="passwordConfirm">패스워드 확인: </label>
            <input type="password" name="passwordConfirm" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
            </section>
            <section>
                <button onClick={handleSignupButtonClick}>회원가입</button>
                <button onClick={() => navigate('/login')}>취소</button>
            </section>
            <section>
                {errorMessage ? errorMessage : null}
            </section>
        </>
    )
}