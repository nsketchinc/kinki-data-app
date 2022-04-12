import styled from '@emotion/styled'
import {useFormContext} from "react-hook-form";
import React from "react";

export const MyNumberInput = (
  {
    inputName,
    placeholder = "10",
    required = true,
    type = "text",
    defaultValue = 10,
    maxLength = 6
  }:
    {
      inputName: string,
      placeholder?: string,
      required?: boolean,
      type?: string,
      defaultValue?: number,
      maxLength?: number
    }) => {

  const {register, formState: {errors}, setError, trigger} = useFormContext();


  return (
    <>
      <InputWrapper
        type={type}
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...register(inputName, {
          required: required,
          maxLength: maxLength,
          onChange: (e) => {
            trigger(inputName)
            console.log(errors[inputName])
          },
        })}
        data-tip
        data-for={inputName}
      />
      {errors[inputName] && <span className="text-danger">validation error</span>}
    </>
  )
};

export default MyNumberInput;

const InputWrapper = styled.input`

  border-radius: 3px;
  background: #fff;
  border: 1px solid #ccc;
  height: 30px;
  width: 100%;
  padding: 4px;

  margin-top: 8px;

`
