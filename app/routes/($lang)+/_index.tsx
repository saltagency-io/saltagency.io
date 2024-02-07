import { GeneralErrorBoundary, NotFoundError } from '#app/components/errors.tsx'

export { default, loader, meta, handle } from './$slug'

export function ErrorBoundary() {
  return <GeneralErrorBoundary statusHandlers={{ 404: NotFoundError }} />
}
