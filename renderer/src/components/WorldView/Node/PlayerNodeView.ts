import Capsule3D from '@/components/WorldView/Capsule3D'
import {Color, Group, Vector3} from 'three'
import NodeView from './NodeView'
import TextRandom3D from "@/utils/3d/primitive/TextRandom3D";
import {BaseNodeData} from "@/Model/NodeDataModel";
import Variables from "@/components/common/variables";

export default class PlayerNodeView extends NodeView {
  authorText: TextRandom3D
  titleText: TextRandom3D

  title: string
  author: string
  capsule: Capsule3D

  constructor(data: BaseNodeData, color: Color) {
    super(data)

    this.title = data.title
    this.author = data.visualizedBy

    this.titleText = new TextRandom3D(
      new Vector3(0, -0.1, 0),
      this.title,
      Variables.TITLE_FONT_SIZE,
      Variables.TITLE_FONT_COLOR,
    )
    this.add(this.titleText.getText())

    this.authorText = new TextRandom3D(
      new Vector3(0, -0.25, 0),
      'Visualized by ' + this.author,
      Variables.AUTHOR_FONT_SIZE,
      Variables.AUTHOR_FONT_COLOR,
    )
    this.add(this.authorText.getText())

    this.capsule = new Capsule3D(
      new Vector3(0, -0.1, 0),
      this.titleText.getTextWidth(),
      Variables.CAPSULE_HEIGHT,
      color
    )
    const group:Group = new Group()
    group.add(this.capsule.getStroke())
    // group.add(this.capsule.stroke2_)
    // group.add(this.capsule.getMesh())
    this.add(group)


    this.show()
  }

  show() {
    super.show()
  }

  override showEffect() {
    this.titleText.show()
    this.authorText.show()
    this.capsule.showEffect()
  }

  hide() {
    super.hide()
    this.titleText.hide()
    this.authorText.hide()
  }

}
