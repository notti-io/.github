uniform float uSpeed;
uniform float uLineWidth;
uniform float uWobble;
uniform float uWobbleTimeScale;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec3 vPosition;

#import{perlinNoise};
#import{line};

void main() {
  vec2 newUv = vPosition.xy;
  float noiseValue = noise(vec3(newUv + time * uSpeed + vPosition.z, 0.0));
  newUv += vec2(noiseValue);
  newUv = vec2(fract((newUv.x + newUv.y) * 5.0), newUv.y);
  float strength = line(newUv, (uLineWidth * audioFrequency) / 2.0);
  vec3 mixedColor = mix(uColor1, uColor2, strength);

  gl_FragColor = vec4(mixedColor, 1.0);
}