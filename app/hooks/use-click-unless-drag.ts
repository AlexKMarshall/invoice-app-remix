import type { MouseEventHandler } from 'react'
import { useRef } from 'react'

type Props<Element = HTMLElement> = {
  minDragTime?: number
  onClick?: MouseEventHandler<Element>
}

export default function useClickUnlessDrag<Element = HTMLElement>({
  minDragTime = 200,
  onClick = () => {},
}: Props<Element> = {}) {
  const mouseDownTimestampRef = useRef(0)
  const onMouseDown: MouseEventHandler<Element> = () => {
    mouseDownTimestampRef.current = Date.now()
  }
  const onMouseUp: MouseEventHandler<Element> = (e) => {
    const mouseUpTimestamp = Date.now()
    if (mouseUpTimestamp - mouseDownTimestampRef.current < minDragTime) {
      onClick(e)
    }
  }

  return { onMouseDown, onMouseUp }
}
