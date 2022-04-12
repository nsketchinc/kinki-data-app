import {Mesh, MeshBasicMaterial, SphereGeometry} from 'three'
import TouchView3D from "@/components/WorldView/common/TouchView3D";

export default class TouchArea extends TouchView3D {
  private _mesh: Mesh
  private _onClickFunction: Function

  constructor(
    __onClickFunction: Function = (e) => {}
  ) {
    super()
    this._onClickFunction = __onClickFunction

    const boxGeometry2 = new SphereGeometry(0.6)
    const boxMaterial2 = new MeshBasicMaterial({
      color: 0xffffff,
      // transparent: true,
      opacity: 0,
    })

    this._mesh = new Mesh(boxGeometry2, boxMaterial2)
    this._mesh.visible = false
    this.add(this._mesh)
  }

  onClick() {
    super.onClick()
    this._onClickFunction()
  }
}
