import advection from './advection.frag?raw'
import base from './base.vert?raw'
import clear from './clear.frag?raw'
import curl from './curl.frag?raw'
import display from './display.frag?raw'
import divergence from './divergence.frag?raw'
import frag from './fluid.frag?raw'
import gradientSubtract from './gradientSubtract.frag?raw'
import pressure from './pressure.frag?raw'
import splat from './splat.frag?raw'
import vorticity from './vorticity.frag?raw'

const shaders = {
  advection,
  base,
  clear,
  curl,
  display,
  divergence,
  frag,
  gradientSubtract,
  pressure,
  splat,
  vorticity,
}

export default shaders
