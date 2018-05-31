import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { AUTH_TOKEN } from '../constants'

const Header = props => {
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
        <Link to="/">
          <span role="img" aria-label="search link">
            👁‍🗨
          </span>
        </Link>
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
              props.history.push('/')
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
    font-size: 6rem;
    margin-left: 15px;

    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`

export default withRouter(Header)
