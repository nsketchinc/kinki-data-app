/**
 * Created by sekine
 */

import {
  Mesh,
  Line,
  MeshBasicMaterial,
  BufferGeometry,
  Vector3,
  ArcCurve,
  CircleGeometry,
  PlaneGeometry,
  Color,
  Material,
  LineBasicMaterial,
} from 'three'

import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

interface CupsuleStyle {
  opacity: number
  width: number
}

export default class Cupsule {
  width_: number
  height_: number

  r_: number
  pointL_: Vector3
  pointR_: Vector3

  top: number
  bottom: number

  connection: Vector3[]

  merged_: BufferGeometry
  mergedFill_: BufferGeometry

  stroke_: Line
  fillMesh_: Mesh
  fillMat: MeshBasicMaterial

  color: Color


  style: CupsuleStyle
  defaultStyle: CupsuleStyle

  constructor(
    _position: Vector3,
    _width: number,
    _height: number,
    _fillColor: Color
  ) {
    this.width_ = _width
    this.height_ = _height
    this.r_ = _height / 2

    this.color = _fillColor

    this.pointL_ = new Vector3(-this.width_ / 2, 0, 0)
    this.pointR_ = new Vector3(this.width_ / 2, 0, 0)

    this.top = this.height_
    this.bottom = -this.height_

    this.style = { opacity: 0.0, width: 0.01 }
    this.defaultStyle = { opacity: 0.0, width: 0.3 }

    this._initStroke()
    // this._initGeo()
  }

  _initStroke() {
    //Stroke
    const curveL = new ArcCurve(
      this.pointL_.x,
      this.pointL_.y,
      this.height_,
      -90 * (Math.PI / 180),
      90 * (Math.PI / 180),
      true
    )
    const pointsL = curveL.getPoints(50)
    const geometryL = new BufferGeometry().setFromPoints(pointsL)

    const curveR = new ArcCurve(
      this.pointR_.x,
      this.pointR_.y,
      this.height_,
      90 * (Math.PI / 180),
      -90 * (Math.PI / 180),
      true
    )
    const pointsR = curveR.getPoints(50)
    const geometryR = new BufferGeometry().setFromPoints(pointsR)

    const pointsB = []
    pointsB.push(new Vector3(this.pointL_.x, this.bottom, 0))
    pointsB.push(new Vector3(this.pointR_.x, this.bottom, 0))
    const line_geoB = new BufferGeometry().setFromPoints(pointsB)

    const pointsT = []
    pointsT.push(new Vector3(this.pointL_.x, this.top, 0))
    pointsT.push(new Vector3(this.pointR_.x, this.top, 0))
    const line_geoT = new BufferGeometry().setFromPoints(pointsT)

    this.merged_ = mergeBufferGeometries([
      geometryL,
      line_geoT,
      geometryR,
      line_geoB,
    ])

    const line_mat = new LineBasicMaterial({
      color: new Color(0x445f6c),
      linewidth: this.style.width,
      opacity: this.style.opacity,
      transparent: true,
    })

    this.stroke_ = new Line(this.merged_, line_mat)

    this.setPosition(0, 0, 0)
  }

  setPosition(_x: number, _y: number, _z: number) {
    // this.fillMesh_.position.set(_x, _y, _z)
    this.stroke_.position.set(_x, _y, _z)
  }

  setPositionWithVec3(pos: Vector3) {
    this.setPosition(pos.x, pos.y, pos.z)
  }

  setColor(_color: Color) {
    this.fillMat.color = _color
  }

  getMesh() {
    return this.fillMesh_
  }
  getStroke() {
    return this.stroke_
  }

  show() {
    const target = { opacity: 1.0, width: this.defaultStyle.width }
  }
  hide() {
    const target = { opacity: 0.0, width: this.defaultStyle.width }
  }

  updateStyle() {
    const material = this.stroke_.material
    if (material instanceof Material) {
      material.opacity = this.style.opacity
    }
  }
}
