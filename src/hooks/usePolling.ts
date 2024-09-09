export function usePolling() {
  type AnonymousFunc = (...args: any) => void

  const timer = ref<number>()

  function startTimer(func: AnyFunction | AnonymousFunc, delay: number = 1000) {
    stopTimer()
    myInterval(func, delay)
  }

  function stopTimer() {
    clearTimeout(timer.value)
    timer.value = undefined
  }

  function myInterval(func: AnyFunction | AnonymousFunc, delay: number) {
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
