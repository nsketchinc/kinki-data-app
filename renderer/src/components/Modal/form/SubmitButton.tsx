import styled from '@emotion/styled'
import React from 'react'

export default function SubmitButton(
  {isValid = true, onClick = ()=>{}}: {
  isValid?: boolean,
  onClick?: (e) => void,
}) {
  return (
    <Wrapper
      isValid={isValid}
      type='submit'
      onClick={onClick}
      value={"OK"}
    />
  )
}
const Wrapper = styled.input<{ isValid: boolean }>`
  width: 100%;
  margin-top: 25px;
  border-radius: 3px;
  font-family: 'Avenir Next';
  font-weight: bold;
  font-size: 12px;
  line-height: 26px;
  color: #fff;
  text-align: center;
  background: ${(props) => (props.isValid ? '#2961ef ' : '#9fb5ef')};
  
  &.disabled {
    opacity: 0.3;
  }

`
