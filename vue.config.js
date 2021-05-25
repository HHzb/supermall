module.exports = {
	configureWebpack: {
		reslove: {
			// 配置别名
			alias: {
				assets: '@/assets',
				common: '@/common',
				components: '@/components',
				network: '@/network'，
        views:'@/views'
			}
		}
	}
};
