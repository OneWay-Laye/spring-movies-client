import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MovieForm = ({ handleChange, handleSubmit, movie }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId='title'>
      <Form.Label>Movie Title</Form.Label>
      <Form.Control
        type='text'
        name='title'
        value={movie.title || ''}
        placeholder = 'Movie Title Goes Here'
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group controlId='director'>
      <Form.Label>Movie Director</Form.Label>
      <Form.Control
        type='text'
        name='director'
        value={movie.director || ''}
        placeholder = 'Movie Director Goes Here'
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button type="submit">Submit Movie</Button>
  </Form>
)

export default MovieForm
