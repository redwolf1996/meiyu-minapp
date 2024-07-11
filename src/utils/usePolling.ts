export function usePolling() {
  const timer: any = ref(null)

  function startTimer(func: Function, delay: number = 1000) {
    stopTimer()
    myInterval(func, delay)
  }

  function stopTimer() {
    clearTimeout(timer.value)
    timer.value = null
  }

  function myInterval(func: Function, delay: number) {
    timer.value = setTimeout(() => {
      func()
      myInterval(func, delay)
    }, delay)
  }

  return {
    timer,
    startTimer,
    stopTimer,
  }
}
