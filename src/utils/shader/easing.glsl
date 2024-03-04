float sineInOut(float t) {
  return -0.5 * (cos(3.141592653589793 * t) - 1.0);
}
float sineIn(float t) {
  return sin((t - 1.0) * 1.5707963267948966) + 1.0;
}
float sineOut(float t) {
  return sin(t * 1.5707963267948966);
}