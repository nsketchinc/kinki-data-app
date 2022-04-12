import CameraManager from '@/components/Camera/CameraManager'
import Base from '@/components/common/instances'
import Controller from '@/Controller/Controller'
import {Canvas, useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef} from 'react'
import {PerspectiveCamera, sRGBEncoding, Vector3} from 'three'
import styled from "@emotion/styled";
import NodeModal from "@/components/Modal";
import * as THREE from "three";

const R3F = () => {
  const {gl, scene, camera} = useThree()
  const controllerRef = useRef<Controller>(null)

  useEffect(() => init(), [])
  useFrame(() => update(), 1)

  const init = () => {
    Base.setScene(scene)
    Base.getScene().background = new THREE.Color(0x051f28) // black
    Base.setCamera(camera as PerspectiveCamera)
    Base.setRenderer(gl)
    Base.getRenderer().autoClear = false
    Base.getRenderer().setClearColor(0xf0f0f0)

    CameraManager.setCamera(Base.getCamera())
    CameraManager.jump(new Vector3(0, 5.0, 0.0))

    new Audio("/sounds/Reload.wav").play()

    controllerRef.current = new Controller()
  }

  const update = () => {
    CameraManager.update()
    Base.getRenderer().render(Base.getScene(), Base.getCamera())
  }

  return <></>
}

const Page = () => {

  return (
    <>
      <Wrapper>
        {/*<BaseModal/>*/}
        {/*<EditModal/>*/}
        {/*<WebsiteAddModal/>*/}
        {/*<CategoryAddModal/>*/}
        {/*<VideoAddModal/>*/}
        <NodeModal/>
      </Wrapper>
      <Canvas
        mode='concurrent'
        gl={{antialias: true, alpha: true, outputEncoding: sRGBEncoding}}
      >
        {/* @ts-ignore */}
        <R3F r3f/>
      </Canvas>

    </>
  )
}

export default Page


const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
`
