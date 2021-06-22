import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import MovieForm from './../shared/MovieForm'
import { createMovie } from './../../api/movies'
import messages from '../AutoDismissAlert/messages'

class CreateMovie extends Component {
  constructor () {
    super()

    this.state = {
      movie: {
        title: '',
        director: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    // Combine curent state from the value of the input the user is typing
    // Input 'name' will match the key in our 'This.state.movies' object

    const updatedField = { [event.target.name]: event.target.value }
    // Spread operator 'spreads' out the values from data types
    // It'll take an object '{ title: 'hello' }' & turn it into `title: hello`

    this.setState((currentState) => {
      return { movie: {
        ...currentState.movie,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, msgAlert } = this.props

    createMovie(this.state.movie, user)
      .then(res => this.setState({ createdId: res.data.movie._id }))
      .then(() => msgAlert({
        heading: 'Create Movie Success!',
        message: messages.createMovieSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Error Creating movie',
        message: messages.createMovieFailure,
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/movies/${this.state.createdId}`} />
    }

    return (
      <Fragment>
        <h2>Create a Movie</h2>
        <MovieForm
          movie={this.state.movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default CreateMovie
