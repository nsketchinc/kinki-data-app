import Base from '@/components/common/instances'
import NodeDataModel, {BaseNodeData, NodeType} from "@/Model/NodeDataModel";
import {getJson} from "@/Model/JsonManager";
import Variables from "@/components/common/variables";
import PlayerNodeView from "@/components/WorldView/Node/PlayerNodeView";
import CategoryNodeView from "@/components/WorldView/Node/CategoryNodeView";
import NodeView from "@/components/WorldView/Node/NodeView";
import ConnectLineView from "@/components/WorldView/Node/ConnectLineView";
import HandleMouseEvent from "@/components/WorldView/common/HandleMouseEvent";
import {Color} from "three";

export default class Controller {

  nodeViews: NodeView[] = []
  lines: ConnectLineView[] = []
  handleMouseEvent: HandleMouseEvent

  constructor() {

    this.loadData()
    .then(() => {
      this.initView()
    })
  }

  loadData() {
    return new Promise<boolean>(async (res, rej) => {
      console.log('load data')
      getJson()
      .then((json) => {
        console.log(json)
        NodeDataModel.setJson(json)
        res(true)
      }).catch(()=>{
        NodeDataModel.setJson()
        res(true)
      })
    })
  }

  initView() {
    console.log('init view')

    this.handleMouseEvent = new HandleMouseEvent(
      Base.getCamera(),
      Base.getRenderer().domElement
    )

    this.makeNodeView(NodeDataModel.nodeDatasTree)
    this.makeConnection(0, NodeDataModel.nodeDatasTree)

  }

  makeNodeView(__nodeDatas: BaseNodeData[]) {

    for (const nodeData of __nodeDatas) {
      let nodeView
      if (nodeData.type == NodeType.Category) {
        nodeView = new CategoryNodeView(nodeData, Variables.BASE_NODE_SIZE, new Color().setHex(nodeData.color) )
      } else {
        nodeView = new PlayerNodeView(nodeData,  new Color().setHex(nodeData.color))
      }
      nodeView.position.set(nodeData.position.x, nodeData.position.y, nodeData.position.z)
      this.handleMouseEvent.add(nodeView)

      this.nodeViews.push(nodeView)
      Base.getScene().add(nodeView)
      this.makeNodeView(nodeData.children)
    }
  }

  makeConnection(__from: number, __nodeDatas: BaseNodeData[]) {
    for (const nodeData of __nodeDatas) {
      const line = new ConnectLineView(__from, nodeData.index, this.nodeViews[__from], this.nodeViews[nodeData.index])
      this.lines.push(line)
      Base.getScene().add(line)
      this.makeConnection(nodeData.index, nodeData.children)
    }
  }

}
