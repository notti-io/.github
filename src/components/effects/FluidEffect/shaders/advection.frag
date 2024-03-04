uniform sampler2D tVelocity;
uniform sampler2D tSource;
uniform vec2 uTexelSize;
uniform float uDt;
uniform float uDissipation;

varying vec2 vUv;

void main() {
  vec2 coord = vUv - uDt * texture2D(tVelocity, vUv).xy * uTexelSize;
  gl_FragColor = uDissipation * texture2D(tSource, coord);
  gl_FragColor.a = 1.0;
}