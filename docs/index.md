---
layout: home

hero:
  name: 喵锵 MiaowCham
  text: 项目/文档中心
  tagline: <a href="#" id="hitokoto_text">:D 获取中...</a>
  image:
    src: /pictures/index.png
    alt: 喵锵 MiaowCham 个人文档合辑

  actions:
    - theme: brand
      text: 原创设定与世界观
      link: https://oc.miaowcham.top/
    - theme: alt
      text: 个人项目
      link: /Project
    - theme: alt
      text: 个人文档
      link: /docs
    - theme: alt
      text: Github
      link: https://github.com/MiaowCham

features:
  - icon: 🎮
    title: 灵动视效优化包
    details: 为《我的世界》基岩版灵动视效制作的优化资源包系列
  - icon: 🎵
    title: TTML 转 Lyricify Syllable 工具
    details: 一个适用于 TTML (AMLL标准) 文件转 Lyricify Syllable 的小工具
  - icon: 🎨
    title: macOS Tahoe Themes
    details: 基于 macOS Tahoe 26，为 MyDockFinder 制作的 Liquid Glass 风格图标和主题  
  - icon: 💻
    title: 一言(Hitokoto)命令行工具
    details: 一言(Hitokoto)命令行工具，支持在线API和本地语句包，让终端也能充满诗意
---

## README.md

### Hi there 👋 I'm 喵锵 (MiaowCham)

> [!note]
> My English isn’t perfect—I use translation tools sometimes, But I will work hard to learn it.😄

My name is 喵锵 (MiaowCham). In fact, I got this name from looking it up in the dictionary 💦  
I'm a passionate open-source enthusiast from Zhejiang, China. As a hobbyist developer, I hope my project can help some people.🙏  
However, in the latter half of the year, I'll be heading to Qingdao, Shandong, China to continue my education, so I may not be as active in the community as before 🥲 But don't worry—I'm sure I'll be back soon!

## 🥰 What I'm Into
- 🔭 I’m currently working on AI projects.
- ⬇️ I like to use Markdown to create documents.
- 🐍 I am trying to self-learn Python through AI and complete some projects.
- 📺 I might post some videos on [Bilibili](https://space.bilibili.com/485769432).

## 📫 How to reach me:
- 📧 Email: mcyyds1234@outlook.com
- 📧 QQMail: QQ@miaowcham.top
- 🐧 QQ: [2049669820](https://qm.qq.com/q/qjU8Nm72fe)
- ✈️ Telegram: [@MiaowCham](https://t.me/miaowcham)

<script>
  fetch('https://v1.hitokoto.cn')
    .then(response => response.json())
    .then(data => {
      const hitokoto = document.querySelector('#hitokoto_text')
      hitokoto.href = `https://hitokoto.cn/?uuid=${data.uuid}`
      
      // 创建两行显示格式：正文 + 换行 + 作者出处（靠右）
      let content = data.hitokoto
      if (data.from_who || data.from) {
        const author = data.from_who || ''
        const source = data.from || ''
        const attribution = author && source ? `${author}「${source}」` : (author || (source ? `「${source}」` : ''))
        content += `\n—— ${attribution}`
      }
      
      // 使用HTML格式来实现第二行靠右
      const lines = content.split('\n')
      if (lines.length > 1) {
        hitokoto.innerHTML = `${lines[0]}<br><div style="text-align: right; margin-top: 8px;">${lines[1]}</div>`
      } else {
        hitokoto.innerText = content
      }
    })
    .catch(console.error)
</script>