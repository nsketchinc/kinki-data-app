import {PerspectiveCamera, Raycaster, Vector2} from 'three'
import TouchView3D from "@/components/WorldView/common/TouchView3D";

export default class HandleMouseEvent {
  mouse: Vector2
  raycaster: Raycaster
  camera: PerspectiveCamera

  views: TouchView3D[] = []
  prevView: TouchView3D = null

  prevMouse: Vector2
  dragDistance: number = 0

  // touch
  private _dragArea: HTMLElement

  constructor(__camera: PerspectiveCamera, __dragArea: HTMLElement) {
    this.mouse = new Vector2()
    this.prevMouse = new Vector2()
    this.raycaster = new Raycaster()
    this.camera = __camera
    this.prevView = new TouchView3D() // null回避

    this._dragArea = __dragArea

    this._dragArea.addEventListener('mousedown', this.onMouseDown.bind(this), false)
    this._dragArea.addEventListener('touchstart', this.onMouseDown.bind(this), false)
  }

  add(__touchView3d: TouchView3D) {
    this.views.push(__touchView3d)
    this.prevView = __touchView3d
  }

  remove(__touchView3d: TouchView3D) {
    for (let i = 0; i < this.views.length; i++) {
      if (this.views[i] === __touchView3d) {
        delete this.views[i];
        this.views.slice(i, 1)
        this.prevView = null
        return
      }
    }
  }

  private onMouseDown(event) {
    this.dragDistance = 0

    let clientX, clientY
    if ('touches' in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1
    this.prevMouse.x = clientX
    this.prevMouse.y = clientY

    document.addEventListener('mousemove', this.onMouseMoveHandler, false)
    document.addEventListener('touchmove', this.onMouseMoveHandler, false)
    document.addEventListener('touchend', this.onClickHandler)
    document.addEventListener('mouseup', this.onClickHandler)
  }

  private onMouseMoveHandler = (event) => {
    let clientX, clientY
    if ('touches' in event) {
      clientX = event.touches[0].clientX
      clientY = event.touches[0].clientY
    } else {
      clientX = event.clientX
      clientY = event.clientY
    }
    this.mouse.x = (clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(clientY / window.innerHeight) * 2 + 1

    const dx = clientX - this.prevMouse.x
    const dy = clientY - this.prevMouse.y
    this.dragDistance = this.dragDistance + Math.sqrt(dx * dx + dy * dy)
    this.prevMouse.x = clientX
    this.prevMouse.y = clientY

    const target = this.checkIntersects()
    if (target != null) {
      target.isOver = true

      if (this.prevView != target) {
        this.prevView.isOver = false
      }
      this.prevView = target
    } else {
      this.prevView.isOver = false
    }
  }

  private onClickHandler = () => {

    document.removeEventListener('mousemove', this.onMouseMoveHandler, false)
    document.removeEventListener('touchmove', this.onMouseMoveHandler, false)
    document.removeEventListener('touchend', this.onClickHandler)
    document.removeEventListener('mouseup', this.onClickHandler)

    if (this.dragDistance > 20) return

    const target = this.checkIntersects()
    if (target != null) target.onClick()
  }

  private checkIntersects(): TouchView3D {
    this.raycaster.setFromCamera(this.mouse, this.camera)

    for (const view of this.views) {
      const intersects = this.raycaster.intersectObjects(view.children, false)
      if (intersects.length > 0 && view.tangible) {
        return view
      }
    }
    return null
  }
}
