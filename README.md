# 喵锵的个人文档站
基于 VitePress 构建的个人项目和文档中心

> [!note]
> 我懒得写README所以这个文档是AI写的，凑合看看得了

## 📖 项目简介

这是喵锵 (MiaowCham) 的个人文档站，使用 VitePress 构建，包含个人项目介绍、技术文档和使用指南。

## 🚀 快速开始

### 环境要求

- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档站点。

### 构建部署

```bash
npm run docs:build
```

构建产物将生成在 `docs/.vitepress/dist` 目录。

### 预览构建结果

```bash
npm run docs:preview
```

## 📁 项目结构

```
Docs/
├── docs/                    # 文档源文件
│   ├── .vitepress/         # VitePress 配置
│   │   └── config.ts       # 站点配置文件
│   ├── Project/            # 个人项目文档
│   ├── docs/               # 个人技术文档
│   ├── public/             # 静态资源
│   └── index.md            # 首页
├── package.json            # 项目配置
└── README.md              # 项目说明
```

## 📚 内容概览

### 个人项目

- **灵动视效优化包** - 《我的世界》基岩版灵动视效优化资源包
- **一言命令行工具** - 支持在线API和本地语句包的命令行工具
- **TTML 转换工具** - TTML 文件转 Lyricify Syllable 格式的转换工具
- **macOS Tahoe Themes** - 为 MyDockFinder 制作的 macOS 风格主题

### 技术文档

- Lyrics Next 格式规范
- Lyricify Syllable Next 格式规范
- IPv6 连接 Spotify 和 Lyricify 指南
- AMLL TTML 转 Apple 音节教程

## 🛠️ 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Sass](https://sass-lang.com/) - CSS 预处理器
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的 JavaScript

## 📄 许可证

本项目采用 [CC0 1.0](LICENSE) 许可证，内容可自由使用。

## 📞 联系方式

- 📧 Email: mcyyds1234@outlook.com
- 🐧 QQ: [2049669820](https://qm.qq.com/q/qjU8Nm72fe)
- 🌐 主站: [miaowcham.top](https://miaowcham.top/)
- 📺 哔哩哔哩: [@喵锵MiaowCham](https://space.bilibili.com/485769432)

---

💡 **提示**: 本站使用一言 API 在首页显示随机句子，让文档站也充满诗意！