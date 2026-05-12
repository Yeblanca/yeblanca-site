import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '@payload-config'
import { importMap } from '../importMap'

const NotFound = () =>
	NotFoundPage({
		config: configPromise,
		importMap,
		params: Promise.resolve({ segments: [] }),
		searchParams: Promise.resolve({}),
	})

export default NotFound
