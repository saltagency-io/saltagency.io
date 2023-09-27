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
          <linearGradient
            id="gradient-brand"
            x1="20"
            y1="2"
            x2="20"
            y2="38"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#8954FF" />
            <stop offset="1" stop-color="#546DFF" />
          </linearGradient>
        </defs>
      </svg>
    </>
  )
}
