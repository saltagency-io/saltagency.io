import * as React from 'react'

type PreviewContextValue = {
  preview: boolean
}

const PreviewContext = React.createContext<PreviewContextValue>({
  preview: false,
})

export function PreviewContextProvider({
  children,
  preview,
}: {
  children: React.ReactNode
  preview: boolean
}) {
  return (
    <PreviewContext.Provider value={{ preview }}>
      {children}
    </PreviewContext.Provider>
  )
}

export function usePreview() {
  const value = React.useContext(PreviewContext)
  return value
}
