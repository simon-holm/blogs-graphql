import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import styled from 'styled-components'

import { AUTH_TOKEN } from '../constants'

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: ''
  }

  _confirm = async () => {
    console.log('CONFIRMING')
    const { name, email, password } = this.state
    if (this.state.login) {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      })
      const { token } = result.data.login
      this._saveUserData(token)
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        }
      })
      const { token } = result.data.signup
      this._saveUserData(token)
    }
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    return (
      <Container>
        <h2>{this.state.login ? '🍑 Login' : '📝 SignUp'}</h2>
        <form onSubmit={() => this._confirm()}>
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </form>
        <Container>
          <button onClick={() => this._confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </button>
          <button onClick={() => this.setState({ login: !this.state.login })}>
            {this.state.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </Container>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 5rem;
  }
  form {
    margin-bottom: 15px;
  }
  input {
    font-size: 4rem;
    padding: 1rem;
  }
`

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $displayName: String!
    $firstname: String
    $surname: String
  ) {
    signup(
      email: $email
      password: $password
      displayName: $displayName
      firstname: $firstname
      surname: $surname
    ) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export default compose(
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' })
)(Login)
