// This where we will get all of our movies (index)
import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Link } from 'react-router-dom'

import { indexMovies } from './../../api/movies'
import messages from './../AutoDismissAlert/messages'

class Movies extends Component {
  constructor () {
    super()

    this.state = {
      // eventually - our state will be filled up with Movies
      // Initial state - what should it be
      // START off as 'null'
      // if we got back an empty array from the db - we want that
      // to be different from our initial value
      movies: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    // When the component mounts (is first displayed in the DOM)
    // We want to load the movies from the API
    indexMovies(user)
      .then(res => this.setState({ movies: res.data.movies }))
      .then(() => msgAlert({
        heading: 'Movie Index Success',
        message: messages.indexMovieSuccess,
        variant: 'success'
      }))
      .catch(() => {
        msgAlert({
          heading: 'Movie Index Failed',
          message: messages.indexMovieFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // Pattern: define var for our JSX
    // & set it's value to be different things
    // based on our data/state of our app etc.
    let moviesJsx = ''

    // First, checl if movies is 'null' (the initial value)
    if (this.state.movies === null) {
      moviesJsx = <Spinner animation="border" variant="primary" />
    } else if (this.state.movies.length === 0) {
      moviesJsx = <h3>No movies to display! Go make some movies man!</h3>
    } else {
      moviesJsx = (
        <ul>
          {this.state.movies.map(movie => (
            <div key={movie._id}>
              <Link to={`/movies/${movie._id}`}>
                <li>{movie.title}</li>
              </Link>
            </div>
          ))}
        </ul>
      )
    }

    return (
      <Fragment>
        <h2>Wassup Neen</h2>
        {moviesJsx}
      </Fragment>
    )
  }
}

export default Movies
