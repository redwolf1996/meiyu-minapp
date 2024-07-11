export function usePolling() {
  const timer = ref<number>()

  function startTimer(func: Function, delay: number = 1000) {
    stopTimer()
    myInterval(func, delay)
  }

  function stopTimer() {
    clearTimeout(timer.value)
    timer.value = undefined
  }

  function myInterval(func: Function, delay: number) {
    timer.value = setTimeout(() => {
      func()
      myInterval(func, delay)
    }, delay)
  }

  onHide(() => {
    stopTimer()
  })

  return {
    timer,
    startTimer,
    stopTimer,
  }
}
