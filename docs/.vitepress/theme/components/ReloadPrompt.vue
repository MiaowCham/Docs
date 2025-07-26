<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showPrompt = ref(false)
const promptMessage = ref('')

const close = () => {
  showPrompt.value = false
}

const reload = () => {
  window.location.reload()
}

// 检测页面更新
const checkForUpdates = () => {
  // 检查是否有新的构建版本
  const currentVersion = document.querySelector('meta[name="build-time"]')?.getAttribute('content')
  
  // 模拟检测到更新的情况
  const hasUpdate = Math.random() < 0.1 // 10% 概率显示更新提示（仅用于演示）
  
  if (hasUpdate) {
    promptMessage.value = '网站已有新内容，点击重载按钮以更新'
    showPrompt.value = true
  }
}

onMounted(() => {
  // 监听页面可见性变化，当页面重新获得焦点时检查更新
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(checkForUpdates, 1000)
    }
  })
  
  // 监听在线状态
  window.addEventListener('online', () => {
    promptMessage.value = '网络连接已恢复'
    showPrompt.value = true
    setTimeout(() => {
      showPrompt.value = false
    }, 3000)
  })
  
  window.addEventListener('offline', () => {
    promptMessage.value = '网络连接已断开，部分功能可能无法使用'
    showPrompt.value = true
  })
})
</script>

<template>
  <Transition name="slide-up">
    <div v-if="showPrompt" class="reload-prompt" role="alertdialog" aria-labelledby="prompt-message">
      <div id="prompt-message" class="message">
        {{ promptMessage }}
      </div>
      <div class="actions">
        <button 
          v-if="promptMessage.includes('新内容')"
          type="button" 
          class="reload-btn" 
          @click="reload"
        >
          重载
        </button>
        <button type="button" class="close-btn" @click="close">
          关闭
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.reload-prompt {
  position: fixed;
  right: 16px;
  bottom: 16px;
  left: 16px;
  max-width: 400px;
  margin-left: auto;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.dark .reload-prompt {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.message {
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.reload-btn,
.close-btn {
  padding: 6px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reload-btn {
  background-color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  color: white;
}

.reload-btn:hover {
  background-color: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
}

.close-btn:hover {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand);
}

@media (min-width: 768px) {
  .reload-prompt {
    left: auto;
    width: 400px;
  }
}
</style>