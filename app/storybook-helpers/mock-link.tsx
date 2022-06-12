import type { MouseEventHandler, ReactNode, RefObject } from 'react'
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import type { Link as RemixLink } from '@remix-run/react'

type LinkActionContextType = {
  eventBoundaryRef: RefObject<HTMLDivElement>
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

type LinkActionWrapperProps = {
  onWouldNavigate?: (event: CustomEvent['detail']) => void
  children: ReactNode
}
export const LinkActionWrapper = ({
  onWouldNavigate,
  children,
}: LinkActionWrapperProps) => {
  const [state, setState] = useState<'loading' | 'ready'>('loading')
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldNavigate = (e: Event) => {
      if (e instanceof CustomEvent) {
        onWouldNavigate?.(e.detail)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener('would-navigate', handleWouldNavigate)
      setState('ready')
      return () => {
        eventBoundary.removeEventListener('would-navigate', handleWouldNavigate)
      }
    }
  }, [onWouldNavigate])

  return (
    <LinkActionContext.Provider value={{ eventBoundaryRef }}>
      <div ref={eventBoundaryRef}>
        {state === 'ready' ? children : <div>Loading&hellip;</div>}
      </div>
    </LinkActionContext.Provider>
  )
}

export const StorybookMockLink: typeof RemixLink = forwardRef(
  function StorybookMockLink({ children, to, ...props }, ref) {
    const { eventBoundaryRef } = useLinkActionContext()

    const handleStorybookLinkClick: MouseEventHandler<HTMLAnchorElement> = (
      event
    ) => {
      event.preventDefault()
      eventBoundaryRef.current?.dispatchEvent(
        new CustomEvent('would-navigate', { detail: to })
      )
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
