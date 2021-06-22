import apiUrl from './../apiConfig'
import axios from 'axios'

export const indexMovies = (user) => {
  return axios({
    url: apiUrl + '/movies',
    // skip the method key because GET is the default
    // method: 'GET'
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const showMovie = (movie, user) => {
  return axios({
    url: apiUrl + '/movies/' + movie,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const createMovie = (movieData, user) => {
  return axios({
    url: apiUrl + '/movies',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      movie: movieData
    }
  })
}

export const updateMovie = (movieData, user) => {
  return axios({
    url: apiUrl + '/movies/' + movieData._id,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      movie: {
        title: movieData.title,
        director: movieData.director
      }
    }
  })
}
