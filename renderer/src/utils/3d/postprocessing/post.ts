import { Camera } from '@react-three/fiber'
import { Scene, WebGLRenderer } from 'three'
import { EffectComposer, GlitchPass, RenderPass } from 'three-stdlib'

import { BloomPass } from './bloomPass'
import Base from '@/components/common/instances'

class Post {
  scene: Scene
  camera: Camera
  renderer: WebGLRenderer
  bloomPass: BloomPass

  composer: EffectComposer
  renderPass: RenderPass
  glitchPass: GlitchPass
  params: Object

  constructor(renderer: WebGLRenderer, scene: Scene, camera: Camera, params?) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera

    this.renderPass = new RenderPass(scene, camera)
    this.bloomPass = new BloomPass(3, 5)

    this.composer = new EffectComposer(renderer)
    this.composer.addPass(this.renderPass)
    // this.composer.addPass(this.bloomPass)
  }

  setSize(w, h) {
    this.bloomPass.setSize(w, h)
  }

  render(scene, camera) {
    this.renderer.render(scene, camera)
  }
}

export { Post }
