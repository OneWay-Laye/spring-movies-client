// exports an object with different messages to show the user

// this is useful because:
// 1. if we want to reuse between multiple comments it keeps code DRY
// 2. It groups together our messages so we can edit them all at once
// 3. If we wanted different files for different languages (english, spanish, etc.)
export default {
  signUpSuccess: 'Succesfully registered! You\'ve been signed in as well.',
  signUpFailure: 'Registration failed. Email may be taken, or passwords don\'t match.',
  signInSuccess: 'Welcome!',
  signInFailure: 'Failed to sign in. Check your email and password and try again.',
  signOutSuccess: 'Come back soon!',
  changePasswordSuccess: 'Password changed successfully!',
  changePasswordFailure: 'Failed to change passwords. Check your old password and try again.',
  indexMovieSuccess: 'Here\'s the list of movies',
  indexMovieFailure: 'Something went wrong',
  showMovieSuccess: 'Here is the movie you were looking for',
  showMovieFailure: 'Something went wrong showing your movie',
  createMovieSuccess: 'Your Movie was successfully created',
  createMovieFailure: 'There was an Error creating Your movie',
  updateMovieSuccess: 'Succesfully Updated Your Movie',
  updateMovieFailure: 'There was an Error Updating your movie'
}
