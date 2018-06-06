import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AUTH_TOKEN, AUTH_USER } from '../constants'

import withPagination from '../HOC/withPagination'

class Header extends Component {
  state = {
    showSearch: false,
    searchTerm: ''
  }

  toggleSearch = () =>
    this.setState(prevState => ({ showSearch: !prevState.showSearch }))

  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value })

  onSearch = e => {
    e.preventDefault()
    this.props.search(this.state.searchTerm)
  }

  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <NavBar>
        <Title>
          <span role="img" aria-label="brand-name">
            🍌
          </span>
        </Title>
        <MenuOptions>
          <Link to="/">
            <span role="img" aria-label="posts link">
              📰
            </span>
          </Link>
          <a onClick={this.toggleSearch}>
            <span role="img" aria-label="search link">
              👁‍🗨
            </span>
          </a>
          {!!this.state.showSearch && (
            <form onSubmit={e => this.onSearch(e)}>
              <SearchField
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleChange}
              />
            </form>
          )}
          {authToken && (
            <Link to="/create">
              <span role="img" aria-label="create link">
                ⚗️
              </span>
            </Link>
          )}
        </MenuOptions>
        <MenuOptions>
          {authToken ? (
            <a
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                localStorage.removeItem(AUTH_USER)
                this.props.history.push('/')
              }}
            >
              <span role="img" aria-label="logout button">
                🔌
              </span>
            </a>
          ) : (
            <Link to="/login">
              <span role="img" aria-label="login button">
                😉
              </span>
            </Link>
          )}
        </MenuOptions>
      </NavBar>
    )
  }
}

const NavBar = styled.nav`
  position: fixed;
  z-index: 999;

  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100px;
  width: 100%;
  padding: 0 25px;
`
const Title = styled.h1`
  font-size: 7rem;
`
const MenuOptions = styled.div`
  display: flex;

  a {
    cursor: pointer;
    text-decoration: none;
    font-size: 5rem;
    margin-left: 15px;

    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`
const SearchField = styled.input`
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.5);

  padding: 0.1rem;

  &:focus {
    outline: none;
  }
`

export default withPagination(withRouter(Header))
