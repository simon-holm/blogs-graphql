import React from 'react'

import { FeedContext } from '../context/Pagination'

export default function withPagination(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <FeedContext.Consumer>
          {context => (
            <WrappedComponent
              {...this.props}
              feedVariables={context.feedVariables}
              paginateBack={context.paginateBack}
              paginateForward={context.paginateForward}
              paginateTo={context.paginateTo}
            />
          )}
        </FeedContext.Consumer>
      )
    }
  }
}
