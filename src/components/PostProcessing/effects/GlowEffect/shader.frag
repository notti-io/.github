uniform vec3 uColor;
uniform float uPhone;

#import{range};
#import{colorConvert};
#import{blending};
#import{easing};

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec3 color = inputColor.rgb;
  float dist = length(uv - vec2(0.5));

  color = mix(color, blendMultiply(color, uColor), 0.1);
  color = mix(color, blendOverlay(color * 0.8 * mix(1.0, 0.8, uPhone), uColor), 0.5);
  color = mix(color, blendSoftLight(color, uColor), 0.35);
  color = mix(color, blendOverlay(color, uColor), sineIn(crange(dist, mix(0.3, 0.22, uPhone), 0.8, 0.0, mix(1.0, 1.0, uPhone))));

  color = rgbToHsv(color);
  color.x += crange(uv.x + uv.y, 0.0, 2.0, -0.05, 0.05);
  color.x += sineIn(crange(dist, 0.1, 0.8, 0.0, 0.25));
  color = hsvToRgb(color);

  vec3 gray = vec3(0.5, 0.5, 0.5);
  color = ((color - gray) * 1.04) + gray;

  outputColor = vec4(color, inputColor.a);
}