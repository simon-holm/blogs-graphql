import React from 'react'
import styled from 'styled-components'

import withPagination from '../HOC/withPagination'

import { EmojiButton } from './reusable'

const Pagination = ({
  pagesCount,
  feedVariables: { skip, limit },
  paginateBack,
  paginateForward,
  paginateTo
}) => {
  return (
    <PaginationWrapper>
      <EmojiButton onClick={() => paginateBack()}>
        <span role="img" aria-label="paginate-back">
          👈
        </span>
      </EmojiButton>

      <div>
        {pagesCount.map((p, index) => (
          <Link
            key={`page${index}`}
            onClick={() => paginateTo(index)}
            isActive={skip / limit === index ? true : false}
          >
            {index + 1}
          </Link>
        ))}
      </div>

      <EmojiButton onClick={() => paginateForward()}>
        <span role="img" aria-label="paginate-forward">
          👉
        </span>
      </EmojiButton>
    </PaginationWrapper>
  )
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 50vw;
  margin: 10rem 0;
`
const Link = styled.a`
  cursor: pointer;
  font-size: 2rem;
  margin: 0 0.5rem;
  text-decoration: ${({ isActive }) => (isActive ? 'underline' : 'none')};

  &:hover {
    color: blueviolet;
    text-decoration: underline;
  }
`

export default withPagination(Pagination)
