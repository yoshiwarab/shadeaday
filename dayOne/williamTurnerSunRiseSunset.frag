#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.646,0.814,0.912);
vec3 colorB = vec3(1.000,0.367,0.262);
vec3 colorC = vec3(0.912,0.853,0.305);

float step1 = u_resolution.y * .25;
float step2 = u_resolution.y * .45;
float step3 = u_resolution.y * .3;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.x) - 
          smoothstep( pct, pct+0.01, st.x);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    //192, 11, 18

    vec3 pct = vec3(st.y);
    
    // 0.5 to 1.0 specifies the top half of the screen
    // pct.r = smoothstep(0.0,0.3, st.y);
    // pct.g = sin(st.y*PI);
    // pct.b = pow(st.y,0.5);

    //pct is 
    color = mix(colorA, colorB, smoothstep(0.0, 0.4, st.y));
    color = mix(color, colorB, smoothstep(0.4, 0.9, st.y));
    color = mix(color, colorC, smoothstep(0.5 - abs(sin(u_time)/3.), 0.9, st.y));
    color = mix(color, vec3(0.0,0.0,0.0), sin(u_time)/2.);


    // Plot transition lines for each channel
    // color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    // color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    // color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    gl_FragColor = vec4(color,1.0);
}