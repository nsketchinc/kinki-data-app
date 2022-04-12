import {mdiMinusCircleOutline, mdiPencil} from '@mdi/js'
import React from 'react'
import ModalContainer from '../ModalContainer'
import ModalMenuItem from "@/components/Modal/ui/ModalMenuItem";
import Spacer from "@/components/common/Spacer";
import {ModalType} from "@/types/ModalType";
import useModalStore from "@/store/modalStore";
import {NodeType} from "@/Model/NodeDataModel";

export default function EditModal( props:{type:string, onDelete:()=>void}) {

  const {setModalType} = useModalStore()

  function onClickEdit() {
    if(props.type == NodeType.Video){
      setModalType(ModalType.EditVideo)
    }else{
      setModalType(ModalType.EditWebsite)
    }
  }

  return (
    <ModalContainer>

      <ModalMenuItem
        title={"Edit"}
        icon={mdiPencil}
        onClick={() => onClickEdit()}/>

      <Spacer size={"10px"}/>
      <div style={{width: `100%`, borderBottom: '1px solid #ccc'}}/>
      <Spacer size={"10px"}/>

      <ModalMenuItem
        title={"DELETE"}
        icon={mdiMinusCircleOutline}
        color={"#C62420"}
        onClick={props.onDelete}/>

    </ModalContainer>
  )
}
