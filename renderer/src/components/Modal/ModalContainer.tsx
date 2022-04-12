import styled from '@emotion/styled'

export default function ModalContainer({children}) {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  max-width: 240px;
  background-color: #efefef;
  border-radius: 6px;
  padding: 18px;
`
