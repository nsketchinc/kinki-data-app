import styled from '@emotion/styled'

export default function MyLabel({children}) {
  return (
    <Wrapper>{children}</Wrapper>
  )
}

const Wrapper = styled.label`
  display: block;
  font-family: AvenirNext-Medium;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.02em;
  line-height: 14px;
  text-align: left;
  color: #777;
  margin-top: 8px;
`
