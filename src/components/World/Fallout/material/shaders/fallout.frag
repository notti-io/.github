uniform sampler2D tMap;
uniform sampler2D tPos;
uniform float uSize;
uniform float uAlpha;
uniform float uRotation;

varying float vAlpha;

#import{rotateUv};

void main() {
  vec2 uv = rotateUv(gl_PointCoord.xy, uRotation);
  float mask = texture2D(tMap, uv).r;
  float alpha = uAlpha * vAlpha * mask;
  gl_FragColor = vec4(accentColor, alpha);
}