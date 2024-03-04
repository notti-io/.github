uniform sampler2D tTarget;
uniform float uAspectRatio;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
uniform float uCanRender;
uniform float uAdd;

varying vec2 vUv;

float blendScreen(float base, float blend) {
  return 1.0 - ((1.0 - base) * (1.0 - blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
  return vec3(blendScreen(base.r, blend.r), blendScreen(base.g, blend.g), blendScreen(base.b, blend.b));
}

void main() {
  vec2 p = vUv - uPoint.xy;
  p.x *= uAspectRatio;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(tTarget, vUv).xyz;
  base *= uCanRender;

  vec3 outColor = mix(blendScreen(base, splat), base + splat, uAdd);
  gl_FragColor = vec4(outColor, 1.0);
}