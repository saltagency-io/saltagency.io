import clsx from 'clsx'

export function Gradient({ className }: { className?: string }) {
  return (
    <div
      style={{
        background:
          'linear-gradient(143.15deg, #6100FF 8.37%, rgba(0, 255, 255, 0) 91.49%);',
      }}
      className={clsx(
        'absolute h-[900px] w-[900px] rounded-full opacity-40 blur-4xl',
        className,
      )}
    />
  )
}
