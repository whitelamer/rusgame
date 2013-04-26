//custom shaders
var custom = {
    ShaderChunk: {

        terrainBlend_pars_fragment: [
        "uniform sampler2D texture_dirt;",
        "uniform sampler2D texture_grass;",
        "uniform sampler2D texture_rock;",
        "uniform sampler2D texture_shadow;",
        "uniform float heightFactor;",
        "uniform float tileFactor;",
        "uniform float ring_width;",
        "uniform vec4 ring_color;",
        "uniform vec3 ring_center;",
        "uniform float ring_radius;",
//        "varying vec3 vPosition;",

        ].join("\n"),

        terrainBlend_fragment: [
        "// Texture loading",
        "vec4 dirt = texture2D( texture_dirt, vUv * tileFactor );",
        "vec4 grass = texture2D( texture_grass, vUv * tileFactor );",
        "vec4 rock = texture2D( texture_rock, vUv * tileFactor );",
        "vec4 shadow = texture2D( texture_shadow, vUv );",
        "vec4 sand = vec4(.8, .8, .7, 1.0);",
        "vec4 snow = vec4(.8, .9, 1.0, 1.0);",
        "vec4 color = dirt; //default texture",

        "//add sand",
        "color = mix(sand, color, min(abs(2.0*heightFactor - mvPosition.z) / 4.0/heightFactor, 1.0));",
        "//starts at 5.0 for 5.0 units in both directions",
        "//add dirt",
        "color = mix(dirt, color, min(abs(10.0*heightFactor - mvPosition.z) / 5.0/heightFactor, 1.0));",
        "//add grass",
        "color = mix(grass, color, min(abs(10.0*heightFactor - mvPosition.z) / 5.0/heightFactor, 1.0));",
        "//add rock",
        "color = mix(rock, color, min(abs(20.0*heightFactor - mvPosition.z) / 10.0/heightFactor, 1.0));",
        "//add snow",
        "color = mix(snow, color, min(abs(25.0*heightFactor - mvPosition.z) / 5.0/heightFactor, 1.0));",

        "color = color * shadow;",
        "gl_FragColor = color;",
        "float distance = sqrt((mvPosition.x - ring_center.x) * (mvPosition.x - ring_center.x) + (mvPosition.y - ring_center.y) * (mvPosition.y - ring_center.y));",
        "if (distance < ring_radius + ring_width / 2.0 && distance > ring_radius - ring_width / 2.0) {",
        "    gl_FragColor.r += ring_color.r;",
        "    gl_FragColor.b += ring_color.b;",
        "    gl_FragColor.g += ring_color.g;",
        "    gl_FragColor.a += ring_color.a;",
        "    gl_FragColor = normalize(gl_FragColor);",
        "}",
        //"if (distance < 3.0) {",
        //"    float tiles = 1.0 / 150.0;",
        //"    float val = mod(vUv.y, tiles);",
        //"    if (mod(vUv.x, tiles) < .003 || mod(vUv.y, tiles) < .003) {",
        //"        gl_FragColor = gl_FragColor * (distance / 3.0);",
        //"        gl_FragColor.a = 1.0;",
        //"    }",
        //"}",
        ].join("\n")
    }
}



//shader concatenation for blended terrain
var terrainShader = {

    uniforms:THREE.UniformsUtils.merge( [

                                           THREE.UniformsLib[ "fog" ],
                                           THREE.UniformsLib[ "lights" ],
                                           THREE.UniformsLib[ "shadowmap" ],
                                           {
        texture_dirt: { type: "t", value: null },
        texture_grass: { type: "t", value: null },
        texture_rock: { type: "t", value: null },
        texture_shadow: { type: "t", value: null },
        heightFactor:  { type: "f", value: []},
        tileFactor: { type: "f", value: []},
        ring_width: { type: 'f', value: [] },
        ring_color: { type: 'v4', value: new THREE.Vector4(1.0, 0.0, 0.0, 1.0) },
        ring_center: { type: 'v3', value: new THREE.Vector3() },
        ring_radius: { type: 'f', value: [] },

        //] ),

        //common
//        diffuse : { type: "c", value: new THREE.Color( 0xeeeeee ) },
//        opacity : { type: "f", value: 1.0 },
//        map : { type: "t", value: 0, texture: null },
//        offsetRepeat : { type: "v4", value: new THREE.Vector4( 0, 0, 1, 1 ) },
//        lightMap : { type: "t", value: 2, texture: null },
//		specularMap : { type: "t", value: 3, texture: null },
//        envMap : { type: "t", value: 1, texture: null },
//        flipEnvMap : { type: "f", value: -1 },
//        useRefract : { type: "i", value: 0 },
//        reflectivity : { type: "f", value: 1.0 },
//        refractionRatio : { type: "f", value: 0.98 },
//        combine : { type: "i", value: 0 },
//        morphTargetInfluences : { type: "f", value: 0 },

//        //fog
//        fogDensity : { type: "f", value: 0.25 },
//        fogNear : { type: "f", value: 10 },
//        fogFar : { type: "f", value: 10000 },
//        fogColor : { type: "c", value: new THREE.Color( 0x6495ED ) },

        //lights
//        ambientLightColor : { type: "fv", value: [] },
//        directionalLightDirection : { type: "fv", value: [] },
//        directionalLightColor : { type: "fv", value: [] },
//        pointLightColor : { type: "fv", value: [] },
//        pointLightPosition : { type: "fv", value: [] },
//        pointLightDistance : { type: "fv1", value: [] },
//        spotLightColor : { type: "fv", value: [] },
//        spotLightPosition : { type: "fv", value: [] },
//        spotLightDirection : { type: "fv", value: [] },
//        spotLightDistance : { type: "fv1", value: [] },
//        spotLightAngle : { type: "fv1", value: [] },
//        spotLightExponent : { type: "fv1", value: [] },
//        spotLightAngleCos : { type: "fv1", value: [] },
//        hemisphereLightSkyColor : { type: "fv1", value: [] },
//        hemisphereLightGroundColor : { type: "fv1", value: [] },
//        hemisphereLightDirection : { type: "fv1", value: [] },
//        //THREE.UniformsLib.lights,
        //lambert shading
        ambient: { type: "c", value: new THREE.Color(328965) },
        wrapRGB: { type: "v3", value: new THREE.Vector3(1, 1, 1)},

//        //shadowmap
//        shadowMap: { type: "tv", value: 6, texture: [] },
//        shadowMapSize: { type: "v2v", value: [] },
//        shadowBias: { type: "fv1", value: [] },
//        shadowDarkness: { type: "fv1", value: [] },
//        shadowMatrix: { type: "m4v", value: [] }
            }
    ] ),



    vertexShader: [
        "varying vec2 vUv;",
        "varying vec3 mvPosition;",
        "varying vec3 vLightWeighting;",
		"varying vec3 vLightFront;",
		
//        THREE.ShaderChunk[ "lights_lambert_pars_vertex" ],
        THREE.ShaderChunk[ "shadowmap_pars_vertex" ],

        "void main(void) {",

            "vUv = uv;",
            "mvPosition = position;",
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

            //lambert light calculation
            "vec3 transformedNormal = normalize( normalMatrix * normal );",
			"vLightWeighting=vec3(1.0,1.0,1.0);",

//            THREE.ShaderChunk[ "lights_lambert_vertex" ],
            THREE.ShaderChunk[ "shadowmap_vertex" ],

            "gl_Position = projectionMatrix * mvPosition;",

        "}"
    ].join("\n"),



    fragmentShader: [
        "varying vec2 vUv;",
        "varying vec3 mvPosition;",
        "varying vec3 vLightWeighting;",
		"varying vec3 vLightFront;",
		
        custom.ShaderChunk[ "terrainBlend_pars_fragment" ],
        THREE.ShaderChunk[ "shadowmap_pars_fragment" ],
        //THREE.ShaderChunk[ "fog_pars_fragment" ],

        "void main() {",

            custom.ShaderChunk[ "terrainBlend_fragment" ],
            "gl_FragColor.xyz = gl_FragColor.xyz * vLightWeighting;", //lambert light calculation
            THREE.ShaderChunk[ "shadowmap_fragment" ],
            //THREE.ShaderChunk[ "fog_fragment" ],

        "}"
    ].join("\n")
};


/*
<script id="water-vs" type="x-shader/x-vertex">
precision mediump float;

const float pi = 3.14159;

uniform mat4 projection;
uniform mat4 view;
uniform float waterHeight;
uniform float time;

uniform bool enable[8];
uniform float amplitude[8];
uniform float wavelength[8];
uniform float direction[8];
uniform float speed[8];

attribute vec2 position;

varying vec3 vPos;

float wave(int i) {
  float frequency = 2.0*pi/wavelength[i];
  float phase = speed[i] * frequency;
  float d = direction[i] * pi/180.0;
  vec2 dir = vec2(cos(d), sin(d));
  float theta = dot(dir, position);
  return amplitude[i] * sin(theta * frequency + time * phase);
}

float bigWaveHeight() {
  float height = 0.0;
  for (int i = 0; i < 4; i++) {
    if (enable[i])
      height += wave(i);
  }
  return height;
}

void main(void) {
  float height = waterHeight + bigWaveHeight();
  vPos = vec3(position, height);
  gl_Position = projection * view * vec4(position, height, 1.0);
}
</script>

<script id="water-fs" type="x-shader/x-fragment">
precision mediump float;

const float pi = 3.14159;

uniform vec3 lightDirection;
uniform vec3 cameraPos;
uniform float time;

uniform bool enable[8];
uniform float amplitude[8];
uniform float wavelength[8];
uniform float direction[8];
uniform float speed[8];

uniform sampler2D clouds;

varying vec3 vPos;

vec3 waveNormal() {
  float dx = 0.0;
  float dy = 0.0;
  for (int i = 0; i < 8; i++) {
    if (enable[i]) {
      float frequency = 2.0*pi/wavelength[i];
      float phase = speed[i] * frequency;
      float d = direction[i] * pi/180.0;
      vec2 dir = vec2(cos(d), sin(d));
      float theta = dot(dir, vPos.xy);
      float angle = theta * frequency + time * phase;

      dx += amplitude[i] * dir.y * frequency * cos(angle);
      dy += amplitude[i] * dir.x * frequency * cos(angle);
    }
  }
  vec3 n = vec3(-dx, -dy, 1.0);
  return normalize(n);
}

void main(void) {
  vec3 normal = waveNormal();
  vec3 eye = normalize(cameraPos - vPos);

  vec3 reflection = reflect(eye, normal);
  vec2 texPoint = reflection.xy / reflection.z;
  vec2 texCoord = texPoint * 0.5 + 0.5;
  vec3 skyColor = texture2D(clouds, texCoord).rgb;

  float cosi = dot(eye, normal);
  float sini = 1.0 - cosi;
  float R = 0.1 + 0.7 * sini;

  gl_FragColor = vec4(skyColor, R);
}
</script>
  */

