uniform sampler2D tOrigin;
uniform sampler2D tInput;
uniform sampler2D tRandom;
uniform float uSize;
uniform float uCount;
uniform vec3 uForceDir;
uniform float uForceScale;
uniform float uCurlNoiseScale;
uniform float uCurlTimeScale;
uniform float uCurlNoiseStrength;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}