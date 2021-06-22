// This where we will get all of our movies (index)
import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import { showMovie } from './../../api/movies'
import messages from './../AutoDismissAlert/messages'

class ShowMovie extends Component {
  constructor () {
    super()

    this.state = {
      movie: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    const id = match.params.id

    showMovie(id, user)
      .then(res => {
        this.setState({ movie: res.data.movie })
      })
      .then(() => msgAlert({
        heading: 'Show Movie Success',
        message: messages.showMovieSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Show Movie Falure',
        message: messages.showMovieFailure,
        variant: 'danger'
      }))
  }

  render () {
    let moviesJsx = ''
    // const { title, director} = this.state

    if (this.state.movie === null) {
      moviesJsx = <Spinner animation="border" variant="primary" />
    } else if (this.state.movie.length === 0) {
      moviesJsx = <h3>There is No Movie to display.</h3>
    } else {
      moviesJsx = (
        <div>
          <h4>{this.state.movie.title}</h4>
          <p>Directed by: {this.state.movie.director}</p>
          <Link to={`/update-movie/${this.state.movie._id}`}><Button>Update Movie</Button></Link>
        </div>
      )
    }
    return (
      <Fragment>
        <h1>Here is</h1>
        {moviesJsx}
      </Fragment>
    )
  }
}
export default withRouter(ShowMovie)
