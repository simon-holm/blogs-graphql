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
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip - 5
      }
    }))
  }

  paginateForward = () => {
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip + 5
      }
    }))
  }

  paginateTo = pageNumber => {
    const skip = pageNumber * this.state.feedVariables.limit
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip
      }
    }))
  }

  render() {
    return (
      <FeedContext.Provider
        value={{
          ...this.state,
          paginateBack: this.paginateBack,
          paginateForward: this.paginateForward,
          paginateTo: this.paginateTo
        }}
      >
        {this.props.children}
      </FeedContext.Provider>
    )
  }
}

export default FeedProvider
