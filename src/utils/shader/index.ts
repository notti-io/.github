import colorConvert from './colorConvert.glsl?raw'
import blending from './blending.glsl?raw'
import curlNoise from './curlNoise.glsl?raw'
import easing from './easing.glsl?raw'
import range from './range.glsl?raw'
import rotateUv from './rotateUv.glsl?raw'

const shaderUtils: Record<string, string> = { colorConvert, blending, curlNoise, easing, range, rotateUv }

export default shaderUtils
