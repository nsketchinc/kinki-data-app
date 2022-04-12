import styled from '@emotion/styled'
interface IProps {
  title: string
}
export default function ModalTitle(props: IProps) {
  return <Wrapper>{props.title}</Wrapper>
}
const Wrapper = styled.h3`
  font-family: AvenirNext-DemiBold;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0em;
  line-height: 16.8px;
  text-align: left;
  color: #000;
  margin-bottom: 20px;
`
