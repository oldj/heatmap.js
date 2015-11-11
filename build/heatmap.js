/**
 * heatmap.js
 * @author oldj
 * @blog http://oldj.net
 * last update: 2015-11-12 00:25:52
 */
!function(t,i){"object"==typeof exports&&"object"==typeof module?module.exports=i():"function"==typeof define&&define.amd?define([],i):"object"==typeof exports?exports.HeatMap=i():t.HeatMap=i()}(this,function(){function t(t,i,h){this.canvas=t,this.width=i,this.height=h,this._init()}function i(t,i){var s,o,n,a,r,e,f,_=256,c=[],l=Math.floor(_*t),p=Math.floor(_*i);for(s=0;l>s;s++)o=p>1?Math.floor(256*s/(p-1)):255,o>255&&(o=255),a=[0,0,255,o],c.push(a);for(s=l;_>s;s++)r=240*(_-s-1)/(_-l-1),e=1,f=.5,n=h(r,e,f),o=p>1?Math.floor(256*s/(p-1)):255,o>255&&(o=255),a=[n[0],n[1],n[2],o],c.push(a);return c}function h(t,i,h){if(i>0){var s,o,n=1/3,a=1/6,r=2/3,e=.5>h?h*(1+i):1+i-h*i,f=2*h-e,_=t/360,c=_+n,l=_-n,p=[c,_,l];for(s=0;3>s;s++)o=p[s],0>o&&(o+=1),o>1&&(o-=1),p[s]=o;for(s=0;3>s;s++)o=p[s],o=a>o?f+6*(e-f)*o:.5>o?e:r>o?6*(e-f)*(r-o):f,p[s]=o;for(s=0;3>s;s++)p[s]=Math.floor(256*p[s])}else p=[h,h,h];return p}function s(t,i){function h(t,h,s){var n,a,r=[[t,h],[-t,h],[t,-h],[-t,-h],[h,t],[-h,t],[h,-t],[-h,-t]];for(n=0;8>n;n++)a=i*r[n][1]+r[n][0],o[a]=s||1}for(var s,o={},n=0,a=t,r=3-(t<<1);a>=n;){for(s=n;a+1>s;s++)h(n,s,a+1-s);0>r?r+=(n<<2)+6:(r+=(n-a<<2)+10,a--),n++}var e,f=[];for(e in o)o.hasOwnProperty(e)&&f.push([parseInt(e),o[e]]);return f}return t.prototype={_init:function(){this.canvas.width=this.width,this.canvas.height=this.height,this._ctx=this.canvas.getContext("2d"),this._colors=i(.382,.618),this._circle=s(16,this.width),this._circle_length=this._circle.length,this.clear()},addData:function(t){var i,h,s,o=t.length,n=this.width,a=this._size;if(0!=o){for(i=0;o>i;i++)h=t[i],s=h[1]*n+h[0],isNaN(s)||s>=a||this._heat(s,h[2]||1);this._is_flat=!1}},_heat:function(t,i){this._original_points[t]+=i;var h,s,o,n=this._original_points,a=this._circle,r=this._circle_length,e=this._size;for(h=0;r>h;h++)s=a[h],o=t+s[0],0>o||o>=e||(n[o]+=s[1])},_newEmptyArray:function(t){for(var i=[];t--;)i.push(0);return i},clear:function(){this._is_flat=!1,this._size=this.width*this.height,this._original_points=this._newEmptyArray(this._size),this._flat_points=this._newEmptyArray(this._size),this.canvas.width=this.width,this.canvas.height=this.height},_findMax:function(t){var i,h,s,o=0;try{o=Math.max.apply(null,t)}catch(n){for(i=0,h=t.length;h>i;i++)(s=t[i])>o&&(o=s)}return o},_doFlat:function(){if(!this._is_flat){var t,i=this._findMax(this._original_points),h=255/i,s=this._size,o=this._flat_points,n=this._original_points;for(t=0;s>t;t++)o[t]=Math.floor(n[t]*h);this._is_flat=!0}},render:function(){this._doFlat();var t,i,h,s=this.width,o=this.height,n=this._ctx.createImageData(s,o),a=n.data,r=this._size,e=this._flat_points,f=this._colors;for(t=0;r>t;t++)i=f[e[t]],h=t<<2,a[h]=i[0],a[h+1]=i[1],a[h+2]=i[2],a[h+3]=i[3];this._ctx.putImageData(n,0,0)}},t});