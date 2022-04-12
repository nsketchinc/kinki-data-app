import useModalStore from '@/store/modalStore'
import {ModalType} from '@/types/ModalType'
import {mdiMinusCircleOutline, mdiPencil, mdiPlusCircleOutline} from '@mdi/js'
import React from 'react'
import ModalContainer from '../ModalContainer'
import ModalMenuItem from "@/components/Modal/ui/ModalMenuItem";
import Spacer from "@/components/common/Spacer";

export default function BaseModal({canDelete = true ,canAdd = true, onDelete}: { canDelete?: boolean,canAdd?:boolean, onDelete:()=>void }) {

  const {setModalType} = useModalStore()

  return (
    <ModalContainer>
      {canAdd &&
        <div>
          <ModalMenuItem
            title={"Add Category"}
            icon={mdiPlusCircleOutline}
            onClick={() => setModalType(ModalType.CreateCategory)}/>

          <ModalMenuItem
            title={"Add Video"}
            icon={mdiPlusCircleOutline}
            onClick={() => setModalType(ModalType.CreateVideo)}/>

          <ModalMenuItem
            title={"Add Website"}
            icon={mdiPlusCircleOutline}
            onClick={() => setModalType(ModalType.CreateWebsite)}/>
        </div>
      }

      <ModalMenuItem
        title={"Edit"}
        icon={mdiPencil}
        onClick={() => setModalType(ModalType.EditCategory)}/>

      {canDelete &&
        <div>
          <Spacer size={"10px"}/>
          <div style={{width: `100%`, borderBottom: '1px solid #ccc'}}/>
          <Spacer size={"10px"}/>

          <ModalMenuItem
            title={"DELETE"}
            icon={mdiMinusCircleOutline}
            color={"#C62420"}
            onClick={onDelete}/>
        </div>
      }

    </ModalContainer>
  )
}
