// import apiUrl so we can make auth request to the API
import apiUrl from '../apiConfig'
import axios from 'axios'

// add a named, export that exports our signUp function
// in other files, we can import it with 'destructuring syntax'
// ex. import { signUp } from '../../api/auth'

// SignUp expects a credentials object with an email, password, and passwordConfirmation
// in the same format from the SignUp component's state
export const signUp = credentials => {
  // make out axious request to sign up
  return axios({
    // the Method and url are the same from jQuery
    method: 'POST',
    url: apiUrl + '/sign-up',
    // The information is come from SignUp state
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    // the Method and url are the same from jQuery
    url: apiUrl + '/sign-in',
    method: 'POST',
    // The information is come from SignUp state
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

// to signOut we must accepte the user
export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      // We use the user that we accept so we can sign them out by token
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
