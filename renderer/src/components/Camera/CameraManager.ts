import * as THREE from 'three'
import {PerspectiveCamera, Vector2, Vector3} from 'three'
import {SmoothNumber} from '@/utils/3d/SmoothNumber'
import {SmoothVector3} from '@/utils/3d/SmoothVector3'
import {SmoothVector2} from '@/utils/3d/SmoothVector2'
import TWEEN, {Tween} from '@tweenjs/tween.js'

class CameraManager {

  camera: PerspectiveCamera

  // for interactive
  private STATE = {NONE: -1, ROTATE: 0}
  private _state = this.STATE.NONE
  private _prevMouse = new Vector2()

  // restriction
  // public maxRotationX: number = Infinity
  // public minRotationX: number = -Infinity
  // public maxRotationY: number = Math.PI / 2 - 0.1
  // public minRotationY: number = 0
  public minDistance: number = 5
  public maxDistance: number = 40
  public maxX: number = 0.0
  public minX: number = -100.0
  public maxY: number = 0.0
  public minY: number = -100.0

  // rotation
  private _goalRotation: Vector2 = new Vector2(0, Math.PI / 2)
  private _currentRotation: SmoothVector2 = new SmoothVector2()

  // distance
  private _goalDistance: number = 10
  private _currentDistance: SmoothNumber = new SmoothNumber()

  // lookAt
  private _currentLookAt: SmoothVector3 = new SmoothVector3()
  private _goalLookAt: Vector3 = new Vector3(0, 0, 0)

  // tween
  private moveTween: Tween<Vector2>
  private lookatTween: Tween<Vector3>
  private distanceTween: Tween<CameraManager>

  public getRotation(): Vector2 {
    return this._currentRotation.current.clone()
  }

  public getDistance(): number {
    return this._currentDistance.current
  }

  public getLookAt(): Vector3 {
    return this._currentLookAt.current.clone()
  }

  public setRotateSensitivity(value: number) {
    this._currentRotation.sensitivity = value
  }

  public setLookAtSensitivity(value: number) {
    this._currentLookAt.sensitivity = value
  }

  public setDistanceSensitivity(value: number) {
    this._currentDistance.sensitivity = value
  }

  public setBoundary(maxX: number, minX: number, maxY: number, minY: number) {
    this.maxX = maxX
    this.minX = minX
    this.maxY = maxY
    this.minY = minY
  }

  constructor() {
  }

  setCamera(
    camera: PerspectiveCamera,
  ) {
    this.camera = camera
    this.camera.fov = 60
    //this.camera.aspect = 1 //aspect = 1 はwindowが正方形の場合なので削除
    this.camera.near = 0.1
    this.camera.far = 2000
    this.camera.updateProjectionMatrix() //near, far の更新のためにこれが必要だった。

    this.setRotateSensitivity(0.25)
    this.setLookAtSensitivity(0.25)
    this.setDistanceSensitivity(0.28)

    this.camera.up.set(0, 0, -1)

    this._currentRotation.reset(this._goalRotation.x, this._goalRotation.y - 0.3)
    this._currentDistance.reset(this._goalDistance - 4)

    document.addEventListener('mousedown', this.onMouseDown, false)
    document.addEventListener('wheel', this.onMouseWheel, false)

    this.update()
  }

  public jump(__to: Vector3): void {
    this.camera.position.set(__to.x, __to.y, __to.z)
  }

  public moveTo(
    __to: Vector2,
    __lookAt: Vector3,
    __distance: number = 0,
    duration = 1000
  ): void {

    if (this.moveTween) this.moveTween.stop()

    // this.moveTween = new TWEEN.Tween(this._goalRotation)
    // .to(this.getRestrictedRotation(__to), duration)
    // .easing(TWEEN.Easing.Quintic.Out)
    // .start()

    if (this.distanceTween) this.distanceTween.stop()

    this.distanceTween = new TWEEN.Tween(this)
      .to({_goalDistance: __distance}, duration)
      .easing(TWEEN.Easing.Quintic.Out)
      .start()

    if (this.lookatTween) this.lookatTween.stop()

    this.lookatTween = new TWEEN.Tween(this._currentLookAt.target)
      .to(__lookAt, duration)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .start()
  }

  public update(): void {

    // this._currentRotation.setGoal(this._goalRotation.x, this._goalRotation.y)
    this._currentDistance.setGoal(this._goalDistance)
    this._currentLookAt.setGoal(this._goalLookAt.x, this._goalLookAt.y, this._goalLookAt.z)

    // this._currentRotation.update()
    this._currentDistance.update()
    this._currentLookAt.update()

    // let orbitPos: Vector3 = this.getOrbitPosition(
    //   this._currentRotation.current.x,
    //   this._currentRotation.current.y,
    //   this._currentDistance.current,
    // )
    let orbitPos: Vector3 = new Vector3(0.0, this._currentDistance.current, 0.0)
    const position = new Vector3(
      this._currentLookAt.current.x + orbitPos.x,
      this._currentLookAt.current.y + orbitPos.y,
      this._currentLookAt.current.z + orbitPos.z,
    )

    this.camera.position.set(position.x, position.y, position.z)

    const lookat = this._currentLookAt.current
    this.camera.lookAt(lookat)

  }

  private getOrbitPosition(
    __theta: number,
    __phi: number,
    __distance: number,
  ): Vector3 {
    let orbitPosition: Vector3 = new Vector3(
      Math.cos(__phi) * Math.cos(__theta),
      Math.sin(__phi),
      Math.cos(__phi) * Math.sin(__theta),
    )
    orbitPosition.multiplyScalar(__distance)
    return orbitPosition
  }

  private getRestrictedPosition(__position: Vector3): Vector3 {
    const vec = new Vector3()
    vec.y = __position.y

    vec.x = Math.max(
      Math.min(__position.x, this.maxX),
      this.minX
    )
    vec.z = Math.max(
      Math.min(__position.z, this.maxY),
      this.minY
    )
    return vec
  }

  private onMouseDown = (event) => {

    // event.preventDefault()

    switch (event.button) {
      case THREE.MOUSE.LEFT:
        this._state = this.STATE.ROTATE
        break
    }

    if (this._state !== this.STATE.NONE) {
      this._prevMouse.set(event.clientX, event.clientY)
      document.addEventListener('mousemove', this.onMouseMove, false)
      document.addEventListener('mouseup', this.onMouseUp, false)
    }
  }

  private onMouseMove = (event) => {

    let deltaScreenX: number = event.clientX - this._prevMouse.x
    let deltaScreenY: number = event.clientY - this._prevMouse.y
    this._goalLookAt.x += -deltaScreenX * (0.01 + 0.03 / (this._currentDistance.current - this.minDistance + 10))
    this._goalLookAt.z += -deltaScreenY * (0.01 + 0.03 / (this._currentDistance.current - this.minDistance + 10))
    this._goalLookAt = this.getRestrictedPosition(this._goalLookAt)

    switch (this._state) {
      case this.STATE.ROTATE:
        // this._goalRotation.x += deltaScreenX * 0.005
        // this._goalRotation.y += deltaScreenY * 0.005
        // this._goalRotation = this.getRestrictedRotation(this._goalRotation)
        // console.log(this._goalRotation)
        break
    }

    this._prevMouse.set(event.clientX, event.clientY)
  }

  private onMouseUp = (event) => {

    document.removeEventListener('mousemove', this.onMouseMove, false)
    document.removeEventListener('mouseup', this.onMouseUp, false)
    this._state = this.STATE.NONE
  }

  private onMouseWheel = (event) => {
    this._goalDistance -= event.wheelDelta / 100
    this._goalDistance = Math.max(Math.min(this._goalDistance, this.maxDistance), this.minDistance)
  }

  // private getRestrictedRotation(__rotation: Vector2): Vector2 {
  //   const vec = new Vector2();
  //   vec.x = Math.max(Math.min(__rotation.x, this.maxRotationX), this.minRotationX)
  //   vec.y = Math.max(Math.min(__rotation.y, this.maxRotationY), this.minRotationY)
  //   return vec
  // }
}

export default new CameraManager()
