import useModalStore from '@/store/modalStore'
import useNodeStore from '@/store/nodeStore'
import {useEffect, useState} from 'react'
import BaseModal from './Views/BaseModal'
import ReactModal from "react-modal";
import CategoryAddModal from "@/components/Modal/Views/CategoryAddModal";
import CategoryEditModal from "@/components/Modal/Views/CategoryEditModal";
import VideoAddModal from "@/components/Modal/Views/VideoAddModal";
import VideoEditModal from "@/components/Modal/Views/VideoEditModal";
import WebsiteAddModal from "@/components/Modal/Views/WebsiteAddModal";
import WebsiteEditModal from "@/components/Modal/Views/WebsiteEditModal";
import {ModalType} from "@/types/ModalType";
import NodeDataModel, {BaseNodeData, NodeType} from "@/Model/NodeDataModel";
import CameraManager from "@/components/Camera/CameraManager";
import EditModal from "@/components/Modal/Views/EditModal";
import {useRouter} from "next/router";
import {MathUtils} from "@/utils/math";

ReactModal.setAppElement('#__next')

export default function NodeModal() {

  const [nodeData, setNodeData] = useState<BaseNodeData>();
  const [numLayer, setNumLayer] = useState(0);
  const {modalType, setModalType} = useModalStore()
  const {currentId, setCurrentId} = useNodeStore()
  const router = useRouter()


// local state
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    if (modalType == ModalType.CLOSE) {
      closeModal()
      return
    }
  }, [modalType]);

  useEffect(() => onChangeMode(), [currentId])

  function onChangeMode() {

    if (currentId == '' || currentId == ModalType.CLOSE) {
      closeModal()
      return
    }

    const data: BaseNodeData = NodeDataModel.getNode(currentId)
    setNumLayer(NodeDataModel.getNumLayer(currentId))

    console.log(data)

    const scenePos = data.position.clone().project(CameraManager.camera)

    const w = window.innerWidth
    const h = window.innerHeight
    const w2 = w / 2
    const h2 = h / 2
    let x = Math.ceil(w2 * (+scenePos.x) + w2)
    let y = Math.ceil(h2 * (-scenePos.y) + h2)

    if (y + 300 > h) {
      y = h - 300;
    }

    if (x - 120 < 0)
      x = 120
    if (x + 120 > w)
      x = w - 120

    setPosition({x: x, y: y})
    setNodeData(data)
    setModalType(data.type == NodeType.Category ? ModalType.Base : ModalType.Edit)
  }


  function closeModal() {
    if (currentId != ModalType.CLOSE) {
      setCurrentId('')
      setModalType(ModalType.CLOSE)
    }
  }

  const onAddCategory = data => {
    const newData = new BaseNodeData()
    newData.type = NodeType.Category
    newData.title = data.title
    NodeDataModel.addNode(currentId, newData)
    refresh()
  }

  const onEditCategory = data => {
    NodeDataModel.editNode(currentId, data.title)
    refresh()
  }

  const onAddVideo = data => {
    const newData = new BaseNodeData()
    newData.type = NodeType.Video
    newData.title = data.title
    newData.visualizedBy = data.visualizedBy
    newData.path = data.video
    NodeDataModel.addNode(currentId, newData)
    refresh()
  }

  const onEditVideo = data => {
    NodeDataModel.editNode(currentId, data.title, data.visualizedBy, data.video)
    refresh()
  }

  const onAddWebsite = data => {
    const newData = new BaseNodeData()
    newData.type = NodeType.Website
    newData.title = data.title
    newData.visualizedBy = data.visualizedBy
    newData.path = data.path
    newData.duration = data.duration
    NodeDataModel.addNode(currentId, newData)
    refresh()
  }

  const onEditWebsite = data => {
    NodeDataModel.editNode(currentId, data.title, data.visualizedBy, data.path, data.duration)
    refresh()
  }

  const onDelete = () => {
    NodeDataModel.removeNode(currentId)
    refresh()
  }

  const refresh = () => {
    closeModal()
    MathUtils.sleep(1000)
    router.reload()
  }

  const customStyles = {
    content: {
      // top: 'cal(50% + ' + position.x + "px)",
      top: position.y + 'px',
      left: position.x + 'px',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -10%)',
      padding: '0',
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  };


  return (
    <div>
      <ReactModal
        isOpen={modalType != ModalType.CLOSE}
        onRequestClose={() => {
          closeModal()
        }}
        style={customStyles}
      >
        {modalType === ModalType.Base && <BaseModal canDelete={nodeData.children.length == 0} canAdd={numLayer < 4} onDelete={onDelete}/>}
        {modalType === ModalType.Edit && <EditModal type={nodeData.type} onDelete={onDelete}/>}
        {modalType === ModalType.CreateCategory && (<CategoryAddModal onSubmit={onAddCategory}/>)}
        {modalType === ModalType.CreateVideo && <VideoAddModal onSubmit={onAddVideo}/>}
        {modalType === ModalType.CreateWebsite && <WebsiteAddModal onSubmit={onAddWebsite}/>}
        {modalType === ModalType.EditCategory && (<CategoryEditModal title={nodeData.title} onSubmit={onEditCategory}/>)}
        {modalType === ModalType.EditVideo &&
          <VideoEditModal title={nodeData.title} visualizedBy={nodeData.visualizedBy} path={nodeData.path} onSubmit={onEditVideo}/>}
        {modalType === ModalType.EditWebsite &&
          <WebsiteEditModal title={nodeData.title} visualizedBy={nodeData.visualizedBy} path={nodeData.path} duration={nodeData.duration}
                            onSubmit={onEditWebsite}/>}
        {/*{modalType == ModalType.Delete && <DeleteNodeModal/>}*/}
      </ReactModal>
    </div>
  )
}
