import { DataTexture, FloatType, HalfFloatType, NearestFilter, RGBAFormat, WebGLRenderTarget } from 'three'

export function noop() {}

export function mediaQuery(query: string) {
  if (!window) return false
  return window.matchMedia(query).matches
}

export function classNames(args: (string | undefined | null | boolean)[]) {
  return args.filter(Boolean).join(' ')
}

export function isValidHex(hex: string) {
  return /^#(([0-9A-F]{2}){3,4}|[0-9A-F]{3})$/i.test(hex)
}

export function round(num: number, precision = 0) {
  const pow = Math.pow(10, precision)
  return Math.round(num * pow) / pow
}

export function random(min = 0, max = 1, precision = 0) {
  if (min === max) return min
  if (precision === 0) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }
  return round(min + Math.random() * (max - min), precision)
}

export function createDataTexture(array: Float32Array, size: number) {
  const texture = new DataTexture(array, size, size, RGBAFormat, FloatType)
  texture.needsUpdate = true
  texture.magFilter = NearestFilter
  texture.minFilter = NearestFilter
  return texture
}

export function isMobile() {
  const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  return regex.test(navigator.userAgent)
}

export function getFloatType() {
  return isMobile() ? HalfFloatType : FloatType
}

export function createRenderTarget(size: number) {
  return new WebGLRenderTarget(size, size, {
    magFilter: NearestFilter,
    minFilter: NearestFilter,
    format: RGBAFormat,
    type: getFloatType(),
  })
}
