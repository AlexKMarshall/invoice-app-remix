import type { FormEventHandler, ReactNode } from 'react'
import {
  createContext,
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'

import type { Form as RemixForm } from '@remix-run/react'
import { mergeRefs } from 'react-merge-refs'

type FormSubmitPayload = {
  action: string
  method: string
  formData: FormData
  unwrappedData: unknown
}
type FormActionContextType = {
  dispatchWouldSubmit: (payload: FormSubmitPayload) => void
}
const FormActionContext = createContext<FormActionContextType | undefined>(
  undefined
)
const useFormActionContext = () => {
  const context = useContext(FormActionContext)
  if (!context)
    throw new Error(
      'useFormActionContext must be used within FormActionProvider'
    )
  return context
}

const wouldSubmit = 'would-submit'
class WouldSubmitEvent extends CustomEvent<FormSubmitPayload> {
  public payload: FormSubmitPayload
  constructor(payload: FormSubmitPayload) {
    super(wouldSubmit, { detail: payload })
    this.payload = payload
  }
}

type FormActionWrapperProps = {
  onWouldSubmit?: (event: WouldSubmitEvent) => void
  children: ReactNode
}
export const FormActionWrapper = ({
  onWouldSubmit,
  children,
}: FormActionWrapperProps) => {
  const eventBoundaryRef = useRef<HTMLDivElement>(null)

  const dispatchWouldSubmit = (payload: FormSubmitPayload) => {
    eventBoundaryRef.current?.dispatchEvent(new WouldSubmitEvent(payload))
  }

  useLayoutEffect(() => {
    const eventBoundary = eventBoundaryRef.current
    const handleWouldSubmit = (event: Event) => {
      if (event instanceof WouldSubmitEvent) {
        onWouldSubmit?.(event)
      }
    }

    if (eventBoundary) {
      eventBoundary.addEventListener(wouldSubmit, handleWouldSubmit)
      return () => {
        eventBoundary.removeEventListener(wouldSubmit, handleWouldSubmit)
      }
    }
  }, [onWouldSubmit])

  return (
    <FormActionContext.Provider
      value={{ dispatchWouldSubmit: dispatchWouldSubmit }}
    >
      <div ref={eventBoundaryRef}>{children}</div>
    </FormActionContext.Provider>
  )
}

export const StorybookMockForm: typeof RemixForm = forwardRef(
  function StorybookMockLink({ children, ...props }, ref) {
    const { dispatchWouldSubmit } = useFormActionContext()
    const localRef = useRef<HTMLFormElement>(null)

    const handleStorybookFormSubmit: FormEventHandler<HTMLFormElement> = (
      event
    ) => {
      event.preventDefault()
      const form = localRef.current
      if (!form) return

      const formData = new FormData(form)
      const unwrappedData = Object.fromEntries(formData.entries())

      dispatchWouldSubmit({
        action: form.action,
        method: form.method,
        formData,
        unwrappedData,
      })
      props.onSubmit?.(event)
    }

    return (
      <form
        {...props}
        onSubmit={handleStorybookFormSubmit}
        ref={mergeRefs([localRef, ref])}
      >
        {children}
      </form>
    )
  }
)
