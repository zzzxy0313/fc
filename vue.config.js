const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:'/fc/',
  configureWebpack: config => {
		// 不是开发环境时生效
		if (process.env.NODE_ENV !== 'development') {
			config['performance'] = {
				// 警告 webpack 的性能提示
				hints: 'warning',
				// 入口起点的最大体积
				maxEntrypointSize: 50000000,
				// 生成文件的最大体积
				maxAssetSize: 30000000,
				// 只给出 js 文件的性能提示
				assetFilter: function (assetFilename) {
					return assetFilename.endsWith('.js')
				}
			}
		}
	}
})
