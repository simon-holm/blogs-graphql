import React, { Component } from 'react'

export const FeedContext = React.createContext()

class FeedProvider extends Component {
  state = {
    feedVariables: {
      skip: 0,
      limit: 5,
      searchTerm: ''
    }
  }
  paginateBack = () => {
    console.log('GOING BACK')
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip - 5
      }
    }))
  }

  paginateForward = () => {
    console.log('GOING FORWARD')
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip + 5
      }
    }))
  }

  render() {
    return (
      <FeedContext.Provider
        value={{
          ...this.state,
          paginateBack: this.paginateBack,
          paginateForward: this.paginateForward
        }}
      >
        {this.props.children}
      </FeedContext.Provider>
    )
  }
}

export default FeedProvider
