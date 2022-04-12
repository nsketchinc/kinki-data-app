import React from 'react'
import {FormProvider, useForm} from "react-hook-form";
import MyInput from "@/components/Modal/form/MyInput";
import MyLabel from "@/components/Modal/form/MyLabel";
import CancelButton from "@/components/Modal/form/CancelButton";
import SubmitButton from "@/components/Modal/form/SubmitButton";
import ModalContainer from "@/components/Modal/ModalContainer";
import ModalTitle from "@/components/Modal/ui/ModalTitle";
import MyNumberInput from "@/components/Modal/form/MyNumberInput";

export default function WebsiteEditModal(props: {
  title: string,
  visualizedBy: string,
  path: string,
  duration: number,
  onSubmit: (e) => void
}) {

  const methods = useForm()

  return (
    <ModalContainer>
      <FormProvider {...methods}>

        <ModalTitle title={'Edit Website!!'}/>

        <form onSubmit={methods.handleSubmit(props.onSubmit)}>

          <MyLabel>Video Title</MyLabel>
          <MyInput
            placeholder={props.title}
            defaultValue={props.title}
            inputName={"title"}
          />

          <MyLabel>Visualized by</MyLabel>
          <MyInput
            placeholder={props.visualizedBy}
            defaultValue={props.visualizedBy}
            inputName={"visualizedBy"}
          />

          <MyLabel>URL</MyLabel>
          <MyInput
            type={"url"}
            placeholder={props.path}
            defaultValue={props.path}
            maxLength={1000}
            inputName={"path"}
          />

          <MyLabel>Duration(second)</MyLabel>
          <MyNumberInput
            type={"number"}
            defaultValue={props.duration}
            inputName={"duration"}
          />

          <SubmitButton isValid={methods.formState.isValid}/>
          <CancelButton></CancelButton>
        </form>
      </FormProvider>
    </ModalContainer>
  )
}

