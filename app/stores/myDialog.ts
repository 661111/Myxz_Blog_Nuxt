import { LazyPopoverMyDialog } from '#components'

export const useMyDialogStore = defineStore('myDialog', () => {
  const popoverStore = usePopoverStore()
  let dialog: ReturnType<typeof popoverStore.use> | null = null

  function getDialog() {
    if (!dialog) {
      dialog = popoverStore.use(() => h(LazyPopoverMyDialog))
    }
    return dialog
  }

  function open() {
    const { open } = getDialog()
    open()
  }

  function close() {
    const { close } = getDialog()
    close()
  }

  return {
    open,
    close,
  }
})