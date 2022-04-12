import CameraManager from "@/components/Camera/CameraManager";
import {BaseNodeData} from "@/Model/NodeDataModel";
import TouchArea from "@/components/WorldView/common/TouchArea";
import {Mesh, MeshBasicMaterial, SphereGeometry} from "three";
import useNodeStore from "@/store/nodeStore";

export default class NodeView extends TouchArea {
  nodetype: string

  data:BaseNodeData

  constructor(data: BaseNodeData) {
    super()
    this.data = data
    this.nodetype = data.type
    this.update();


    const boxGeometry = new SphereGeometry(0.4)
    const boxMaterial = new MeshBasicMaterial({
      color: 0xff0000,
      // transparent: true,
      opacity: 1,
      //wireframe : true
    })
    const _mesh = new Mesh(boxGeometry, boxMaterial)
    _mesh.visible = false
    this.add(_mesh)
  }

  show() {
  }

  showEffect() {
  }

  hide() {
  }

  update(){
    const target = this.position.clone().add(CameraManager.camera.position.clone()).sub(CameraManager.getLookAt())
    this.lookAt(target)
  }

  onClick() {
    super.onClick();
    console.log("click", this.data.title)

    // useModalStore.setState({modalPos: new Vector2(x, y)})
    useNodeStore.setState({currentId: this.data.id})
  }

}
