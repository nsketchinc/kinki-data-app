import React from 'react'
import {FormProvider, useForm} from "react-hook-form";
import ModalTitle from "@/components/Modal/ui/ModalTitle";
import MyInput from "@/components/Modal/form/MyInput";
import MyLabel from "@/components/Modal/form/MyLabel";
import CancelButton from "@/components/Modal/form/CancelButton";
import SubmitButton from "@/components/Modal/form/SubmitButton";
import ModalContainer from "@/components/Modal/ModalContainer";

export default function WebsiteAddModal(props:{ onSubmit: (e) => void}) {

  const methods = useForm({
    defaultValues: {
      duration: 30,
    }
  })

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

          <MyLabel>URL</MyLabel>
          <MyInput
            type={"url"}
            placeholder="https://***"
            inputName={"path"}
            maxLength={300}
          />

          <MyLabel>Duration(second)</MyLabel>
          <MyInput
            type={"number"}
            placeholder="10"
            inputName={"duration"}
          />

          <SubmitButton isValid={methods.formState.isValid}/>
          <CancelButton></CancelButton>
        </form>
      </FormProvider>
    </ModalContainer>
  )
}

