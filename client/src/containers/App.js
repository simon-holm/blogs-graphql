import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Color } from '../styles/variables'

import Header from '../components/Header'
import Feed from '../components/Feed'
import Login from '../components/Login'

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <AppContainer>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/login" component={Login} />
          </Switch>
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
`

export default App
