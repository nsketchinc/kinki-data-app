import React, { FC } from 'react'

type SpacerProps = {
  size: number | string
  horizontal?: boolean
  className?:string
}

export const Spacer: FC<SpacerProps> = ({ size, horizontal,className }) => {
  return (
    <div
      className={className}
      style={
        horizontal
          ? {
              width: size,
              height: 'auto',
              display: 'inline-block',
              flexShrink: 0,
            }
          : { width: 'auto', height: size, flexShrink: 0 }
      }
    />
  )
}

export default Spacer;
