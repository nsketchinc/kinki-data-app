import { Object3D } from 'three/src/core/Object3D'

export default class TouchView3D extends Object3D {
  private _isOver: boolean = false
  public tangible: boolean = true

  constructor() {
    super()
  }

  onClick() {}

  set isOver(__bool: boolean) {
    if (this._isOver == __bool) return

    this._isOver = __bool
    if (this._isOver) {
      this.onTouchOver()
    } else {
      this.onTouchOut()
    }
  }

  get isOver(): boolean {
    return this._isOver
  }

  private onTouchOver() {
    //console.log("onOver", this)
  }

  private onTouchOut() {
    //console.log("onOut", this)
  }
}
