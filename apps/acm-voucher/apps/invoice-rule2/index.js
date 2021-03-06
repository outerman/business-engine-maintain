import config from './config'
import * as data from './data'

export default {
	name: "invoice-rule2",
	version: "1.0.0",
	description: "invoice-rule2",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "invoice-rule2")
	}
}