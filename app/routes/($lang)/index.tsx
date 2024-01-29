import { useCatch } from '@remix-run/react'
import { NotFoundError, ServerError } from '~/components/errors'

export { default, loader, meta, handle } from './$slug'

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error)
	return <ServerError error={error} />
}

export function CatchBoundary() {
	const caught = useCatch()
	console.error('CatchBoundary', caught)
	return <NotFoundError />
}
