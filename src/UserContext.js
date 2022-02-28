import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_TOKEN, USER_GET } from './api';
export const UserContext = React.createContext()

export function UserStorage({children}) {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()
  
  

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const {url, options} = TOKEN_POST({username, password})
      const tokenRes = await fetch(url, options)
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`)
      const {token} = await tokenRes.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/account')
    } catch (err) {
      setLogin(false)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  async function getUser(token) {
    const {url, options} = USER_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
    setLogin(true)
    console.log(json)
  }
  
  const userLogout = React.useCallback(async () => {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate('/login')
  }, [navigate]) 
  
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          const {url, options} = TOKEN_VALIDATE_TOKEN(token)
          const response = await fetch(url, options)
          if (!response.ok) {
            throw new Error('Invalid Token')
          }
          await getUser(token)
        } catch (err) {
          userLogout()
          setError(err.message)
        }
        finally {
          setLoading(false)
        }
      } else {
        setLogin(false)
      }
    }
    autoLogin()
  }, [userLogout])
  return (
    <UserContext.Provider value={{userLogin, data, userLogout, error, loading, login}}>
      {children}
    </UserContext.Provider>
  )
}
