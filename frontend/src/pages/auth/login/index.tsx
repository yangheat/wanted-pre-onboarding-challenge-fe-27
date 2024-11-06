import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authController } from '../../../entities/auth'
import { Account } from '../../../entities/auth/model/types'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const auth = new authController()

  async function login(params: Account) {
    const response = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })

    if (!response.ok) {
      throw Error(`${response.status} (${response.statusText})`)
    }

    return response.json()
  }

  function handleLoginButtonClick() {
    login({email, password}).then((result) => {
        auth.setToken(result.token)
        navigate('/')
      }
    ).catch((error) => {
      debugger
      alert(error)
    })
  }

  return (
    <>
      <h1>login page</h1>
      <section>
        <label htmlFor="email">이메일: </label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </section>
      <section>
        <label htmlFor="password">패스워드: </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </section>
      <section>
        <button onClick={handleLoginButtonClick}>로그인</button>
        <button onClick={() => navigate('/auth/signup')}>회원가입</button>
      </section>
      <section>{errorMessage ? errorMessage : null}</section>
    </>
  )
}
