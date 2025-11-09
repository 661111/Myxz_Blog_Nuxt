<script setup lang="ts">
import MainCard from '../card/console/main.vue';

const props = defineProps<{
  show?: boolean
  duration?: number
  onClose?: () => void
}>()
const emit = defineEmits<{
  close: []
}>()
function handleClose() {
  props.onClose?.() || emit('close')
}
</script>

<template>
  <Transition name="float-in">
    <div v-if="show" class="popover-mask" @click="handleClose" />
  </Transition>

  <Transition name="float-in">
    <div v-if="show" class="popover-panel">
      <button class="close-btn" aria-label="关闭" @click="handleClose">
        <Icon name="ph:x-bold" />
      </button>

      <div class="panel-content">
        <MainCard />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.popover-mask {
  position: fixed;
  inset: 0;
  background-color: #0003;
  backdrop-filter: blur(0.2em);
  transition: opacity var(--delay, 200);
  z-index: 100;
  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }
}
.popover-panel {
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100dvh;
  top: 0;
  left: 0;
  z-index: 9999;
  justify-content: center;
  transition: .3s ease-out;
  flex-direction: column;
  pointer-events: none;
  -webkit-user-select: none;
  .close-btn {
    width: 100%;
    height: 60px;
    position: absolute;
    top: 0;
    left: 94%;
    transform: translateX(-50%);
    font-size: 35px;
    color: var(--heo-fontcolor);
    transition: .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1400px;
    z-index: 1;
    &:hover {
      background-color: var(--c-bg-soft);
      color: var(--c-text-1);
    }
  }
  .panel-content {
    font-size: 0.95em;
    color: var(--c-text-1);
    line-height: 1.6;
  }
}
.float-in-enter-active,
.float-in-leave-active {
  transition: all var(--delay, 200);
}
.float-in-enter-from,
.float-in-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-50% - 20vh));
}
@media (max-width: 768px) {
  .popover-panel {
    width: 95vw;
    max-height: 75vh;
    max-height: 75dvh;
  }
}
</style>