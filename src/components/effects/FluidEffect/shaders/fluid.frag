uniform sampler2D tFluid;
uniform sampler2D tFluidMask;
uniform float uProgress;

#import{range};
#import{scaleUv};

void mainUv(inout vec2 uv) {
  float dist = length(uv - vec2(0.5));
  float scale = crange(dist, 0.2, 0.5, 1.0, 1.0 + 0.01);
  vec2 newUv = scaleUv(uv, vec2(scale));
  float fluidMask = smoothstep(0.1, 0.7, texture2D(tFluidMask, newUv).r);
  vec3 fluidPlusMask = vec3(texture2D(tFluid, newUv).xy * fluidMask, fluidMask);
  vec2 fluid = fluidPlusMask.xy;
  fluidMask = fluidPlusMask.z;
  newUv += fluid * 0.0001 * fluidMask * uProgress;

  uv = newUv;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  outputColor = inputColor;
}