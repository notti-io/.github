import { DataTexture, FloatType, HalfFloatType, NearestFilter, RGBAFormat, WebGLRenderTarget } from 'three'
import type { PerspectiveCamera } from 'three'

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

export function calculateScreenSize(camera: PerspectiveCamera, cameraDistance: number, desktopRatio = 0.6, mobileRatio = 0.84) {
  const fovY = cameraDistance * Math.tan((camera.fov * Math.PI) / 180 / 2) * 2
  let width = fovY * camera.aspect
  let height = fovY
  let ratio = desktopRatio
  if (width < height) ratio = mobileRatio
  width *= ratio
  height *= ratio
  return { width, height }
}

export function hslToHex(hue: number, saturation: number, lightness: number) {
  const l = lightness / 100
  const a = (saturation * Math.min(l, 1 - l)) / 100
  const f = (n: number) => {
    const k = (n + hue / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
