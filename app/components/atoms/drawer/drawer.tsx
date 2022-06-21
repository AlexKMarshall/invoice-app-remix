import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { createContext, useContext } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'

type Props = { children: ReactNode; open?: boolean; onOpenChange?: () => void }
export function Drawer({ children, open, onOpenChange }: Props): JSX.Element {
  const { portalContainer, headerHeight, headerWidth } = useDrawerPortal()

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content>
          <div
            style={
              {
                '--header-height': `${headerHeight}px`,
                '--header-width': `${headerWidth}px`,
              } as CSSProperties
            }
            className={clsx(
              'fixed bottom-0 left-0 right-0 overflow-y-scroll bg-white',
              'top-[var(--header-height)] pt-6 pr-6 pb-6 pl-6',
              'sm:right-[unset] sm:max-w-xl sm:rounded-r-3xl sm:pt-14 sm:pr-14 sm:pb-14 sm:pl-14',
              'lg:top-0 lg:max-w-3xl lg:overflow-y-visible lg:pl-[calc(var(--header-width)_+_56px)]', // padding calculated so drawer background extends behind sidebar
              'dark:bg-[hsl(233deg_30%_11%)]'
            )}
          >
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
  headerHeight: number
  headerWidth: number
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
  headerHeight: number
  headerWidth: number
  children: ReactNode
}
export const DrawerPortalProvider = ({
  headerHeight,
  headerWidth,
  children,
}: DrawerPortalProviderProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  )

  return (
    <DrawerPortalContext.Provider
      value={{
        portalContainer,
        setPortalContainer,
        headerHeight,
        headerWidth,
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
