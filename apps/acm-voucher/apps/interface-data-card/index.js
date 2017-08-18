import config from './config'
import * as data from './data'

export default {
	name: "interface-data-card",
	version: "1.0.0",
	description: "interface-data-card",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "interface-data-card")
	}
}