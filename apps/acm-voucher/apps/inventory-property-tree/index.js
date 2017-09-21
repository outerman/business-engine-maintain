import config from './config'
import * as data from './data'

export default {
	name: "inventory-property-tree",
	version: "1.0.0",
	description: "inventory-property-tree",
	meta: data.getMeta(),
	components: [],
	config: config,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'))
		}, "inventory-property-tree")
	}
}