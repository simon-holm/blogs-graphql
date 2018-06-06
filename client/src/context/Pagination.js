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

  search = searchTerm => {
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: 0,
        searchTerm
      }
    }))
  }

  paginateBack = () => {
    if (this.state.feedVariables.skip === 0) return

    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip - this.state.feedVariables.limit
      }
    }))
  }

  paginateForward = () => {
    this.setState(prevState => ({
      feedVariables: {
        ...prevState.feedVariables,
        skip: prevState.feedVariables.skip + this.state.feedVariables.limit
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
          paginateTo: this.paginateTo,
          search: this.search
        }}
      >
        {this.props.children}
      </FeedContext.Provider>
    )
  }
}

export default FeedProvider
