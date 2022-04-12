import React from 'react'
import {FormProvider, useForm} from "react-hook-form";
import ModalContainer from "@/components/Modal/ModalContainer";
import MyLabel from "@/components/Modal/form/MyLabel";
import Spacer from "@/components/common/Spacer";
import styled from "@emotion/styled";

export default function SampleForm() {

  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const methods = useForm();

  console.log(methods.watch("example")); // watch input value by passing the name of it

  const onSubmit = data => {
    console.log("------ submit", data.category)
  }

  return (
    <ModalContainer>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <label>First Name</label>
          <div>
          {/*<input*/}
          {/*  {...methods.register("firstName", {*/}
          {/*    required: true,*/}
          {/*    maxLength: 20,*/}
          {/*    pattern: /^[A-Za-z]+$/i*/}
          {/*  })}*/}
          {/*/>*/}
          </div>

          <input
            // type="text"
            // name={"firstName"}
            // placeholder={"firstName"}
            {...methods.register("firstName", {
              required: false,
              maxLength: 20
            })}
            // name={props.name}
            // data-for={props.inputName}
            onChange={(e) => {
            }}
          />
          <MyLabel>Category Name</MyLabel>
          <Spacer size={'8px'}/>

          {/*<MyInput*/}
          {/*  placeholder="カテゴリー名"*/}
          {/*  inputName={"firstName"}*/}
          {/*/>*/}
          {methods.formState.errors?.firstName?.type === "required" && <p>This field is required</p>}
          {methods.formState.errors?.firstName?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {methods.formState.errors?.firstName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Laste Name</label>
          <input {...methods.register("lastName", {pattern: /^[A-Za-z]+$/i})} />
          {methods.formState.errors?.lastName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}
          <label>Age</label>a
          <input {...methods.register("age", {min: 18, max: 99})} />
          {methods.formState.errors.age && (
            <p>You Must be older then 18 and younger then 99 years old</p>
          )}
          <input type="submit"/>
        </form>
      </FormProvider>
    </ModalContainer>
  )
}


const InputWrapper = styled.input`

  border-radius: 3px;
  background: #fff;
  border: 1px solid #ccc;
  height: 30px;
  width: 100%;

`
