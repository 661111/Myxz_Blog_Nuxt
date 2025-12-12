import { LazyPopoverReward } from '#components'

export const useReWardStore = defineStore('reward', () => {
  const popoverStore = usePopoverStore()
  let Reward: ReturnType<typeof popoverStore.use> | null = null

  function getReward() {
    if (!Reward) {
      Reward = popoverStore.use(() => h(LazyPopoverReward))
    }
    return Reward
  }

  function open() {
    const { open } = getReward()
    open()
  }

  function close() {
    const { close } = getReward()
    close()
  }

  return {
    open,
    close,
  }
})