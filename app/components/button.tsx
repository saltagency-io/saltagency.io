import * as React from 'react'

type Props = {
  children: React.ReactNode
}

export function Button({children}: Props) {
  return <button>{children}</button>
}
