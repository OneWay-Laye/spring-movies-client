// import React and the components and Fragment
import React, { Component, Fragment } from 'react'

// Import react from react-router-dom
import { Route } from 'react-router-dom'

// uuid - Universal unique ID
// this imports the fourth version of uuid and you can refer to it as uuid
import { v4 as uuid } from 'uuid'

// Import all of our components
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Movies from './components/Movies/Movies'
import ShowMovie from './components/ShowMovie/ShowMovie'
import CreateMovie from './components/CreateMovie/CreateMovie'
import UpdateMovie from './components/UpdateMovie/UpdateMovie'

// class components
class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // keep track of the signed in user we get back from the api
      // the user state initally be null (since we aren't signed in )
      user: null,
      // these are the messages we want to show our user. initally, we don't
      // have any messages
      msgAlerts: []
    }
  }

  // this function excepts a user, and then sets the user's state to the
  // parameter (used in SignIn/SignUp)

  setUser = user => this.setState({ user })

  // clear user will reset the user state back to null, this is used during signout
  clearUser = () => this.setState({ user: null })

  // accepts an id, so we know which msgAlert to delete
  deleteAlert = (id) => {
    // set the 'msgAlert' state
    // to what the msgAlerts used to be (state.msgAlert)
    // but filter for the messages, which dont have the id, we are trying to get to delete
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // This is the function that is called whenever we get a success or error messages
  // excepts 3
  // heading - title of the alert
  // message - body of alert
  // variant - bootstrap variant (color) to use (success, danger, primary, secondary)
  msgAlert = ({ heading, message, variant }) => {
    // create a unique id for this message alert. using the uudi v4
    // 1. used for the 'key attribute in a loop'
    // 2. used in 'deleteAlert', so we know which message to dekete
    const id = uuid()
    // set the 'msgAlert' state.
    // To be the existing 'msgAlert' (...state.msgAlerts)
    // and a new 'msgAlert' ({ heading, message, variant, id })

    // we have to use setState and a new array when updating 'msgAlert'
    // becausw the first rule of using state correctly, is to never modify state
    // directly. which adding an element to the end with 'push' would do.
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    // destructure our state
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        {/*
            add the top davbar to the screen
            we pass in the user prop to show the sign in / sign out urls
            also for our users email.
           */}
        <Header user={user} />

        {/* map each msgAlert into an AutoDismissAlert component */}
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
          // key attribute will be the msgAlert id from uuid v4
            key={msgAlert.id}

            // Pass down these props to show alert
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}

            // pass down these props to eventually remove the alert
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* Similar routes to the react-router lesson.
            we have to use 'render props' instead of 'component' prop
            to pass down 'msgAlert' and 'setUser' props
           */}
          <Route path='/sign-up' render={() => (
            // we pass the sign up component msgAlert to show success/failure messages
            // and setUser to keep track of the user (for their token & email)
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/*
            an AuthenticatedRoute is like a Route, but it redirects you to the
            home page if you aren't signed in
            You *must*
            There are multiple ways to sign out. this way allows us to signout by going to a specific / route
             */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            // Passing down clear user will set this user state to null after signing out
            // since signOut needs to make authenticated requests, pass down the user as a prop
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* authenticated route for the movies index page */}
          <AuthenticatedRoute user={user} exact path='/movies' render={() => (
            <Movies user={user} msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/movies/:id' render={() => (
            <ShowMovie user={user} msgAlert={this.msgAlert}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/create-movie' render={() => (
            <CreateMovie user={user} msgAlert={this.msgAlert} />
          )}/>
          <AuthenticatedRoute user={user} exact path='/update-movie/:id' render={() => (
            <UpdateMovie user={user} msgAlert={this.msgAlert} />
          )}/>
        </main>
      </Fragment>
    )
  }
}

export default App
