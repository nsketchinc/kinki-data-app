import { useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'
interface IProps {
  minCharLength?: number
  maxCharLength?: number
  minDuration?: number
  maxDuration?: number
  id: string
  description: string
  initialValue: string | number
  show: boolean
}
export default function InputTooltip({
                                       minCharLength = 1,
                                       maxCharLength = 101,
                                       minDuration = 1,
                                       maxDuration = 101,
                                       id,
                                       description,
                                       initialValue,

                                       show = true,
                                     }: IProps) {
  // const [show, setShow] = useState(true)
  const [tip, setTip] = useState('')

  const tooltipRef = useRef()

  function isValidURL(string: string) {
    const res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )

    return res !== null
  }

  // useEffect(() => {
  //   if (typeof initialValue === 'string') {
  //     if (
  //       initialValue.length > minCharLength &&
  //       initialValue.length < maxCharLength
  //     ) {
  //       setShow(false)
  //       if (id === 'url' && !isValidURL(initialValue)) {
  //         setTip('URLが不正です')
  //         setShow(true)
  //       }
  //     } else {
  //       if (initialValue.length < minCharLength) {
  //         setTip(
  //           description +
  //             'に' +
  //             minCharLength.toString() +
  //             '以上の文字を入力してください'
  //         )
  //       } else if (initialValue.length >= maxCharLength) {
  //         setTip(
  //           description +
  //             'に' +
  //             maxCharLength.toString() +
  //             '以下の文字を入力してください'
  //         )
  //       }

  //       setShow(true)
  //     }
  //   }
  //   if (typeof initialValue === 'number') {
  //     if (initialValue > minDuration && initialValue < maxDuration) {
  //       setShow(false)
  //     } else {
  //       if (initialValue < minDuration) {
  //         setTip(
  //           description +
  //             'に' +
  //             minDuration.toString() +
  //             '以上の秒数を指定してください'
  //         )
  //       } else if (initialValue >= maxDuration) {
  //         setTip(
  //           description +
  //             'に' +
  //             maxDuration.toString() +
  //             '以下の秒数を指定してください'
  //         )
  //       }
  //       setShow(true)
  //     }
  //   }
  // }, [initialValue])

  return (
    <>
      {show && (
        <ReactTooltip id={id} place='bottom' type='light' ref={tooltipRef}>
          {tip}
        </ReactTooltip>
      )}
    </>
  )
}
