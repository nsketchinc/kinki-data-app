import styled from '@emotion/styled'
import useModalStore from "@/store/modalStore";
import {ModalType} from "@/types/ModalType";

export default function CancelButton() {

  const {setModalType} = useModalStore()

  return (
    <Wrapper type="reset" value="CANCEL" onClick={() => {
      setModalType(ModalType.CLOSE)
    }}/>
  )
}
const Wrapper = styled.input`
  width: 100%;
  background: #8b8b8b;

  border-radius: 3px;
  font-family: 'Avenir Next';
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
  text-align: center;

  height: 26px;
  width: 100%;
  margin-top: 8px;
`
