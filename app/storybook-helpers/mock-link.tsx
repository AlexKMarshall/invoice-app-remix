import type { MouseEventHandler, ReactNode } from 'react'
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'

import type { Link as RemixLink } from '@remix-run/react'
import type { To } from 'react-router'

type LinkActionContextType = {
  dispatchWouldNavigate: (to: To) => void
}
const LinkActionContext = createContext<LinkActionContextType | undefined>(
  undefined
)
const useLinkActionContext = () => {
  const context = useContext(LinkActionContext)
  if (!context)
    throw new Error(
      'useLinkActionContext must be used within LinkActionProvider'
    )
  return context
}

const wouldNavigate = 'would-navigate'
class WouldNavigateEvent extends CustomEvent<To> {
  public to: To
  constructor(to: To) {
    super(wouldNavigate, { detail: to })
    this.to = to
  }
}

type LinkActionWrapperProps = {
  onWouldNavigate?: (event: WouldNavigateEvent) => void
  children: ReactNode
}
export const LinkActionWrapper = ({
  onWouldNavigate,
  children,
}: LinkActionWrapperProps) => {
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  const dispatchWouldNavigate = (to: To) => {
    eventBoundaryRef.current?.dispatchEvent(new WouldNavigateEvent(to))
  }

  useLayoutEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldNavigate = (event: Event) => {
      if (event instanceof WouldNavigateEvent) {
        onWouldNavigate?.(event)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener(wouldNavigate, handleWouldNavigate)
      return () => {
        eventBoundary.removeEventListener(wouldNavigate, handleWouldNavigate)
      }
    }
  }, [onWouldNavigate])

  return (
    <LinkActionContext.Provider value={{ dispatchWouldNavigate }}>
      <div ref={eventBoundaryRef}>{children}</div>
    </LinkActionContext.Provider>
  )
}

export const StorybookMockLink: typeof RemixLink = forwardRef(
  function StorybookMockLink({ children, to, ...props }, ref) {
    const { dispatchWouldNavigate } = useLinkActionContext()

    const handleStorybookLinkClick: MouseEventHandler<HTMLAnchorElement> = (
      event
    ) => {
      event.preventDefault()
      dispatchWouldNavigate(to)
      props.onClick?.(event)
    }

    return (
      <a
        {...props}
        href={to.toString()}
        onClick={handleStorybookLinkClick}
        ref={ref}
      >
        {children}
      </a>
    )
  }
)
