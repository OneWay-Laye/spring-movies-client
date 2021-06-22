import React, { Component, Fragment } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import MovieForm from './../shared/MovieForm'
import { showMovie, updateMovie } from './../../api/movies'
import messages from './../AutoDismissAlert/messages'

class UpdateMovie extends Component {
  constructor () {
    super()

    this.state = {
      movie: {
        title: '',
        author: null
      },
      updated: false
    }
  }

  componentDidMount () {
    const { user, match } = this.props
    const id = match.params.id

    showMovie(id, user)
      .then(res => this.setState({ movie: res.data.movie }))
      .catch()
  }

  handleChange = (event) => {
    event.persist()

    const updatedField = { [event.target.name]: event.target.value }

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

    console.log(this.state.movie)
    updateMovie(this.state.movie, user)
      .then(res => console.log(res))
      .then(this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Update Movie Success',
        message: messages.updateMovieSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Update Movie Failed',
        message: messages.updateMovieFailure,
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.updated) {
      return <Redirect to={`/movies/${this.state.movie._id}`} />
    }

    return (
      <Fragment>
        <h2>Update a Movie</h2>
        <MovieForm
          movie={this.state.movie}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default withRouter(UpdateMovie)
