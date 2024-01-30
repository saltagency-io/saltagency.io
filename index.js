import 'dotenv/config'

import { installGlobals } from '@remix-run/node'

installGlobals()

if (process.env.NODE_ENV === 'production') {
	import('./server-build')
} else {
	import('./server')
}
