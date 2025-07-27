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
    
    // 禁用右键菜单和快捷键，并显示提示
    if (typeof window !== 'undefined') {
      // 创建提示元素
       const createToast = (message: string) => {
         // 移除旧的提示弹窗
         const existingNotifications = document.querySelectorAll('.protection-notification')
         existingNotifications.forEach(notification => {
           notification.remove()
         })

         const toast = document.createElement('div')
         toast.className = 'protection-notification'
         toast.textContent = message
         toast.style.cssText = `
           position: fixed;
           top: 30px;
           left: 50%;
           transform: translateX(-50%);
           background: rgba(255, 255, 255, 0.15);
           backdrop-filter: blur(20px);
           -webkit-backdrop-filter: blur(20px);
           border: 1px solid rgba(255, 255, 255, 0.2);
           color: white;
           padding: 6px 12px 6px 35px;
           border-radius: 50px;
           font-size: 14px;
           font-weight: 500;
           text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
           z-index: 10000;
           animation: fadeInOut 3s ease-in-out;
           min-width: auto;
           text-align: left;
           display: flex;
           align-items: center;
           white-space: nowrap;
           height: 32px;
           line-height: 1;
         `
        
        // 添加警告图标
        const icon = document.createElement('img')
        icon.src = '/pictures/warn.png'
        icon.style.cssText = `
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          opacity: 0.8;
        `
        toast.appendChild(icon)
        
        // 添加动画样式
        if (!document.querySelector('#toast-style')) {
          const style = document.createElement('style')
          style.id = 'toast-style'
          style.textContent = `
             @keyframes fadeInOut {
               0% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.9); }
               15% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
               85% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
               100% { opacity: 0; transform: translateX(-50%) translateY(-30px) scale(0.9); }
             }
           `
          document.head.appendChild(style)
        }
        
        document.body.appendChild(toast)
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast)
          }
        }, 3000)
      }
      
      // 禁用右键菜单
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        createToast('为了浏览体验，本站禁用右键')
        return false
      })
      
      // 禁用F12、Ctrl+Shift+I等开发者工具快捷键
      document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
            (e.ctrlKey && e.key === 'u')) {
          e.preventDefault()
          createToast('为了浏览体验，本站禁用开发者工具')
          return false
        }
      })
    }
  }
} satisfies Theme
