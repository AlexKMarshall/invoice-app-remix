import type { ReactNode } from 'react'

type IconBaseProps = {
  path: ReactNode
  className?: string
  viewBox: string
  type: 'fill' | 'stroke'
  title?: string
}
function IconBase({
  type = 'fill',
  path,
  ...props
}: IconBaseProps): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill={type === 'fill' ? 'currentColor' : 'none'}
      stroke={type === 'stroke' ? 'currentColor' : 'none'}
      aria-hidden={!props.title ? true : undefined}
    >
      {path}
    </svg>
  )
}

type IconProps = Pick<IconBaseProps, 'className'>

export const createIcon = (
  path: ReactNode,
  displayName: string,
  viewBox: string,
  type: IconBaseProps['type'] = 'fill'
) => {
  const Icon = ({ className }: IconProps) => (
    <IconBase path={path} className={className} viewBox={viewBox} type={type} />
  )
  Icon.displayName = displayName
  return Icon
}
