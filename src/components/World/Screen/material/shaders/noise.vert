uniform float uSpeed;
uniform float uLineWidth;
uniform float uWobble;
uniform float uWobbleTimeScale;
uniform vec3 uSecondaryColor;

varying vec3 vPosition;

#import{perlinNoise};

void main() {
  vPosition = position;
  vec3 normalized = normalize(normalMatrix * normal);
  float noiseValue = uWobble * pow(noise(normalized + time * uWobbleTimeScale), 2.0);
  vec3 newPosition = position + normal * noiseValue;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}