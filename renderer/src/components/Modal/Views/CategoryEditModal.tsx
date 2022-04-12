import React from 'react'
import {FormProvider, useForm} from "react-hook-form";
import ModalTitle from "@/components/Modal/ui/ModalTitle";
import MyInput from "@/components/Modal/form/MyInput";
import MyLabel from "@/components/Modal/form/MyLabel";
import CancelButton from "@/components/Modal/form/CancelButton";
import SubmitButton from "@/components/Modal/form/SubmitButton";
import ModalContainer from "@/components/Modal/ModalContainer";

export default function CategoryEditModal(props:{
  title:string,
  onSubmit: (e) => void
}) {

  const methods = useForm();

  return (
    <ModalContainer>
      <FormProvider {...methods}>

        <ModalTitle title={'Edit Category'}/>
        <form onSubmit={methods.handleSubmit(props.onSubmit)}>

          <MyLabel>Category Name</MyLabel>
          <MyInput
            placeholder={props.title}
            defaultValue={props.title}
            inputName={"title"}
            maxLength={34}
          />

          <SubmitButton isValid={methods.formState.isValid}/>
          <CancelButton></CancelButton>
        </form>
      </FormProvider>
    </ModalContainer>
  )
}

