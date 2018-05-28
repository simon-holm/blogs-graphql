import styled from 'styled-components'

export const EmojiButton = styled.button`
  border: none;
  cursor: pointer;
  background: none;
  font-size: 4rem;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`
export const Button = styled.button`
  cursor: pointer;
  background: white;
  border-radius: 2px;
  border-style: none;
  font-size: 2rem;
  padding: 0.5rem;

  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  &:active {
    transform: scale(0.999);
    box-shadow: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: lightgray;
  }
`
