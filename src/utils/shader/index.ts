import colorConvert from './colorConvert.glsl?raw'
import blending from './blending.glsl?raw'
import curlNoise from './curlNoise.glsl?raw'
import easing from './easing.glsl?raw'
import getAccentColor from './getAccentColor.glsl?raw'
import line from './line.glsl?raw'
import perlinNoise from './perlinNoise.glsl?raw'
import range from './range.glsl?raw'
import rotateUv from './rotateUv.glsl?raw'
import scaleUv from './scaleUv.glsl?raw'

const shaderUtils: Record<string, string> = {
  colorConvert,
  blending,
  curlNoise,
  easing,
  getAccentColor,
  line,
  perlinNoise,
  range,
  rotateUv,
  scaleUv,
}

export default shaderUtils
