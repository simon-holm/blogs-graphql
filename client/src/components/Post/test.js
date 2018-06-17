import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;
  padding: 15px;
  font-size: 15px;
`

const WelcomeButton = Button.extend`
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 4px;
`
