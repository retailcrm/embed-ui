export default class Scheduler {
  private _timer: number | undefined = undefined

  schedule (operation: () => void, delay: number) {
    clearTimeout(this._timer)
    if (delay > 0) {
      this._timer = setTimeout(() => operation(), delay)
    } else {
      operation()
    }
  }

  abort () {
    clearTimeout(this._timer)
  }
}