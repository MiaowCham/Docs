import { defineConfig } from 'vitepress';

export default defineConfig({
  title: '喵锵的个人站',
  description: '喵锵的项目/文档中心',
  base: '/',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/pictures/logo.png' }]
  ],

  themeConfig: {
    logo: '/pictures/logo.png',
    // 顶部导航栏
    nav: [
      { text: '首页', link: '/' },
      { text:'原创设定集', link:'https://oc.miaowcham.top/'},
      { text: '个人文档', link: '/docs/' },
      { text: '个人项目', link: '/Project' },
    ],

    // 侧边栏
    sidebar: {

      // 项目文档
      '/Project/':[
        { text: '个人项目', 
          items: [
            { text: '项目介绍文档', link: '/Project/' },
          ]
          
        },
        {
          text: '灵动视效优化包',
          collapsed: true,
          items: [
            { text: '项目简介', link: '/Project/Vibrant-Visuals-Optimization-Docs/' },
            { text: '资源包总览', link: '/Project/Vibrant-Visuals-Optimization-Docs/resource'},
            { text: '如何使用', link: '/Project/Vibrant-Visuals-Optimization-Docs/howtouse'},
            { text: '发行版下载', link: 'https://github.com/MiaowCham/Vibrant-Visuals-Optimization/releases/latest' },
            { text: '构建板下载', link: 'https://github.com/MiaowCham/Vibrant-Visuals-Optimization/actions/workflows/compress-folders.yml' },
          ],
        },
        {
          text: '一言(Hitokoto)命令行工具',
          collapsed: true,
          items: [
            { text: '项目说明文档', link: '/Project/hitokoto-cli' },
            { text: '项目地址', link: 'https://github.com/MiaowCham/Hitokoto-CLI' },
            { text: '发行版下载', link: 'https://github.com/MiaowCham/Hitokoto-CLI/releases/latest' },
            { text: '构建板下载', link: 'https://github.com/MiaowCham/hitokoto-cli/actions/workflows/build.yml' },
          ],
        },
        {
          text: 'TTML 转换工具',
          collapsed: true,
          items: [
            { text: '项目说明文档', link: '/Project/TTML_to_Lyricify_Syllable_Tool' },
            { text: '项目地址', link: 'https://github.com/MiaowCham/TTML_to_Lyricify_Syllable_Tool' },
            { text: '发行版下载', link: 'https://github.com/MiaowCham/TTML_to_Lyricify_Syllable_Tool/releases/latest' },
            { text: '构建板下载', link: 'https://github.com/MiaowCham/TTML_to_Lyricify_Syllable_Tool/actions/workflows/build.yml' },
          ],
        },
        {
          text: 'macOS Tahoe Themes for MDF',
          collapsed: true,
          items: [
            { text: '项目说明文档', link: '/Project/macOS_Tahoe_Themes_for_MDF' },
            { text: '项目地址', link: 'https://github.com/MiaowCham/macOS_Tahoe_Themes_for_MDF' },
            { text: 'Steam创意工坊', link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3500821680' },
          ],
        },
      ],

      // 个人文档
      'docs': [
        { text: '个人文档',
          items: [
            { text: '我创作的文档', link: '/docs/' },
            { text: 'Lyrics Next 格式规范', link: '/docs/lyric/Lyrics_Next' },
            { text: 'Lyricify Syllable Next 格式规范', link: '/docs/lyric/Lyricify_Syllable_Next' },
            { text: '许可证', link: '/docs/Lincese-Docs'}
          ]
        },
        {
          text: '如何使用 IPv6 连接 Spotify 和 Lyricify',
          collapsed: true,
          items: [
            { text: '说明文档', link: '/docs/IPv6/index' },
            { text: 'README', link: '/docs/IPv6/index-en' },
            { text: '操作文档', link: '/docs/IPv6/IPv6First' },
            { text: 'IPv6First', link: '/docs/IPv6/IPv6First-EN' },
          ]
        },
        {
          text: '如何将 AMLL TTML 转换为 Apple 音节',
          collapsed: true,
          items: [
            { text: '说明文档', link: '/docs/lyric/How-to-Convert' },
            { text: 'README', link: '/docs/lyric/How-to-Convert-EN' },
          ]
        },
      ],
    },

    // 顶部图标链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MiaowCham/MiaowCham' },
      { icon: 'qq', link: 'https://qm.qq.com/q/qjU8Nm72fe', ariaLabel: 'QQ' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/485769432', ariaLabel: '哔哩哔哩' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/MiaowCham/miaowcham/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outlineTitle: '本页目录',

    lastUpdated: {
      text: '最后更新于'
    },

    notFound: {
      title: '页面被小猫吃掉了',
      quote:
        '当你迷失方向的时候，试着循着光前进！',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    footer: {
      message: '除非另有说明，本站内容依据 <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0 1.0</a> 许可证进行授权，图片资源除外',
      copyright: '网站使用强大的 VitePress 驱动'
    }
  },
});
