uniform sampler2D tTexture;

varying vec2 vUv;

void main() {
  vec3 C = texture2D(tTexture, vUv).rgb;
  float a = max(C.r, max(C.g, C.b));
  gl_FragColor = vec4(C, a);
}