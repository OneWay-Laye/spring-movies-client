import React, { Component } from 'react'

// the route props are props passed to components rendered by react. They are:
// 1. match- allows us to get route params
// 2. history - allows us to change the current url (like Redirect)
// 3. location - allows us to get urrent ifo about the current page

// we import withRouter, to give SignUp access to all 3 listed above ^^^
import { withRouter } from 'react-router-dom'

// here we are importing the signIn api call
import { signIn } from '../../api/auth'

// here we import the messages
import messages from '../AutoDismissAlert/messages'

// here we are importing the button and form from bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignIn extends Component {
  constructor (props) {
    super(props)

    // here we are seting the state email and password to an empty string
    this.state = {
      email: '',
      password: ''
    }
  }

  // This right here declaring the handle change function
  // handle change function is setting the state of [event.target.name] ex. event,target.email
  // to the value of event.target.value ex. email='alaye@t'
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  // Here we are definging what happens when a user signs in
  onSignIn = event => {
    event.preventDefault()

    // deconstructing this.props so our code can be dry
    const { msgAlert, history, setUser } = this.props

    // Here we are running the sign in api call and we pass in the current version of this.state
    signIn(this.state)
      // here we are seting the result of the api request
      // and setting the user to res.data.user
      // res.data.user is equal to things like email, password, token, id,
      .then(res => setUser(res.data.user))
      // after we set the user we want to send a message.
      // we are importing the body of the message from our messages file above.
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      // then we are redirecting our user to the home page using history.push
      .then(() => history.push('/'))
      // .catch will catch any error and send us a message and clear the form field
      // we are clearing the form fields by setting the state to empty strings
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign In</h3>
          <Form onSubmit={this.onSignIn}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                // any time a change occurs, call 'this.handleChange' to update.
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                // any time a change occurs, call 'this.handleChange' to update.
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
