import CategoryNode from '@/components/WorldView/Node/CategoryNodeView'
import PlayerNode from '@/components/WorldView/Node/PlayerNodeView'
import d3 from 'd3-ease'

export default class ForceGraph {
  width: number
  height: number
  objList: (CategoryNode | PlayerNode)[]
  addObjList: (CategoryNode | PlayerNode)[]

  nodesData: any[]
  linksData: any[]
  simulation: d3.forceSimulation

  nodeNumber: number

  constructor(_width: number, _height: number) {
    this.width = _width
    this.height = _height
    this.objList = []
    this.nodesData = []
    this.linksData = []
    this.nodeNumber = 3
    this.addObjList = []
  }

  addNode(node: CategoryNode | PlayerNode) {
    this.objList.push(node)

    //let r = 0.5;
    let l = 0.1
    let w = 0
    let h = 0

    if (node.nodetype == 'Category') {
      w = 0.1
      h = 0.1
    } else if (node.nodetype == 'Video') {
      // w = node.cupsule.width_
      // h = node.cupsule.height_
    }
    console.log(
      'type: ' + node.nodetype + ' w:' + w.toString() + ' h:' + h.toString()
    )

    this.nodesData.push({
      index: this.objList.length - 1,
      x: node.position.x,
      y: node.position.y,
      r: 1.5,
      width: w,
      height: h,
    })

    let source_obj = node.parent
    if (source_obj === null) {
      source_obj = this.objList[0]
    }

    this.linksData.push({
      source: source_obj,
      target: this.objList[this.objList.length - 1],
      l: l,
    })

    this.simulation.nodes(this.nodesData)

    this.simulation
      .force('link')
      .links(this.linksData)
      .id(function (d) {
        return d.index
      })

    this.simulation.alpha(0.3).restart()
  }

  /*
  deleteNode(index : number){

    this.nodesData.splice(index,1);
    this.linksData.splice(index,1);

  }*/

  init(objList: (CategoryNode | PlayerNode)[]) {
    let r = 0.5
    let l = 0.1

    this.nodesData = []
    this.linksData = []

    const promise = new Promise((resolve, reject) => {
      for (let i = 0; i < objList.length; i++) {
        let w = 0
        let h = 0

        if (objList[i].nodetype == 'Category') {
          w = 0.1
          h = 0.1
        } else if (objList[i].nodetype == 'Video') {
          // w = objList[i].cupsule.width_
          // h = objList[i].cupsule.height_
        }

        console.log(
          'type: ' +
            objList[i].nodetype +
            ' w:' +
            w.toString() +
            ' h:' +
            h.toString()
        )

        this.objList.push(objList[i])
        this.nodesData.push({
          index: i,
          x: this.objList[i].position.x,
          y: this.objList[i].position.y,
          r: reject,
          width: w,
          height: h,
        })
      }

      for (let i = 0; i < this.nodesData.length; i++) {
        let source_obj = this.objList[i].parent

        //console.log( "objList[" + i.toString() +"]" )
        //console.log(source_obj);

        if (source_obj === null) {
          source_obj = this.objList[0]
        }

        this.linksData.push({
          source: source_obj,
          target: this.objList[i],
          l: l,
        })
      }

      if (this.linksData.length != 0) {
        resolve(true)
      }
    })

    promise
      .then((s) => {
        console.log(this.nodesData)
        console.log(this.linksData)

        this.simulation = d3
          .forceSimulation()
          .force(
            'link',
            d3
              .forceLink()
              .distance(function (d) {
                return d.l
              })
              .strength(0.5)
              .iterations(10)
          )

          .force(
            'collide',
            d3
              .forceCollide()
              .radius(function (d) {
                return d.r
              })
              .strength(0.001)
              .iterations(10)
          )

          /*
        .force("collision",
          d3.rectCollide()
          .size(function(d) { return d.width, d.height })
          .strength(0.001)
          .iterations(10))
       */

          .force('charge', d3.forceManyBody().strength(-0.0001))
          .force(
            'x',
            d3
              .forceX()
              .strength(0.001)
              .x(this.width / 2)
          )
          .force(
            'y',
            d3
              .forceY()
              .strength(0.001)
              .y(this.height / 2)
          )

        //console.log(this.simulation)

        this.simulation.nodes(this.nodesData).on('tick', ticked)

        this.simulation
          .force('link')
          .links(this.linksData)
          .id(function (d) {
            return d.index
          })

        console.log(this.linksData)

        function ticked() {}
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
