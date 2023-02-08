import * as React from 'react'

import type { DataSourceEntry } from '../../types'

const LabelsContext = React.createContext<{ t: (key: string) => string }>({
  t: (key) => '',
})

LabelsContext.displayName = 'LabelsContext'

export function LabelsProvider({
  children,
  data,
}: {
  children: React.ReactNode
  data: DataSourceEntry[] | undefined
}) {
  const labels = (data || []).reduce<Record<string, string>>(
    (result, entry) => ({
      ...result,
      [entry.name]: entry.value,
    }),
    {},
  )

  const translate = React.useCallback(
    (key: string) => {
      return labels[key] ?? `unknown:${key}`
    },
    [labels],
  )

  return (
    <LabelsContext.Provider value={{ t: translate }}>
      {children}
    </LabelsContext.Provider>
  )
}

export function useLabels() {
  const value = React.useContext(LabelsContext)
  if (!value) {
    throw new Error('You need to wrap your component in LabelProvider')
  }
  return value
}
