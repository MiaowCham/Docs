<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const scrollTop = ref(0)
const props = defineProps({
  threshold: {
    type: Number,
    default: 100
  }
})

const getScrollTop = () => {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  scrollTop.value = 0
}

const show = computed(() => scrollTop.value > props.threshold)

let scrollHandler: () => void

onMounted(() => {
  scrollTop.value = getScrollTop()
  
  let ticking = false
  scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        scrollTop.value = getScrollTop()
        ticking = false
      })
      ticking = true
    }
  }
  
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<template>
  <Transition name="fade">
    <div class="back-to-top" v-show="show" @click="scrollToTop">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
        />
      </svg>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.back-to-top {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--vp-c-brand);
    border-color: var(--vp-c-brand);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    svg {
      fill: white;
    }
  }

  svg {
    width: 16px;
    height: 16px;
    fill: var(--vp-c-text-1);
    transition: fill 0.3s ease;
  }
}

.dark {
  .back-to-top {
    background-color: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
  }
}
</style>