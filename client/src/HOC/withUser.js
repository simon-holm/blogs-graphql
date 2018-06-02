import React from 'react'
import { AUTH_USER } from '../constants'

export default function withUser(WrappedComponent) {
  return class extends React.Component {
    render() {
      const User = JSON.parse(localStorage.getItem(AUTH_USER))
      return <WrappedComponent {...this.props} user={User} />
    }
  }
}
