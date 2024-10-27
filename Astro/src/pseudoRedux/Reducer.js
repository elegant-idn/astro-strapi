import { localStorageName } from "../../app.config"

export function Reducer(state, action, data) {
  if (action.type === 'LOGIN') {
    localStorage.setItem(localStorageName, JSON.stringify({
      token: data.token,
      login: data.login
    }))
    return data
  }else if (action.type === 'LOGOUT') {
    localStorage.removeItem(localStorageName) 
    return {
      token: null,
      login: null
    }
  }

  return state
}