import {Color, ShaderMaterial, Vector3} from 'three'
import NodeView from './NodeView'
import {SphereView} from "@/components/WorldView//SphereView";
import TextRandom3D from "@/utils/3d/primitive/TextRandom3D";
import {BaseNodeData} from "@/Model/NodeDataModel";
import Variables from "@/components/common/variables";

export default class CategoryNodeView extends NodeView {

  text: TextRandom3D
  sphere: SphereView

  constructor(data: BaseNodeData, size: number, color: Color) {
    super(data)

    this.text = new TextRandom3D(
      new Vector3(0, 0.10, 0),
      data.title,
      Variables.TITLE_FONT_SIZE,
      new Color(0xffffff),
      300
    )
    this.add(this.text.getText())

    this.sphere = new SphereView()
    this.sphere.initGeometry(size, color)
    this.add(this.sphere)

  }

  show() {
    super.show()
    this.sphere.show()
  }

  override showEffect() {
    this.text.show()
  }

  hide() {
    super.hide()
    this.sphere.hide()
    this.text.hide()
  }
}
