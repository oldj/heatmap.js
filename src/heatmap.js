/**
 * author: oldj
 * blog: http://oldj.net
 */


(function (global) {

	function HeatMap(canvas, width, height) {
		this.canvas = canvas;
		this.width = width;
		this.height = height;
		this._init();
	}

	HeatMap.prototype = {

		_init: function () {
			this.canvas.width = this.width;
			this.canvas.height = this.height;
			this._ctx = this.canvas.getContext("2d");
			this._colors = makeColors(0.382, 0.618);
			this._circle = mkCircle(16, this.width);

			this.clear();
		},

		addData: function (data) {
			var i,
				l = data.length,
				v,
				width = this.width,
				size = this._size,
				pos;

			if (l == 0) return;

			for (i = 0; i < l; i++) {
				v = data[i];
				pos = v[1] * width + v[0];
				if (isNaN(pos) || pos >= size) continue;
				this._heat(pos, v[2] || 1);
			}

			this._is_flat = false;
		},

		_heat: function (pos, c) {
			this._original_points[pos] += c;

			var i,
				original_points = this._original_points,
				circle = this._circle,
				l = circle.length,
				size = this._size,
				p, ipos;

			for (i = 0; i < l; i ++) {
				p = circle[i];
				ipos = pos + p[0];
				if (ipos < 0 || ipos >= size) continue;
				original_points[ipos] += p[1];
			}
		},

		_newEmptyArray: function (size) {
			var a = [];
			while (size--) {
				a.push(0);
			}
			return a;
		},

		clear: function () {
			this._is_flat = false;
			this._size = this.width * this.height;
			this._original_points = this._newEmptyArray(this._size);
			this._flat_points = this._newEmptyArray(this._size);

			this.canvas.width = this.width;
			this.canvas.height = this.height;
		},

		_findMax: function (arr) {
			var m = 0, i, l, v;
			try {
				m = Math.max.apply(null, arr);
			} catch (e) {
				for (i = 0, l = arr.length; i < l; i ++) {
					if ((v = arr[i]) > m) m = v;
				}
			}
			return m;
		},

		_doFlat: function () {
			if (this._is_flat) return;

			var max = this._findMax(this._original_points);
			var r = 255 / max;
			var i;
			var size = this._size;
			var arr_flat = this._flat_points;
			var arr_original = this._original_points;

			for (i = 0; i < size; i++) {
				arr_flat[i] = Math.floor(arr_original[i] * r);
			}

			this._is_flat = true;
		},

		render: function () {
			this._doFlat();

			var width = this.width,
				height = this.height,
				img_data = this._ctx.createImageData(width, height),
				pix = img_data.data,
				size = this._size,
				flat_data = this._flat_points,
				colors = this._colors,
				i, rgba, p;

			for (i = 0; i < size; i++) {
				rgba = colors[flat_data[i]];
				p = i << 2;
				pix[p] = rgba[0];
				pix[p + 1] = rgba[1];
				pix[p + 2] = rgba[2];
				pix[p + 3] = rgba[3];
			}

			this._ctx.putImageData(img_data, 0, 0);
		}
	};

	function makeColors(vb, va) {

		var N = 256,
			colors = [],
			blue_sep = Math.floor(N * vb),
			alpha_sep = Math.floor(N * va),
			i, a, rgb, rgba,
			h, s, l;

		for (i = 0; i < blue_sep; i++) {
			a = alpha_sep > 1 ? Math.floor(256 * i / (alpha_sep - 1)) : 255;
			if (a > 255) a = 255;
			rgba = [0, 0, 255, a];
			colors.push(rgba);
		}

		for (i = blue_sep; i < N; i++) {
			h = 240 * (N - i - 1) / (N - blue_sep - 1);
			s = 1;
			l = 0.5;
			rgb = HSL2RGB(h, s, l);
			a = alpha_sep > 1 ? Math.floor(256 * i / (alpha_sep - 1)) : 255;
			if (a > 255) a = 255;
			rgba = [rgb[0], rgb[1], rgb[2], a];
			colors.push(rgba);
		}

		return colors;
	}

	function HSL2RGB(h, s, l) {
		if (s > 0) {

			var v_1_3 = 1 / 3,
				v_1_6 = 1 / 6,
				v_2_3 = 2 / 3,

				q = l < 0.5 ? l * (1 + s) : 1 + s - (l * s),
				p = l * 2 - q,
				hk = h / 360,
				tr = hk + v_1_3,
				tb = hk - v_1_3,

				rgb = [tr, hk, tb], i, tc;

			for (i = 0; i < 3; i++) {
				tc = rgb[i];

				if (tc < 0) tc += 1;
				if (tc > 1) tc -= 1;
				rgb[i] = tc;
			}

			for (i = 0; i < 3; i++) {
				tc = rgb[i];

				if (tc < v_1_6) {
					tc = p + ((q - p) * 6 * tc);
				} else if (tc < 0.5) {
					tc = q;
				} else if (tc < v_2_3) {
					tc = ((q - p) * 6 * (v_2_3 - tc));
				} else {
					tc = p;
				}

				rgb[i] = tc;
			}

			for (i = 0; i < 3; i++) {
				rgb[i] = Math.floor(rgb[i] * 256);
			}

		} else {
			// s < 0
			rgb = [l, l, l];
		}

		return rgb;
	}

	/**
	 * 根据半径r以及图片宽度 w ，产生一个圆的list
	 * @see http://oldj.net/article/bresenham-algorithm/
	 * @param r {Number} 圆的半径
	 * @param w {Number} 图片的宽度
	 */
	function mkCircle(r, w) {
		var tmp = {};

		function c8(ix, iy, v) {
			// 8 对称性

			var ps = [
				[ix, iy],
				[-ix, iy],
				[ix, -iy],
				[-ix, -iy],
				[iy, ix],
				[-iy, ix],
				[iy, -ix],
				[-iy, -ix]
			], ii, p;

			for (ii = 0; ii < 8; ii ++) {
				p = w * ps[ii][1] + ps[ii][0];
				tmp[p] = v || 1;
			}
		}

		var x = 0, y = r,
			iy,
			d = 3 - (r << 1);

		while (x <= y) {
			for (iy = x; iy < y + 1; iy ++) {
				c8(x, iy, y + 1 - iy);
			}
			if (d < 0) {
				d += (x << 2) + 6;
			} else {
				d += ((x - y) << 2) + 10;
				y --;
			}
			x ++;
		}

		var vals = [];
		var k;
		for (k in tmp) {
			if (tmp.hasOwnProperty(k)) {
				vals.push([parseInt(k), tmp[k]]);
			}
		}

		return vals;
	}

	global.HeatMap = HeatMap;

})(window);
