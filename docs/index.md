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
      text: 项目
      link: /Project
    - theme: brand
      text: 文档  
      link: /docs
    - theme: alt
      text: 主站
      link: https://miaowcham.com/
    - theme: alt
      text: 爱发电
      link: https://afdian.com/a/MiaowCham

---

## 你好 👋 我是喵锵 (MiaowCham)

我的名字是喵锵（MiaowCham），其实这个名字是我查字典时偶然得到的 💦  
我是一名来自中国浙江的开源爱好者。作为一名业余开发者，我希望我的项目能帮助到一些人。🙏  
不过，我可能不会像以前那样活跃于社区🥲因为我需要进修学业，以便更好的进行开发

### 🥰 我的兴趣
- 🔭 目前正在做一些 AI 相关的项目。
- ⬇️ 喜欢用 Markdown 写文档。
- 🐍 正在通过 AI 自学 Python 并尝试完成一些项目。
- 📺 可能会在 [Bilibili](https://space.bilibili.com/485769432) 上传一些视频。

### 📫 联系方式
- 📧 邮箱: <a href="mailto:mcyyds1234@outlook.com" target="_blank">mcyyds1234@outlook.com</a>
- 📧 QQ邮箱: <a href="mailto:qq@miaowcham.com" target="_blank">qq@miaowcham.com</a>
- 🐧 QQ: [2049669820](https://qm.qq.com/q/qjU8Nm72fe)（欢迎扩列）
- ✈️ Telegram: [@MiaowCham](https://t.me/miaowcham)

### 🍗 请我吃KFC
- 💴 数字人民币钱包ID：`0071130812093028`
- 💵 USDT APTOS钱包地址：<button id="copyBtn">点我复制</button>
- 🟦 PayPal转账邮箱：`2049669820@qq.com`
- 💗 爱发电：[喵锵](https://afdian.com/a/MiaowCham)

<script>
document.getElementById('copyBtn').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('0x607fa5fe5a2dfb0025662f5527c9f61bd53b75677cbeb6256866db55e8f0c984');
  } catch {
    // 降级方案
    const ta = document.createElement('textarea');
    ta.value = '0x607fa5fe5a2dfb0025662f5527c9f61bd53b75677cbeb6256866db55e8f0c984';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
});

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