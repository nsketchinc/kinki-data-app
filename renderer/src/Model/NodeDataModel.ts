import {Vector3} from "three";
import {saveJson} from "@/Model/JsonManager";
import short from 'short-uuid'
import NodePositionControl from "@/Controller/NodePositionControl";
import {getRandomColor} from "@/styles/theme";

export const NodeType = {
  Undefined: 'Undefined',
  Category: 'Category',
  Website: 'Website',
  Video: 'Video',
} as const
export type NodeType = typeof NodeType[keyof typeof NodeType]

export class BaseNodeData {
  index: number = 0
  id: string = ''
  title: string = 'We'
  type: NodeType = NodeType.Category
  visualizedBy: string = ""
  path: string = ""
  duration: number = 10
  position: Vector3 = new Vector3()
  color: number = 0xffffff
  children: BaseNodeData[] = []
}

class NodeDataModel {

  nodeDatasTree: BaseNodeData[] = []
  nodeDatasArray: BaseNodeData[] = []

  constructor() {
  }

  setJson(
    jsondata?: (BaseNodeData)[]
  ) {
    if(jsondata){
      this.nodeDatasTree = this.parseJsonData(jsondata)
    }

    if(this.nodeDatasArray.length == 0){
        const top = new BaseNodeData()
        top.id = short.generate()
        this.nodeDatasTree.push(top)
        this.nodeDatasArray.push(top)
    }

    const positions = new NodePositionControl(this.nodeDatasTree).positions
    for (let i = 0; i < this.nodeDatasArray.length; i++) {
      this.nodeDatasArray[i].position = new Vector3(positions[i].x, positions[i].y, positions[i].z)
    }
  }

  saveToJson() {

    const data = this.makeSaveJson(this.nodeDatasTree)
    saveJson(data)


  }
  makeSaveJson(dataTree: BaseNodeData[]){
    //TODO なにもないときはかりでなにかついか
    const nodeDatas = [];

    for (const d of dataTree) {
      let data = {
      id : d.id,
      title : d.title,
      type : d.type,
      visualizedBy : d.visualizedBy,
      path : d.path,
      duration : d.duration,
      color : d.color,
      children : this.makeSaveJson(d.children),
      }
      nodeDatas.push(data)
    }

    return nodeDatas
  }


  addNode(parentId: string, data: BaseNodeData) {
    data.color = getRandomColor().getHex()
    data.id = short.generate(),
      this.searchAndAddData(this.nodeDatasTree, parentId, data)
    this.saveToJson()
  }

  editNode(id: string, title?: string, visualizedBy?: string, path?: string, duration?: number) {

    const data = this.getNode(id)
    if (title) data.title = title;
    if (visualizedBy) data.visualizedBy = visualizedBy
    if (path) data.path = path
    if (duration) data.duration = duration
    console.log("????", data.title, duration)
    this.saveToJson()
  }

  removeNode(id: string) {
    console.log('remove children', id)
    this.searchAndRemove(this.nodeDatasTree, id)
    this.saveToJson()
  }

  getNode(id: string) {
    for (const baseNodeData of this.nodeDatasArray) {
      if (baseNodeData.id == id)
        return baseNodeData
    }

    return this.nodeDatasArray[0]
  }

  // ===================
  // private methods
  // ===================

  private _index = 0

  private parseJsonData(
    jsondata: (BaseNodeData)[]
  ) {
    //TODO なにもないときはかりでなにかついか
    const nodeDatas = [];

    for (const d of jsondata) {
      let data = new BaseNodeData()
      data.index = this._index
      data.id = d.id
      this.nodeDatasArray.push(data)
      this._index += 1;
      data.title = d.title
      data.type = d.type
      data.visualizedBy = d.visualizedBy
      data.path = d.path
      data.duration = d.duration
      data.children = this.parseJsonData(d.children)
      data.color = d.color ? d.color : getRandomColor().getHex()
      nodeDatas.push(data)
      console.log("???", this._index, d.title)
    }

    return nodeDatas
  }

  getNumLayer(searchId: string) {
    return this._numLayer(searchId, this.nodeDatasTree, 0)
  }

  private _numLayer(searchId: string, dataTree: BaseNodeData[], layer: number) {
    for (const nodeData of dataTree) {
      if (nodeData.id == searchId) {
        return layer
      }
      const next = this._numLayer(searchId, nodeData.children, layer + 1)
      if(next > 0)
        return next
    }
    return 0
  }

  private searchAndAddData(
    dataTree: BaseNodeData[],
    searchId: string,
    newData: BaseNodeData
  ) {
    for (const nodeData of dataTree) {
      if (nodeData.id == searchId) {
        nodeData.children.push(newData)
        break
      }
      this.searchAndAddData(nodeData.children, searchId, newData)
    }
  }

  private searchAndRemove(dataTree: BaseNodeData[], id: string) {
    for (const nodeData of dataTree) {
      if (nodeData.children.length > 0) {
        let removeId = -1
        for (let i = 0; i < nodeData.children.length; i++) {
          const child = nodeData.children[i]
          if (child.id == id) {
            removeId = i
            break
          }
        }

        if (removeId != -1) {
          nodeData.children.splice(removeId, 1)
        }
      }

      this.searchAndRemove(nodeData.children, id)
    }
  }
}

export default new NodeDataModel()
