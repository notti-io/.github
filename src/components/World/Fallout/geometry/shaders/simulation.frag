uniform sampler2D tOrigin;
uniform sampler2D tInput;
uniform sampler2D tRandom;
uniform float uSize;
uniform float uCount;
uniform vec3 uForceDir;
uniform float uForceScale;
uniform float uCurlNoiseScale;
uniform float uCurlTimeScale;
uniform float uCurlNoiseStrength;

#import{range};
#import{curlNoise};

void main() {
  float index = gl_FragCoord.x + gl_FragCoord.y * uSize;
  if (index > uCount) {
    gl_FragColor = vec4(9999.0);
    return;
  }

  vec2 uv = gl_FragCoord.xy / uSize;
  vec4 originData = texture2D(tOrigin, uv);
  vec4 inputData = texture2D(tInput, uv);
  vec3 pos = inputData.xyz;
  float data = inputData.w;
  float random = texture2D(tRandom, uv).y;

  vec3 force = normalize(uForceDir) * uForceScale * 0.1;
  pos += force;
  vec3 curl = curlNoise(pos * uCurlNoiseScale * 0.1 + (time * uCurlTimeScale * 0.1));
  pos += curl * uCurlNoiseStrength * 0.01;
  if (pos.x > 1.0) pos.x = originData.x;
  if (pos.x < -1.0) pos.x = originData.x;
  if (pos.y > 1.0) pos.y = originData.y;
  if (pos.y < -1.0) pos.y = originData.y;
  if (pos.z > 1.0) pos.z = originData.z;
  if (pos.z < -1.0) pos.z = originData.z;
  pos.x += random * 0.0001;
  pos.y += random * 0.0001;

  gl_FragColor = vec4(pos, data);
}