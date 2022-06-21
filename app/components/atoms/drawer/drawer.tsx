import type { ReactNode } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type Props = { children: ReactNode; open?: boolean; onOpenChange?: () => void }
export function Drawer({ children, open, onOpenChange }: Props): JSX.Element {
  const { portalContainer: portalState } = useDrawerPortal()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={portalState}>
        <Dialog.Overlay />
        <Dialog.Content>
          <div className="absolute inset-0 bg-green-300 p-8 pt-[calc(74px_+_2rem)] lg:pl-[calc(104px_+_2rem)] lg:pt-8">
            Drawer Content with a lot of text Lorem, ipsum.
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type DrawerPortalContextType = {
  portalContainer: HTMLDivElement | null
  setPortalContainer: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >
}
const DrawerPortalContext = createContext<DrawerPortalContextType | undefined>(
  undefined
)

export const useDrawerPortal = () => {
  const context = useContext(DrawerPortalContext)
  if (!context)
    throw new Error(
      `useDrawerPortal must be used inside a DrawerPortalProvider`
    )
  return context
}

type DrawerPortalProviderProps = {
  children: ReactNode
}
export const DrawerPortalProvider = ({
  children,
}: DrawerPortalProviderProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  )

  return (
    <DrawerPortalContext.Provider
      value={{
        portalContainer: portalContainer,
        setPortalContainer: setPortalContainer,
      }}
    >
      {children}
    </DrawerPortalContext.Provider>
  )
}

export const DrawerPortal = () => {
  const { setPortalContainer: setPortalState } = useDrawerPortal()

  return <div ref={setPortalState} className="z-10" />
}
