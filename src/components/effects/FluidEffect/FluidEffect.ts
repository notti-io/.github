import { extend } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import { BlendFunction } from 'postprocessing'
import type { WebGLRenderer } from 'three'
import { Uniform } from 'three'
import Effect from '@/api/Effect'
import Pointer from '@/api/Pointer'
import FluidSimulation from './FluidSimulation'
import FluidMouse from './FluidMouse'
import shaders from './shaders'

class FluidEffect extends Effect {
  public static readonly DEFAULT_PROGRESS = 1
  public static readonly DEFAULT_BLEND_FUNCTION = BlendFunction.NORMAL

  private simulation: FluidSimulation
  private mouse: FluidMouse

  constructor(pointer: Pointer, blendFunction = FluidEffect.DEFAULT_BLEND_FUNCTION) {
    super({
      name: 'Fluid',
      fragmentShader: shaders.frag,
      blendFunction: blendFunction,
      uniforms: new Map<string, Uniform>([
        ['tFluid', new Uniform(null)],
        ['tFluidMask', new Uniform(null)],
        ['uProgress', new Uniform(FluidEffect.DEFAULT_PROGRESS)],
      ]),
    })
    this.simulation = new FluidSimulation(this.resolution)
    this.uniforms.get('tFluid')!.value = this.tFluid
    this.uniforms.get('tFluidMask')!.value = this.tFluidMask
    this.mouse = new FluidMouse(pointer)
  }

  get tFluid() {
    return this.simulation.fluid
  }
  get tFluidMask() {
    return this.simulation.fluidMask
  }

  get progress() {
    return this.uniforms.get('uProgress')!.value
  }
  set progress(v: number) {
    this.uniforms.get('uProgress')!.value = v
  }

  get densityDissipation() {
    return this.simulation.densityDissipation
  }
  set densityDissipation(v: number) {
    this.simulation.densityDissipation = v
  }

  get velocityDissipation() {
    return this.simulation.velocityDissipation
  }
  set velocityDissipation(v: number) {
    this.simulation.velocityDissipation = v
  }

  get pressureDissipation() {
    return this.simulation.pressureDissipation
  }
  set pressureDissipation(v: number) {
    this.simulation.pressureDissipation = v
  }

  get pressureIterations() {
    return this.simulation.pressureIterations
  }
  set pressureIterations(v: number) {
    this.simulation.pressureIterations = v
  }

  get curl() {
    return this.simulation.curl
  }
  set curl(v: number) {
    this.simulation.curl = v
  }

  get dt() {
    return this.simulation.dt
  }
  set dt(v: number) {
    this.simulation.dt = v
  }

  get splatRadius() {
    return this.simulation.splatRadius
  }
  set splatRadius(v: number) {
    this.simulation.splatRadius = v
  }

  get scaleBasedOnVelocity() {
    return this.mouse.scaleBasedOnVelocity
  }
  set scaleBasedOnVelocity(v: boolean) {
    this.mouse.scaleBasedOnVelocity = v
  }

  get scale() {
    return this.mouse.scale
  }
  set scale(v: number) {
    this.mouse.scale = v
  }

  get isAdditive() {
    return this.simulation.isAdditive
  }
  set isAdditive(v: boolean) {
    this.simulation.isAdditive = v
  }

  update(gl: WebGLRenderer) {
    this.simulation.frame(gl)
    const args = this.mouse.frame()
    if (args) {
      this.simulation.drawMouse(gl, args)
    }
  }
}

extend({ FluidEffect })

declare module '@react-three/fiber' {
  interface ThreeElements {
    fluidEffect: Object3DNode<FluidEffect, typeof FluidEffect>
  }
}

export default FluidEffect
