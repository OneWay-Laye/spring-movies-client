import { Component } from 'react'
// you do not need to import React if youre not using React
import { withRouter } from 'react-router-dom'

// import the sign-out api axious call
import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  // When our component is first shown on the page
  componentDidMount () {
    // destructure our props
    const { msgAlert, history, clearUser, user } = this.props

    // make a sign out axios request
    // wether our sign out was Successful or failed on the server's side
    // Note: A little strange, that we tell the user it signed out Successfully,
    //      but it's because it will signOut Successfully locally
    signOut(user)
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      // wether it succeeds or fails -> send us to the home page
      .finally(() => history.push('/'))
      // wether it succeeds or fails -> clear the user (rest the user to 'null')
      .finally(() => clearUser())
  }

  render () {
    // We dont ever want to see a signout component
    // If someone wants to sign out, we want to sign them out and send them to the /
    // home page
    //
    // To render noting on the pasge, return a falsey value (like an ''(empty string))
    return ''
  }
}

export default withRouter(SignOut)
