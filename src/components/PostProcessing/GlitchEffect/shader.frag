uniform sampler2D tMap;
uniform sampler2D tFluid;
uniform sampler2D tFluidMask;
uniform float uProgress;
uniform float uScale;
uniform float uDistort;

#import{scaleUv};
#import{curlNoise};
#import{blending};

void mainUv(inout vec2 uv) {
  uv = scaleUv(uv, vec2(1.0 - uProgress * 0.1, 1.0), vec2(1.0, 0.5));
  float fluidMask = texture2D(tFluidMask, vUv).r * smoothstep(0.5, 1.0, uProgress);
  vec2 fluid = texture2D(tFluid, vUv).xy * fluidMask;
  uv += fluid * 0.005 * uProgress;
  vec2 distUv = mix(uv, vUv, uProgress);
  float glitch = texture2D(tMap, distUv * uScale).r;
  float wobble = 0.1 + CNnoise(vec3(vUv * 0.2, time * 0.05)) * 0.08;
  uv.x += glitch * uDistort * wobble * uProgress;
  uv.y += glitch * uDistort * wobble * uProgress * 0.2;
  uv += fluid * 0.007 * uProgress;
  uv = fract(uv);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 color = inputColor.rgb;
  color = mix(color, blendSubtract(accentColor, color), uProgress);
  color = mix(color, color * 0.3, uProgress);
  color = mix(color, vec3(0.24), 0.4 * uProgress);
  color = mix(color, blendOverlay(color, accentColor), uProgress * 0.3);

  outputColor = vec4(color + vec3(-0.1) * uProgress, inputColor.a);
}