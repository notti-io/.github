uniform sampler2D tPressure;
uniform sampler2D tDivergence;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;

vec2 boundary(vec2 uv) {
  return uv;
  // uncomment if you use wrap or repeat texture mode
  // uv = min(max(uv, 0.0), 1.0);
  // return uv;
}

void main() {
  float L = texture2D(tPressure, boundary(vL)).x;
  float R = texture2D(tPressure, boundary(vR)).x;
  float T = texture2D(tPressure, boundary(vT)).x;
  float B = texture2D(tPressure, boundary(vB)).x;
  float C = texture2D(tPressure, vUv).x;
  float divergence = texture2D(tDivergence, vUv).x;
  float pressure = (L + R + B + T - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}