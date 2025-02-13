export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 20000,
  immediate: boolean = true,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>): void {
    const later = () => {
      timeout = null
      if (!immediate) {
        func(...args)
      }
    }

    const callNow = immediate && timeout === null

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)

    if (callNow) {
      func(...args)
    }
  }
}
