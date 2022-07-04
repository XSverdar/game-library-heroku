import jwt_decode from 'jwt-decode'

class TokenService {
  getLocalAccessToken() {
    return localStorage.getItem('access')
  }
  getLocalRefreshToken() {
    return localStorage.getItem('refresh')
  }
  updateLocalAccessToken(token) {
    localStorage.setItem('access', token)
  }
  getUser() {
    return localStorage.getItem('user')
  }
  setUser(user) {
    localStorage.setItem('user', user)
  }
  removeUser() {
    localStorage.removeItem('user')
  }
  removeToken() {
    localStorage.removeItem('access')
  }
  getDecoded() {
    const token = localStorage.getItem('access')
    const decoded = jwt_decode(token)
    return decoded
  }
}
export default new TokenService()