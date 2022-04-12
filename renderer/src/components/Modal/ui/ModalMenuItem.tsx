import React from 'react'
import styled from "@emotion/styled";
import Icon from "@mdi/react";

export default function ModalMenuItem(
  {
    title,
    icon,
    color = "#333",
    onClick,
  }:
    { title: string, icon: string, color?: string, onClick: () => void }) {

  return (
    <Wrapper
      className={'menu-row'}
      onClick={onClick}
      color={color}
    >
      <Icon path={icon} size={1}/>
      <p>{title}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ color: string }>`
  display: block;

  padding: 0 20px 0 10px;
  //padding-rigth: -10px;
  width: 100%;
  height: 34px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  column-gap: 10px;
  
  color: ${(props) => props.color};
  cursor: pointer;

  :hover {
    background: #ccc;
  }

  p {
    font-size: 14px;
  }
;
`
