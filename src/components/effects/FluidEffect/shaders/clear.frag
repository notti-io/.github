uniform sampler2D tTexture;
uniform float uValue;

varying vec2 vUv;

void main() {
  gl_FragColor = uValue * texture2D(tTexture, vUv);
}