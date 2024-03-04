vec2 scaleUv(vec2 uv, vec2 scale, vec2 origin) {
  vec3 u = vec3(uv, 1.0);
  mat3 mo1 = mat3(1, 0, -origin.x, 0, 1, -origin.y, 0, 0, 1);
  mat3 mo2 = mat3(1, 0, origin.x, 0, 1, origin.y, 0, 0, 1);
  mat3 ms = mat3(1.0 / scale.x, 0, 0, 0, 1.0 / scale.y, 0, 0, 0, 1);
  u = u * mo1;
  u = u * ms;
  u = u * mo2;
  return u.xy;
}
vec2 scaleUv(vec2 uv, vec2 scale) {
  return scaleUv(uv, scale, vec2(0.5));
}