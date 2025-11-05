<script setup lang="ts">
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
      <div class="panel-header">
        <h2>标题</h2>
        <button class="close-btn" aria-label="关闭" @click="handleClose">
          <Icon name="ph:x-bold" />
        </button>
      </div>

      <div class="panel-content">
        <!-- 你的内容放这里 -->
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
  --float-distance: 20vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95%;
  max-width: 700px;
  max-height: 80vh;
  max-height: 80dvh;
  border: 1px solid var(--c-primary);
  border-radius: 1em;
  box-shadow: 0 0.25em 0.5em var(--ld-shadow);
  background-color: var(--ld-bg-card);
  padding: 1.2em;
  overflow-y: auto;
  transition: all var(--delay, 200);
  z-index: 1000;
  .panel-header {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    h2 {
      margin: 0;
      font-size: 1.2em;
      font-weight: 600;
      color: var(--c-text);
    }
    .close-btn {
      padding: 0.4em;
      border: none;
      border-radius: 0.5em;
      background-color: transparent;
      color: var(--c-text-2);
      cursor: pointer;
      transition: all 0.1s;
      &:hover {
        background-color: var(--c-bg-soft);
        color: var(--c-text-1);
      }
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