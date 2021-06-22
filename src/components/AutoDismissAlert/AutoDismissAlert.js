import React from 'react'
import Alert from 'react-bootstrap/Alert'

// this adds a custome style sheet for AutoDismissAlert component
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // add 'show' state which will show our Alert when true
      show: true
    }
    this.timeoutId = null
  }

  // This function will run when when the  when it is first mounted
  // mounted - created and inserted into the dom
  componentDidMount () {
    // run the 'this.handleClose' function after 5 seconds
    // store the timer's id (this.timeoutId) so we can cancel the timer if needed
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // when the component is removed from the screen (unmounted)
  // (unmounted - remove from the dom)
  componentWillUnmount () {
    // stop out timer, by passing it the timer's id
    // we need to make sure 'handleClose' doesn't run if our component has been
    // unmounted. If ir component has been unmounted, try to set its state will
    // cause a bug.
    clearTimeout(this.timeoutId)
  }

  // this method set the show state to 'false'
  handleClose = () => this.setState({ show: false })

  render () {
    // destructure our props
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      <Alert
      // dismissible ands a 'x' to dismiss (close) the alert
        dismissible
        // if show state is true: show our alert
        show={this.state.show}
        // variant sets the color with BS
        variant={variant}
        // when the x is clicked, stop showing the alert
        onClose={this.handleClose}
      >

        {/* notice how we can use a regular bootstrap class. to center our content */}
        <div className="container">
          {/* This adds a title (heading) for our alert */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          {/* This is the body for thr alert */}
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

export default AutoDismissAlert
