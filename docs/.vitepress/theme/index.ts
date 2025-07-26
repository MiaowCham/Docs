// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// Nprogress
import vitepressNprogress from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'
import Layout from './Layout.vue'
import ImagePreview from './components/ImagePreview.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import './style.css'
import './blockquote.css'
import './custom-block.css'
import './custom.css'
import './secret.css'
import './responsive.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => [h(ImagePreview), h(ReloadPrompt)]
    })
  },
  enhanceApp(ctx) {
    vitepressNprogress(ctx)
    ctx.app.component('ImagePreview', ImagePreview)
    ctx.app.component('ReloadPrompt', ReloadPrompt)
  }
} satisfies Theme
