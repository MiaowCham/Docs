<template>
  <div class="image-preview-container">
    <!-- 图片预览遮罩层 -->
    <div 
      v-if="showPreview" 
      class="image-preview-overlay"
      @click="closePreview"
    >
      <div :class="['image-preview-content', { 'content-zoomed': isZoomed }]" @click.stop>
        <img 
          :src="previewSrc" 
          :alt="previewAlt"
          :class="['preview-image', { 'zoomed': isZoomed }]"
          @click="handleImageClick"
          @mousemove="handleMouseMove"
        />
        <button 
          class="close-btn"
          @click="closePreview"
          aria-label="关闭预览"
        >
          ×
        </button>
      </div>
      <div class="preview-hint">点击空白处退出</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showPreview = ref(false)
const previewSrc = ref('')
const previewAlt = ref('')
const isZoomed = ref(false)
const mousePosition = ref({ x: 0, y: 0 })

const openPreview = (src: string, alt: string) => {
  previewSrc.value = src
  previewAlt.value = alt
  showPreview.value = true
  isZoomed.value = false
  document.body.style.overflow = 'hidden'
}

const closePreview = () => {
  showPreview.value = false
  isZoomed.value = false
  document.body.style.overflow = ''
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isZoomed.value) {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    mousePosition.value = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }
}

const handleImageClick = (e: MouseEvent) => {
  if (!isZoomed.value) {
    // 记录点击位置
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    mousePosition.value = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }
  toggleZoom()
}

const toggleZoom = () => {
  isZoomed.value = !isZoomed.value
  // 放大时根据鼠标位置调整滚动位置
  if (isZoomed.value) {
    setTimeout(() => {
      const content = document.querySelector('.image-preview-content')
      const img = document.querySelector('.preview-image')
      if (content && img) {
        const imgRect = img.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()
        
        // 计算目标滚动位置
        const targetX = mousePosition.value.x * imgRect.width - contentRect.width / 2
        const targetY = mousePosition.value.y * imgRect.height - contentRect.height / 2
        
        content.scrollLeft = Math.max(0, targetX)
        content.scrollTop = Math.max(0, targetY)
      }
    }, 100)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showPreview.value) {
    closePreview()
  }
}

const handleDocumentImageClick = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target.tagName === 'IMG' && target.closest('.vp-doc')) {
    // 检查是否在表格中的图片或带有data-clickable属性的图片
    const isInTable = target.closest('table')
    const hasClickableAttr = target.hasAttribute('data-clickable')
    if (isInTable || hasClickableAttr) {
      e.preventDefault()
      openPreview(target.src, target.alt || '')
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleDocumentImageClick)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleDocumentImageClick)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
}

.image-preview-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
}

.image-preview-content.content-zoomed {
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 8px;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.image-preview-content.content-zoomed::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}



.preview-image {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  cursor: zoom-in;
  transition: all 0.3s ease;
  display: block;
  height: auto;
}

.preview-image.zoomed {
  max-width: none;
  max-height: none;
  width: 120%;
  height: auto;
  cursor: zoom-out;
  transform: scale(1);
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  padding: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* 为所有图片添加圆角 */
:global(.vp-doc img) {
  border-radius: 6px;
}

/* 为表格中的图片和带有data-clickable属性的图片添加点击提示样式 */
:global(.vp-doc table img),
:global(.vp-doc img[data-clickable]) {
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

:global(.vp-doc table img:hover),
:global(.vp-doc img[data-clickable]:hover) {
  transform: scale(1.05);
  opacity: 0.92; /* 减弱亮度降低效果 */
}

.preview-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  pointer-events: none;
  user-select: none;
}
</style>