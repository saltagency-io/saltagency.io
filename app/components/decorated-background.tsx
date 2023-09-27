import clsx from 'clsx'

import { GradientCircle } from './gradient-circle'

export function DecoratedBackground() {
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-0',
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
        className="absolute right-0 bottom-0 stroke-white/10"
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
