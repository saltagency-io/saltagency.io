export function SvgGradientReference() {
  return (
    <>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="gradient-brand" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="hsl(260 85% 59%)" />
            <stop offset="100%" stopColor="hsl(235 100% 63%)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}
