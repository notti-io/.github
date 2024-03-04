float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold - afwidth, threshold + afwidth, value);
  #else
    return step(threshold, value);
  #endif
}
float line(vec2 uv, float width) {
  float uvColor = 0.0;
  if (uv.x < 0.01) uvColor = 0.0;
  else if (uv.x > 1.0 - 0.01) uvColor = 0.0;
  else uvColor = aastep(width, uv.x) - aastep(1.0 - width, uv.x);
  return uvColor;
}