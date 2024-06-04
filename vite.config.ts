import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 检查process.cwd()路径下.env.develeport.local、.env.development、.env.local、.env这四个环境文件
	loadEnv(mode, process.cwd());
	return {

		// 静态资源基础路径 base: './' || '',
		base: '',

		resolve: {
			alias: {
				// 配置src目录
				"@": path.resolve(__dirname, "src"),
				// 导入其他目录
				"components": path.resolve(__dirname, "components")
			}
		},
		plugins: [
			vue(),
			// 配置后，Vant各组件才生效
			// styleImport({
			// 	resolves: [VantResolve()],
			// }),
			AutoImport({
				resolvers: [VantResolver()],
			  }),
			  Components({
				resolvers: [VantResolver()],
			}),
		],

		// 跨域代理
		server: {
			host: '0.0.0.0',
			port: 5152,
			proxy: {
				'/ci': {
					target: 'http://ws.youmepower.com.cn:5151',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/ci/, '') // 将匹配到的ci替换成''
				}
			}
		}
	};
});
