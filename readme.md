# PandaVision WebGIS widgets 开发工程

## 1.脚手架搭建

## 2.eslint prettier husky commitlint 开发规范体系

## 3.微件环境搭建，初始 demo

## 4.集成 calcite components

https://developers.arcgis.com/calcite-design-system/

## 5.集成 tailwind
tailwind 与 calcite-components样式冲突

## 6.打包分析
http://webpack.github.io/analyse/
http://alexkuz.github.io/webpack-chart/

## 7.在线polyfill
https://cdn.polyfill.io/v3/

## 8.webpack 插件
webpack-manifest-plugin  生成webpack js打包的manifest
ProvidePlugin  自动加载模块，而不必在任何地方import或require
CommonsChunkPlugin 公共模块提取
CssMinimizerWebpackPlugin css压缩

## 9.后台接口模拟
见 build/_mock/mock.server.js

## 10.本地开发需要安装的vscode插件
ESLint  prettier  koroFileHeader

## 11.css 规范
### class 命名规范：
自定义 class 以pv 开头，如pv-btn,pv-container-home
### bem的书写规范
'-' 中划线 ：仅作为连字符使用，表示某个块或者某个子元素的多单词之间的连接记号。
'__' 双下划线：双下划线用来连接块和块的子元素
'_' 单下划线：单下划线用来描述一个块或者块的子元素的一种状态
示例如下：
```css
.block {}
.block__element {}
.block--modifier {}
.sub-block__element {}
.sub-block--modifier {}
```

## 12.代码提交规范
```javascript
//示例：git commit -a -m 'feat: 新功能'
feat: {
	description: '新功能',
	title: 'Features',
	emoji: '✨',
},
fix: {
	description: 'bug修复',
	title: 'Bug Fixes',
	emoji: '🐛',
},
docs: {
	description: '文档修改',
	title: 'Documentation',
	emoji: '📚',
},
style: {
	description:
		'代码样式的修改',
	title: 'Styles',
	emoji: '💎',
},
refactor: {
	description:
		'代码重构',
	title: 'Code Refactoring',
	emoji: '📦',
},
perf: {
	description: '代码优化',
	title: 'Performance Improvements',
	emoji: '🚀',
},
test: {
	description: '单元测试',
	title: 'Tests',
	emoji: '🚨',
},
build: {
	description:
		'打包构建',
	title: 'Builds',
	emoji: '🛠',
},
ci: {
	description:
		'ci流程修改',
	title: 'Continuous Integrations',
	emoji: '⚙️',
},
chore: {
	description: "其它文件的修改",
	title: 'Chores',
	emoji: '♻️',
},
revert: {
	description: '还原以前的提交',
	title: 'Reverts',
	emoji: '🗑',
},
```
