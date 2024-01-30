import clsx from 'clsx'

import { GradientCircle } from './gradient-circle.tsx'

export function DecoratedBackgroundDark() {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0 overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:to-blue-500/10',
        'after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-gray-800',
      )}
    >
      <GradientCircle
        top={0}
        right={-20}
        width={500}
        height={500}
        opacity={10}
        z={1}
      />
      <GradientCircle
        rotate={40}
        bottom={50}
        left={-200}
        width={700}
        height={900}
        opacity={10}
        z={1}
      />
      <svg
        className="absolute left-0 stroke-white/10"
        xmlns="http://www.w3.org/2000/svg"
        width="1440"
        height="665"
        viewBox="0 0 1440 665"
        fill="none"
      >
        <path
          d="M1864.54 -184.633C-549.935 -1070.11 891.692 706.498 -627.746 663.196"
          strokeWidth={1}
        />
      </svg>
      <svg
        className="absolute bottom-0 right-0 stroke-white/10"
        xmlns="http://www.w3.org/2000/svg"
        width="709"
        height="624"
        viewBox="0 0 709 624"
        fill="none"
      >
        <path
          d="M1238.92 148.062C51.6622 -385.127 751.738 708.678 0.962363 692.497"
          strokeWidth={1}
        />
      </svg>
    </div>
  )
}

export function DecoratedBackgroundHero() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <svg
        style={{
          top: 600,
        }}
        className="absolute left-1/2 w-200vw -translate-x-1/2 lg:w-100vw"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 767"
        fill="none"
      >
        <path
          d="M1629.5 762.5C790 802 979.001 495.999 686 239C393 -17.9995 208 -72.9995 -228.284 102.96"
          stroke="url(#gradient-hero-line-1)"
        />
      </svg>
      <svg
        style={{
          top: `calc(50vw + 1200px)`,
        }}
        className="absolute left-1/2 w-200vw -translate-x-1/2 lg:w-100vw"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        fill="none"
      >
        <path
          d="M1870.31 176.512C1262 -151.501 616.5 30.4998 393.18 304.499C169.861 578.499 217.999 914.499 -441.001 759.999"
          stroke="url(#gradient-hero-line-2)"
        />
      </svg>
      <svg
        style={{
          top: `calc(50vw + 2000px)`,
        }}
        className="absolute left-1/2 w-200vw -translate-x-1/2 lg:hidden lg:w-100vw"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 767"
        fill="none"
      >
        <path
          d="M1629.5 762.5C790 802 979.001 495.999 686 239C393 -17.9995 208 -72.9995 -228.284 102.96"
          stroke="url(#gradient-hero-line-1)"
        />
      </svg>
      <svg
        style={{
          top: `calc(50vw + 2800px)`,
        }}
        className="absolute left-1/2 w-200vw -translate-x-1/2 lg:hidden lg:w-100vw"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        fill="none"
      >
        <path
          d="M1870.31 176.512C1262 -151.501 616.5 30.4998 393.18 304.499C169.861 578.499 217.999 914.499 -441.001 759.999"
          stroke="url(#gradient-hero-line-2)"
        />
      </svg>
    </div>
  )
}
