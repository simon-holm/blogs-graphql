import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Color } from '../styles/variables'

import Header from '../components/Header'
import Feed from '../components/Feed'
import Login from '../components/Login'
import CreatePost from '../components/CreatePost'

import FeedProvider from '../context/Pagination'

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <AppContainer>
          <FeedProvider>
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/create" component={CreatePost} />
            </Switch>
          </FeedProvider>
        </AppContainer>
      </Wrapper>
    )
  }
}

const animatedBackground = keyframes`
  0% { background-position:0% 5% }
  50% { background-position:100% 96% }
  100% { background-position:0% 5% }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(
    to right bottom,
    ${Color.primaryDark},
    ${Color.primaryLight}
  );
  background-size: 120%;
  animation: ${animatedBackground} 60s ease infinite;
  min-height: 100vh;
`
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  padding-top: 12.5rem;
`

export default App
