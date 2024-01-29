import { GeneralErrorBoundary } from '#app/components/error-boundary'
import { NotFoundError, ServerError } from '#app/components/errors'

export { default, loader, meta, handle } from './$slug'

export function ErrorBoundary() {
	return <GeneralErrorBoundary statusHandlers={{ 404: NotFoundError }} />
}
