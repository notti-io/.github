float CNrange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
  float oldRange = oldMax - oldMin;
  float newRange = newMax - newMin;
  return (((oldValue - oldMin) * newRange) / oldRange) + newMin;
}
float CNnoise(vec3 v) {
  float t = v.z * 0.3;
  v.y *= 0.8;
  float noise = 0.0;
  float s = 0.5;
  noise += CNrange(
    sin(v.x * 0.9 / s + t * 10.0)
    + sin(v.x * 2.4 / s + t * 15.0)
    + sin(v.x * -3.5 / s + t * 4.0)
    + sin(v.x * -2.5 / s + t * 7.1),
    -1.0,
    1.0,
    -0.3,
    0.3
  );
  noise += CNrange(
    sin(v.y * -0.3 / s + t * 18.0)
    + sin(v.y * 1.6 / s + t * 18.0)
    + sin(v.y * 2.6 / s + t * 8.0)
    + sin(v.y * -2.6 / s + t * 4.5),
    -1.0,
    1.0,
    -0.3,
    0.3
  );
  return noise;
}
vec3 snoiseVec3(vec3 x) {
  float s = CNnoise(vec3(x));
  float s1 = CNnoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2));
  float s2 = CNnoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4));
  vec3 c = vec3(s, s1, s2);
  return c;
}
vec3 curlNoise(vec3 p) {
  const float e = 1e-1;
  vec3 dx = vec3(e, 0.0, 0.0);
  vec3 dy = vec3(0.0, e, 0.0);
  vec3 dz = vec3(0.0, 0.0, e);
  vec3 p_x0 = snoiseVec3(p - dx);
  vec3 p_x1 = snoiseVec3(p + dx);
  vec3 p_y0 = snoiseVec3(p - dy);
  vec3 p_y1 = snoiseVec3(p + dy);
  vec3 p_z0 = snoiseVec3(p - dz);
  vec3 p_z1 = snoiseVec3(p + dz);
  float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
  float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
  float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
  const float divisor = 1.0 / (2.0 * e);
  return normalize(vec3(x, y, z) * divisor);
}
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
  return mod289(((x * 34.0) + 1.0) * x);
}
float noise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1;
  // i1.x = step(x0.y, x0.x); // x0.x > x0.y ? 1.0 : 0.0
  // i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx;
  // x1 = x0 - i1 + 1.0 * C.xx;
  // x2 = x0 - 1.0 + 2.0 * C.xx;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x
    + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
vec3 curl(float x, float y, float z) {
  float eps = 1.0, eps2 = 2.0 * eps;
  float n1, n2, a, b;

  x += time * 0.05;
  y += time * 0.05;
  z += time * 0.05;

  vec3 curl = vec3(0.0);

  n1 = noise(vec2(x, y + eps));
  n2 = noise(vec2(x, y - eps));
  a = (n1 - n2) / eps2;

  n1 = noise(vec2(x, z + eps));
  n2 = noise(vec2(x, z - eps));
  b = (n1 - n2) / eps2;

  curl.x = a - b;

  n1 = noise(vec2(y, z + eps));
  n2 = noise(vec2(y, z - eps));
  a = (n1 - n2) / eps2;

  n1 = noise(vec2(x + eps, z));
  n2 = noise(vec2(x + eps, z));
  b = (n1 - n2) / eps2;

  curl.y = a - b;

  n1 = noise(vec2(x + eps, y));
  n2 = noise(vec2(x - eps, y));
  a = (n1 - n2) / eps2;

  n1 = noise(vec2(y + eps, z));
  n2 = noise(vec2(y - eps, z));
  b = (n1 - n2) / eps2;

  curl.z = a - b;

  return curl;
}