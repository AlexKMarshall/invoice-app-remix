import clsx from 'clsx'

type Props = { label: string }
export function Checkbox({ label }: Props): JSX.Element {
  return (
    <label className="flex items-center gap-3 font-bold touch-target text-strong">
      <input
        type="checkbox"
        className={clsx(
          'grid h-4 w-4 translate-y-[-10%] appearance-none place-content-center rounded-sm bg-surface-alt',
          'before:h-2 before:w-2 before:scale-0 before:shadow-[inset_1em_1em] before:shadow-white',
          'before:[clip-path:polygon(14%_44%,0_65%,50%_100%,100%_16%,80%_0%,43%_62%)]', // checkmark polygon
          'checked:bg-violet-600 checked:before:scale-100'
        )}
      />
      {label}
    </label>
  )
}
