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

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const usdtAddress = '0x607fa5fe5a2dfb0025662f5527c9f61bd53b75677cbeb6256866db55e8f0c984'
const copyButtonText = ref('复制')
let copyStatusTimer
let hitokotoController

async function copyUsdtAddress() {
  try {
    let copied = false

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(usdtAddress)
        copied = true
      } catch (error) {
        console.warn('Clipboard API 不可用，尝试兼容复制方案：', error)
      }
    }

    if (!copied) {
      const textarea = document.createElement('textarea')
      textarea.value = usdtAddress
      textarea.readOnly = true
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)

      try {
        textarea.select()
        copied = document.execCommand('copy')
      } finally {
        textarea.remove()
      }
    }

    if (!copied) throw new Error('Copy command failed')
    copyButtonText.value = '已复制'
  } catch (error) {
    console.error('复制 USDT 地址失败：', error)
    copyButtonText.value = '复制失败'
  }

  clearTimeout(copyStatusTimer)
  copyStatusTimer = setTimeout(() => {
    copyButtonText.value = '复制'
  }, 2000)
}

onMounted(async () => {
  hitokotoController = new AbortController()

  try {
    const response = await fetch('https://v1.hitokoto.cn', {
      signal: hitokotoController.signal
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    const hitokoto = document.querySelector('#hitokoto_text')
    if (!hitokoto) return

    hitokoto.href = `https://hitokoto.cn/?uuid=${encodeURIComponent(data.uuid)}`
    hitokoto.textContent = data.hitokoto

    const author = data.from_who || ''
    const source = data.from || ''
    const attribution = author && source
      ? `${author}「${source}」`
      : (author || (source ? `「${source}」` : ''))

    if (attribution) {
      const attributionLine = document.createElement('div')
      attributionLine.style.cssText = 'text-align: right; margin-top: 8px;'
      attributionLine.textContent = `—— ${attribution}`
      hitokoto.append(document.createElement('br'), attributionLine)
    }
  } catch (error) {
    if (error.name !== 'AbortError') console.error('获取一言失败：', error)
  }
})

onBeforeUnmount(() => {
  clearTimeout(copyStatusTimer)
  hitokotoController?.abort()
})
</script>

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
- 💵 USDT APTOS钱包地址：`0x607fa5fe5a2dfb0025662f5527c9f61bd53b75677cbeb6256866db55e8f0c984` <button type="button" class="copy-address-button" aria-label="复制 USDT APTOS 钱包地址" @click="copyUsdtAddress">{{ copyButtonText }}</button>
- 🟦 PayPal转账邮箱：`2049669820@qq.com`
- 💗 爱发电：[喵锵](https://afdian.com/a/MiaowCham)
