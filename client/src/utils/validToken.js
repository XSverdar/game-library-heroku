import TokenService from '../services/TokenService'
export async function validToken() {
  const url = 'http://localhost:3000/api/auth/valid-token'
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: TokenService.getLocalAccessToken()
    }),
  })

  if (response.ok) {
    return true
  }
  return false
}