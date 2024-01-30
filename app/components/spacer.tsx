const spacerSizes = {
  '3xs': 'h-6',
  '2xs': 'h-10',
  xs: 'h-20',
  sm: 'h-32',
  base: 'h-40',
  lg: 'h-56',
}

export type SpacerSizes = keyof typeof spacerSizes

export function Spacer({
  size,
  className = '',
}: {
  size: keyof typeof spacerSizes
  className?: string
}) {
  return (
    <div
      className={`relative -mt-20 lg:-mb-80 lg:-mt-40 ${className} ${spacerSizes[size]}`}
    />
  )
}
