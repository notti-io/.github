uniform sampler2D tMap;
uniform sampler2D tPos;
uniform float uSize;
uniform vec3 uColor;
uniform float uAlpha;
uniform float uRotation;

attribute vec4 random;

varying float vAlpha;

#import{range};

void main() {
  vec3 pos = texture2D(tPos, position.xy).xyz;
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vec3 worldPos = vec3(modelMatrix * vec4(pos, 1.0));
  vAlpha = random.w;
  vAlpha *= crange(pos.z, 0.8, 1.0, 1.0, 0.0);
  vAlpha *= crange(pos.z, 0.0, 0.2, 0.0, 1.0);
  vAlpha *= crange(length(worldPos - cameraPosition), 0.5, 2.0, 0.0, 1.0);
  gl_PointSize = 0.02 * DPR * crange(random.z, 0.0, 1.0, 0.5, 1.5) * uSize * (1000.0 / length(mvPosition.xyz));
  gl_Position = projectionMatrix * mvPosition;
}