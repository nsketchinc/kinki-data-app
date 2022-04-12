import React from 'react'
import {FormProvider, useForm} from "react-hook-form";
import ModalTitle from "@/components/Modal/ui/ModalTitle";
import MyInput from "@/components/Modal/form/MyInput";
import MyLabel from "@/components/Modal/form/MyLabel";
import CancelButton from "@/components/Modal/form/CancelButton";
import SubmitButton from "@/components/Modal/form/SubmitButton";
import ModalContainer from "@/components/Modal/ModalContainer";
import MyFileInput from "@/components/Modal/form/MyFileInput";

export default function VideoAddModal(props:{onSubmit: (e) => void}) {

  const methods = useForm();

  return (
    <ModalContainer>
      <FormProvider {...methods}>

        <ModalTitle title={'Add Video'}/>

        <form onSubmit={methods.handleSubmit(props.onSubmit)}>

          <MyLabel>Video Title</MyLabel>
          <MyInput
            placeholder="タイトル"
            inputName={"title"}
            maxLength={34}
          />

          <MyLabel>Visualized by</MyLabel>
          <MyInput
            placeholder=""
            inputName={"visualizedBy"}
          />

          <MyLabel>File</MyLabel>
          <MyFileInput
            placeholder=""
            inputName={"video"}
          />

          <SubmitButton isValid={methods.formState.isValid}/>
          <CancelButton></CancelButton>
        </form>
      </FormProvider>
    </ModalContainer>
  )
}

