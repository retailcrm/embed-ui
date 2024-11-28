var ue=Object.defineProperty,o=(e,t)=>ue(e,"name",{value:t,configurable:!0});function h(){return h=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)({}).hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},h.apply(null,arguments)}o(h,"_extends");function Y(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}o(Y,"_assertThisInitialized");function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,a){return r.__proto__=a,r},v(e,t)}o(v,"_setPrototypeOf");function V(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,v(e,t)}o(V,"_inheritsLoose");function k(e){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(e)}o(k,"_getPrototypeOf");function K(e){try{return Function.toString.call(e).indexOf("[native code]")!==-1}catch{return typeof e=="function"}}o(K,"_isNativeFunction");function H(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(H=o(function(){return!!e},"_isNativeReflectConstruct"))()}o(H,"_isNativeReflectConstruct");function J(e,t,r){if(H())return Reflect.construct.apply(null,arguments);var a=[null];a.push.apply(a,t);var n=new(e.bind.apply(e,a));return r&&v(n,r.prototype),n}o(J,"_construct");function I(e){var t=typeof Map=="function"?new Map:void 0;return I=o(function(r){if(r===null||!K(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(t!==void 0){if(t.has(r))return t.get(r);t.set(r,a)}function a(){return J(r,arguments,k(this).constructor)}return o(a,"Wrapper"),a.prototype=Object.create(r.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),v(a,r)},"_wrapNativeSuper"),I(e)}o(I,"_wrapNativeSuper");var pe={1:`Passed invalid arguments to hsl, please pass multiple numbers e.g. hsl(360, 0.75, 0.4) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75 }).

`,2:`Passed invalid arguments to hsla, please pass multiple numbers e.g. hsla(360, 0.75, 0.4, 0.7) or an object e.g. rgb({ hue: 255, saturation: 0.4, lightness: 0.75, alpha: 0.7 }).

`,3:`Passed an incorrect argument to a color function, please pass a string representation of a color.

`,4:`Couldn't generate valid rgb string from %s, it returned %s.

`,5:`Couldn't parse the color string. Please provide the color as a string in hex, rgb, rgba, hsl or hsla notation.

`,6:`Passed invalid arguments to rgb, please pass multiple numbers e.g. rgb(255, 205, 100) or an object e.g. rgb({ red: 255, green: 205, blue: 100 }).

`,7:`Passed invalid arguments to rgba, please pass multiple numbers e.g. rgb(255, 205, 100, 0.75) or an object e.g. rgb({ red: 255, green: 205, blue: 100, alpha: 0.75 }).

`,8:`Passed invalid argument to toColorString, please pass a RgbColor, RgbaColor, HslColor or HslaColor object.

`,9:`Please provide a number of steps to the modularScale helper.

`,10:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,11:`Invalid value passed as base to modularScale, expected number or em string but got "%s"

`,12:`Expected a string ending in "px" or a number passed as the first argument to %s(), got "%s" instead.

`,13:`Expected a string ending in "px" or a number passed as the second argument to %s(), got "%s" instead.

`,14:`Passed invalid pixel value ("%s") to %s(), please pass a value like "12px" or 12.

`,15:`Passed invalid base value ("%s") to %s(), please pass a value like "12px" or 12.

`,16:`You must provide a template to this method.

`,17:`You passed an unsupported selector state to this method.

`,18:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,19:`fromSize and toSize must be provided as stringified numbers with the same units.

`,20:`expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,21:"expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.\n\n",22:"expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.\n\n",23:`fontFace expects a name of a font-family.

`,24:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,25:`fontFace expects localFonts to be an array.

`,26:`fontFace expects fileFormats to be an array.

`,27:`radialGradient requries at least 2 color-stops to properly render.

`,28:`Please supply a filename to retinaImage() as the first argument.

`,29:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,30:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",31:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation

`,32:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])
To pass a single animation please supply them in simple values, e.g. animation('rotate', '2s')

`,33:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation

`,34:`borderRadius expects a radius value as a string or number as the second argument.

`,35:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,36:`Property must be a string value.

`,37:`Syntax Error at %s.

`,38:`Formula contains a function that needs parentheses at %s.

`,39:`Formula is missing closing parenthesis at %s.

`,40:`Formula has too many closing parentheses at %s.

`,41:`All values in a formula must have the same unit or be unitless.

`,42:`Please provide a number of steps to the modularScale helper.

`,43:`Please pass a number or one of the predefined scales to the modularScale helper as the ratio.

`,44:`Invalid value passed as base to modularScale, expected number or em/rem string but got %s.

`,45:`Passed invalid argument to hslToColorString, please pass a HslColor or HslaColor object.

`,46:`Passed invalid argument to rgbToColorString, please pass a RgbColor or RgbaColor object.

`,47:`minScreen and maxScreen must be provided as stringified numbers with the same units.

`,48:`fromSize and toSize must be provided as stringified numbers with the same units.

`,49:`Expects either an array of objects or a single object with the properties prop, fromSize, and toSize.

`,50:`Expects the objects in the first argument array to have the properties prop, fromSize, and toSize.

`,51:`Expects the first argument object to have the properties prop, fromSize, and toSize.

`,52:`fontFace expects either the path to the font file(s) or a name of a local copy.

`,53:`fontFace expects localFonts to be an array.

`,54:`fontFace expects fileFormats to be an array.

`,55:`fontFace expects a name of a font-family.

`,56:`linearGradient requries at least 2 color-stops to properly render.

`,57:`radialGradient requries at least 2 color-stops to properly render.

`,58:`Please supply a filename to retinaImage() as the first argument.

`,59:`Passed invalid argument to triangle, please pass correct pointingDirection e.g. 'right'.

`,60:"Passed an invalid value to `height` or `width`. Please provide a pixel based unit.\n\n",61:`Property must be a string value.

`,62:`borderRadius expects a radius value as a string or number as the second argument.

`,63:`borderRadius expects one of "top", "bottom", "left" or "right" as the first argument.

`,64:`The animation shorthand only takes 8 arguments. See the specification for more information: http://mdn.io/animation.

`,65:`To pass multiple animations please supply them in arrays, e.g. animation(['rotate', '2s'], ['move', '1s'])\\nTo pass a single animation please supply them in simple values, e.g. animation('rotate', '2s').

`,66:`The animation shorthand arrays can only have 8 elements. See the specification for more information: http://mdn.io/animation.

`,67:`You must provide a template to this method.

`,68:`You passed an unsupported selector state to this method.

`,69:`Expected a string ending in "px" or a number passed as the first argument to %s(), got %s instead.

`,70:`Expected a string ending in "px" or a number passed as the second argument to %s(), got %s instead.

`,71:`Passed invalid pixel value %s to %s(), please pass a value like "12px" or 12.

`,72:`Passed invalid base value %s to %s(), please pass a value like "12px" or 12.

`,73:`Please provide a valid CSS variable.

`,74:`CSS variable not found and no default was provided.

`,75:`important requires a valid style object, got a %s instead.

`,76:`fromSize and toSize must be provided as stringified numbers with the same units as minScreen and maxScreen.

`,77:`remToPx expects a value in "rem" but you provided it in "%s".

`,78:`base must be set in "px" or "%" but you set it in "%s".
`};function Q(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=t[0],n=[],s;for(s=1;s<t.length;s+=1)n.push(t[s]);return n.forEach(function(l){a=a.replace(/%[a-z]/,l)}),a}o(Q,"format");var f=function(e){V(t,e);function t(r){for(var a,n=arguments.length,s=new Array(n>1?n-1:0),l=1;l<n;l++)s[l-1]=arguments[l];return a=e.call(this,Q.apply(void 0,[pe[r]].concat(s)))||this,Y(a)}return o(t,"PolishedError"),t}(I(Error));function C(e){return Math.round(e*255)}o(C,"colorToInt");function W(e,t,r){return C(e)+","+C(t)+","+C(r)}o(W,"convertToInt");function y(e,t,r,a){if(a===void 0&&(a=W),t===0)return a(r,r,r);var n=(e%360+360)%360/60,s=(1-Math.abs(2*r-1))*t,l=s*(1-Math.abs(n%2-1)),u=0,p=0,d=0;n>=0&&n<1?(u=s,p=l):n>=1&&n<2?(u=l,p=s):n>=2&&n<3?(p=s,d=l):n>=3&&n<4?(p=l,d=s):n>=4&&n<5?(u=l,d=s):n>=5&&n<6&&(u=s,d=l);var b=r-s/2,m=u+b,c=p+b,R=d+b;return a(m,c,R)}o(y,"hslToRgb");var U={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"};function X(e){if(typeof e!="string")return e;var t=e.toLowerCase();return U[t]?"#"+U[t]:e}o(X,"nameToHex");var de=/^#[a-fA-F0-9]{6}$/,fe=/^#[a-fA-F0-9]{8}$/,ce=/^#[a-fA-F0-9]{3}$/,ge=/^#[a-fA-F0-9]{4}$/,M=/^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i,be=/^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i,me=/^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i,he=/^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;function E(e){if(typeof e!="string")throw new f(3);var t=X(e);if(t.match(de))return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16)};if(t.match(fe)){var r=parseFloat((parseInt(""+t[7]+t[8],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[2],16),green:parseInt(""+t[3]+t[4],16),blue:parseInt(""+t[5]+t[6],16),alpha:r}}if(t.match(ce))return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16)};if(t.match(ge)){var a=parseFloat((parseInt(""+t[4]+t[4],16)/255).toFixed(2));return{red:parseInt(""+t[1]+t[1],16),green:parseInt(""+t[2]+t[2],16),blue:parseInt(""+t[3]+t[3],16),alpha:a}}var n=M.exec(t);if(n)return{red:parseInt(""+n[1],10),green:parseInt(""+n[2],10),blue:parseInt(""+n[3],10)};var s=be.exec(t.substring(0,50));if(s)return{red:parseInt(""+s[1],10),green:parseInt(""+s[2],10),blue:parseInt(""+s[3],10),alpha:parseFloat(""+s[4])>1?parseFloat(""+s[4])/100:parseFloat(""+s[4])};var l=me.exec(t);if(l){var u=parseInt(""+l[1],10),p=parseInt(""+l[2],10)/100,d=parseInt(""+l[3],10)/100,b="rgb("+y(u,p,d)+")",m=M.exec(b);if(!m)throw new f(4,t,b);return{red:parseInt(""+m[1],10),green:parseInt(""+m[2],10),blue:parseInt(""+m[3],10)}}var c=he.exec(t.substring(0,50));if(c){var R=parseInt(""+c[1],10),ie=parseInt(""+c[2],10)/100,le=parseInt(""+c[3],10)/100,N="rgb("+y(R,ie,le)+")",w=M.exec(N);if(!w)throw new f(4,t,N);return{red:parseInt(""+w[1],10),green:parseInt(""+w[2],10),blue:parseInt(""+w[3],10),alpha:parseFloat(""+c[4])>1?parseFloat(""+c[4])/100:parseFloat(""+c[4])}}throw new f(5)}o(E,"parseToRgb");function Z(e){var t=e.red/255,r=e.green/255,a=e.blue/255,n=Math.max(t,r,a),s=Math.min(t,r,a),l=(n+s)/2;if(n===s)return e.alpha!==void 0?{hue:0,saturation:0,lightness:l,alpha:e.alpha}:{hue:0,saturation:0,lightness:l};var u,p=n-s,d=l>.5?p/(2-n-s):p/(n+s);switch(n){case t:u=(r-a)/p+(r<a?6:0);break;case r:u=(a-t)/p+2;break;default:u=(t-r)/p+4;break}return u*=60,e.alpha!==void 0?{hue:u,saturation:d,lightness:l,alpha:e.alpha}:{hue:u,saturation:d,lightness:l}}o(Z,"rgbToHsl");function A(e){return Z(E(e))}o(A,"parseToHsl");var ve=o(function(e){return e.length===7&&e[1]===e[2]&&e[3]===e[4]&&e[5]===e[6]?"#"+e[1]+e[3]+e[5]:e},"reduceHexValue"),D=ve;function g(e){var t=e.toString(16);return t.length===1?"0"+t:t}o(g,"numberToHex");function S(e){return g(Math.round(e*255))}o(S,"colorToHex");function ee(e,t,r){return D("#"+S(e)+S(t)+S(r))}o(ee,"convertToHex");function F(e,t,r){return y(e,t,r,ee)}o(F,"hslToHex");function te(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return F(e,t,r);if(typeof e=="object"&&t===void 0&&r===void 0)return F(e.hue,e.saturation,e.lightness);throw new f(1)}o(te,"hsl");function re(e,t,r,a){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof a=="number")return a>=1?F(e,t,r):"rgba("+y(e,t,r)+","+a+")";if(typeof e=="object"&&t===void 0&&r===void 0&&a===void 0)return e.alpha>=1?F(e.hue,e.saturation,e.lightness):"rgba("+y(e.hue,e.saturation,e.lightness)+","+e.alpha+")";throw new f(2)}o(re,"hsla");function B(e,t,r){if(typeof e=="number"&&typeof t=="number"&&typeof r=="number")return D("#"+g(e)+g(t)+g(r));if(typeof e=="object"&&t===void 0&&r===void 0)return D("#"+g(e.red)+g(e.green)+g(e.blue));throw new f(6)}o(B,"rgb");function x(e,t,r,a){if(typeof e=="string"&&typeof t=="number"){var n=E(e);return"rgba("+n.red+","+n.green+","+n.blue+","+t+")"}else{if(typeof e=="number"&&typeof t=="number"&&typeof r=="number"&&typeof a=="number")return a>=1?B(e,t,r):"rgba("+e+","+t+","+r+","+a+")";if(typeof e=="object"&&t===void 0&&r===void 0&&a===void 0)return e.alpha>=1?B(e.red,e.green,e.blue):"rgba("+e.red+","+e.green+","+e.blue+","+e.alpha+")"}throw new f(7)}o(x,"rgba");var ye=o(function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},"isRgb"),Fe=o(function(e){return typeof e.red=="number"&&typeof e.green=="number"&&typeof e.blue=="number"&&typeof e.alpha=="number"},"isRgba"),xe=o(function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&(typeof e.alpha!="number"||typeof e.alpha>"u")},"isHsl"),we=o(function(e){return typeof e.hue=="number"&&typeof e.saturation=="number"&&typeof e.lightness=="number"&&typeof e.alpha=="number"},"isHsla");function $(e){if(typeof e!="object")throw new f(8);if(Fe(e))return x(e);if(ye(e))return B(e);if(we(e))return re(e);if(xe(e))return te(e);throw new f(8)}o($,"toColorString");function q(e,t,r){return o(function(){var a=r.concat(Array.prototype.slice.call(arguments));return a.length>=t?e.apply(this,a):q(e,t,a)},"fn")}o(q,"curried");function T(e){return q(e,e.length,[])}o(T,"curry");function j(e,t,r){return Math.max(e,Math.min(t,r))}o(j,"guard");function ae(e,t){if(t==="transparent")return t;var r=A(t);return $(h({},r,{lightness:j(0,1,r.lightness-parseFloat(e))}))}o(ae,"darken");var Ce=T(ae),Se=Ce;function oe(e,t){if(t==="transparent")return t;var r=A(t);return $(h({},r,{lightness:j(0,1,r.lightness+parseFloat(e))}))}o(oe,"lighten");var ke=T(oe),Ie=ke;function ne(e,t){if(t==="transparent")return t;var r=E(t),a=typeof r.alpha=="number"?r.alpha:1,n=h({},r,{alpha:j(0,1,+(a*100-parseFloat(e)*100).toFixed(2)/100)});return x(n)}o(ne,"transparentize");var Be=T(ne),Pe=Be,i={primary:"#FF4785",secondary:"#029CFD",tertiary:"#FAFBFC",ancillary:"#22a699",orange:"#FC521F",gold:"#FFAE00",green:"#66BF3C",seafoam:"#37D5D3",purple:"#6F2CAC",ultraviolet:"#2A0481",lightest:"#FFFFFF",lighter:"#F7FAFC",light:"#EEF3F6",mediumlight:"#ECF4F9",medium:"#D9E8F2",mediumdark:"#73828C",dark:"#5C6870",darker:"#454E54",darkest:"#2E3438",border:"hsla(203, 50%, 30%, 0.15)",positive:"#66BF3C",negative:"#FF4400",warning:"#E69D00",critical:"#FFFFFF",defaultText:"#2E3438",inverseText:"#FFFFFF",positiveText:"#448028",negativeText:"#D43900",warningText:"#A15C20"},L={app:"#F6F9FC",bar:i.lightest,content:i.lightest,preview:i.lightest,gridCellSize:10,hoverable:Pe(.9,i.secondary),positive:"#E1FFD4",negative:"#FEDED2",warning:"#FFF5CF",critical:"#FF4400"},P={fonts:{base:['"Nunito Sans"',"-apple-system",'".SFNSText-Regular"','"San Francisco"',"BlinkMacSystemFont",'"Segoe UI"','"Helvetica Neue"',"Helvetica","Arial","sans-serif"].join(", "),mono:["ui-monospace","Menlo","Monaco",'"Roboto Mono"','"Oxygen Mono"','"Ubuntu Monospace"','"Source Code Pro"','"Droid Sans Mono"','"Courier New"',"monospace"].join(", ")},weight:{regular:400,bold:700},size:{s1:12,s2:14,s3:16,m1:20,m2:24,m3:28,l1:32,l2:40,l3:48,code:90}},Ee={base:"dark",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:"#222425",appContentBg:"#1B1C1D",appPreviewBg:i.lightest,appBorderColor:"rgba(255,255,255,.1)",appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:"#C9CDCF",textInverseColor:"#222425",textMutedColor:"#798186",barTextColor:i.mediumdark,barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:"#292C2E",buttonBg:"#222425",buttonBorder:"rgba(255,255,255,.1)",booleanBg:"#222425",booleanSelectedBg:"#2E3438",inputBg:"#1B1C1D",inputBorder:"rgba(255,255,255,.1)",inputTextColor:i.lightest,inputBorderRadius:4},Te=Ee,je={base:"light",colorPrimary:"#FF4785",colorSecondary:"#029CFD",appBg:L.app,appContentBg:i.lightest,appPreviewBg:i.lightest,appBorderColor:i.border,appBorderRadius:4,fontBase:P.fonts.base,fontCode:P.fonts.mono,textColor:i.darkest,textInverseColor:i.lightest,textMutedColor:i.dark,barTextColor:i.mediumdark,barHoverColor:i.secondary,barSelectedColor:i.secondary,barBg:i.lightest,buttonBg:L.app,buttonBorder:i.medium,booleanBg:i.mediumlight,booleanSelectedBg:i.lightest,inputBg:i.lightest,inputBorder:i.border,inputTextColor:i.darkest,inputBorderRadius:4},G=je,Re=(()=>{let e;return typeof window<"u"?e=window:typeof globalThis<"u"?e=globalThis:typeof global<"u"?e=global:typeof self<"u"?e=self:e={},e})();const{logger:Me}=__STORYBOOK_MODULE_CLIENT_LOGGER__;var{window:O}=Re,Oe=o(e=>typeof e!="string"?(Me.warn(`Color passed to theme object should be a string. Instead ${e}(${typeof e}) was passed.`),!1):!0,"isColorString"),_e=o(e=>!/(gradient|var|calc)/.test(e),"isValidColorForPolished"),ze=o((e,t)=>e==="darken"?x(`${Se(1,t)}`,.95):e==="lighten"?x(`${Ie(1,t)}`,.95):t,"applyPolished"),se=o(e=>t=>{if(!Oe(t)||!_e(t))return t;try{return ze(e,t)}catch{return t}},"colorFactory");se("lighten");se("darken");var De=o(()=>!O||!O.matchMedia?"light":O.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light","getPreferredColorScheme"),_={light:G,dark:Te,normal:G},z=De(),He=o((e={base:z},t)=>{let r={..._[z],..._[e.base]||{},...e,base:_[e.base]?e.base:z};return{...t,...r,barSelectedColor:e.barSelectedColor||r.colorSecondary}},"create");const Ae="@retailcrm/embed-ui-v1-components",$e=He({base:"light",appBg:"#F4F6F8",appBorderColor:"#DEE2E6",appBorderRadius:4,appContentBg:"#F4F6F8",appPreviewBg:"#F4F6F8",barBg:"#F4F6F8",barHoverColor:"hsl(220, 49%, 57%)",barSelectedColor:"#6528D7",barTextColor:"#6528D7",brandImage:"https://s3-s1.retailcrm.tech/eu-central-1/retailcrm-static/branding/retailcrm/logo/logo_horiz.svg",brandTitle:Ae,colorPrimary:"#005EEB",fontBase:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',fontCode:'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, Courier, monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',inputBg:"#FFFFFF",inputBorder:"#DEE2E6",inputBorderRadius:4,inputTextColor:"#1E2248",textColor:"#1E2248",textInverseColor:"red"}),qe={parameters:{backgrounds:{disable:!0},controls:{matchers:{color:/(background|color)$/i,date:/Date$/i}},docs:{theme:$e},options:{storySort:(e,t)=>{const r=[a=>a.includes("intro"),a=>a.endsWith("docs")];if(e.id===t.id)return 0;for(const a of r){if(a(e.id)&&!a(t.id))return-1;if(!a(e.id)&&a(t.id))return 1}return e.id.localeCompare(t.id,void 0,{numeric:!0})}}},decorators:[],tags:["autodocs"]};export{qe as default};
