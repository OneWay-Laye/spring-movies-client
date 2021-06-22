import React, { Component } from 'react'
// the route props are props passed to components rendered by react. They are:
// 1. match- allows us to get route params
// 2. history - allows us to change the current url (like Redirect)
// 3. location - allows us to get urrent ifo about the current page

// we import withRouter, to give SignUp access to all 3 listed above ^^^
import { withRouter } from 'react-router-dom'

// import the SignUp and SignIn axios function
import { signUp, signIn } from '../../api/auth'

import messages from '../AutoDismissAlert/messages'

// import a form and button from react-bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the email, password, and passwordConfirmation in state
      // start these pieces of state as empty string so we can type into input
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  //
  handleChange = event => {
    this.setState({
      // event .target is the element that caused the change event
      // set the state with input's name (event.target.name, ex name='email')
      // to the input's new value (event.target.value, ex. b@b11)
      [event.target.name]: event.target.value
    })

    // const stateChange = {}
    // stateChange[event.target.name] = event.target.value
    //
    // this.setState(stateChange)
  }

  // this is run everytime the form is submitted
  onSignUp = event => {
    event.preventDefault()

    // Destructure our props, so it is easier to see our intent
    // msgAlert and setUser are being passed down by app
    // history is being passed down from router
    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
    // if we SignUp successfully, then sign in
      .then(() => signIn(this.state))
      // if we signed in successfully, set thr user to the one in our response's data
      // (res.data.user)
      .then(res => setUser(res.data.user))
      // call msgAlert, to show a message that we signed up successfully
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      // then send a user to the home page. kinda like <Redirect to='/' />
      .then(() => history.push('/'))
      .catch(error => {
        // if an error occured, clear out credentials
        // by setting them to their original values
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // show an error message
        msgAlert({
          // add the actuall error message to the end of the title (for more tech savy users)
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure the state, so we can show our intent more easily
    const { email, password, passwordConfirmation } = this.state

    return (
      // use the bootstrap grod by adding a row class inside of a constainer (in App.js)
      <div className="row">
        {/* Make the form responsive.
          on xs screens, take up all columns
          on small screens, take up 10/12 columns
          on medium screens and up, take up 8/12 columns

           mx-auto: means set the x axis (left and right) margin automatically
           mt-5 is: means it is setting the top margin spacer */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* This form */}
          <Form onSubmit={this.onSignUp}>
            {/* Form group wraps a form control (input), its label, and help (or validation) text */}
            <Form.Group controlId="email">
              {/*  */}
              <Form.Label>Email address</Form.Label>
              {/*
                Form
                Form.Control allows us to enter data into a form such as an imput, select or text area an import
                */}
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
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
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

// call withRouter so SignUp has access to the 'route props'
export default withRouter(SignUp)
