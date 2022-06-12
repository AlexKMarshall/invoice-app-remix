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
  dispatchNavigateEvent: (to: To) => void
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

class NavigateEvent extends CustomEvent<To> {
  static type: 'would-navigate'
  public to: To
  constructor(to: To) {
    super(NavigateEvent.type, { detail: to })
    this.to = to
  }
}

type LinkActionWrapperProps = {
  onWouldNavigate?: (event: NavigateEvent) => void
  children: ReactNode
}
export const LinkActionWrapper = ({
  onWouldNavigate,
  children,
}: LinkActionWrapperProps) => {
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  const dispatchNavigateEvent = (to: To) => {
    eventBoundaryRef.current?.dispatchEvent(new NavigateEvent(to))
  }

  useLayoutEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldNavigate = (event: Event) => {
      if (event instanceof NavigateEvent) {
        onWouldNavigate?.(event)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener(NavigateEvent.type, handleWouldNavigate)
      return () => {
        eventBoundary.removeEventListener(
          NavigateEvent.type,
          handleWouldNavigate
        )
      }
    }
  }, [onWouldNavigate])

  return (
    <LinkActionContext.Provider value={{ dispatchNavigateEvent }}>
      <div ref={eventBoundaryRef}>{children}</div>
    </LinkActionContext.Provider>
  )
}

export const StorybookMockLink: typeof RemixLink = forwardRef(
  function StorybookMockLink({ children, to, ...props }, ref) {
    const { dispatchNavigateEvent } = useLinkActionContext()

    const handleStorybookLinkClick: MouseEventHandler<HTMLAnchorElement> = (
      event
    ) => {
      event.preventDefault()
      dispatchNavigateEvent(to)
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
