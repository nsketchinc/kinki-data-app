import styled from '@emotion/styled'
import {useFormContext} from "react-hook-form";
import React, {useEffect} from "react";
import Icon from "@mdi/react";
import {mdiTrayArrowUp} from "@mdi/js";
import MyInput from "@/components/Modal/form/MyInput";


export const MyFileInput = (props: { inputName: string, placeholder?: string, defaultValue?: string }) => {

  const {register, formState: {errors}, watch, setValue} = useFormContext();


  const watchFields = watch([props.inputName + "file"]);

  useEffect(() => {
    console.log("111" , watchFields)
    // console.log("112", watchFields[0])
    // console.log("113", watchFields[0][0])
    if (watchFields.length > 0  && watchFields[0] != undefined && watchFields[0].length > 0 ){
      console.log(watchFields[0][0].path)
      setValue(props.inputName, watchFields[0][0].path)
    }
  }, [watchFields]);


  return (
    <InputWrapper>
      <MyInput inputName={props.inputName} defaultValue={props.defaultValue} maxLength={300} placeholder={props.placeholder}/>
      <label>
        <input
          className={"file-input"}
          type="file"
          name={props.inputName + "file"}
          {...register(props.inputName + "file", {
            required: false,
          })}
          data-tip
          data-for={props.inputName + "file"}
        />
        <Icon className={"Icon"} path={mdiTrayArrowUp}></Icon>
      </label>
      {errors[props.inputName] && <span className="text-danger">validation error</span>}

    </InputWrapper>
  )
};

export default MyFileInput;

const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  column-gap: 6px;

  .file-input {
    display: none;
  }

  .Icon {
    margin-top: 8px;
    cursor: pointer;

    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 6px;
    color: #666;
    background: #D5D5D5;
    border: 1px solid #ccc;
  }
`
