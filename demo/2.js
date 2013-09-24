/**
 * author: oldj
 * blog: http://oldj.net
 */


window.onload = function () {
	var w = 800, h = 600;
	var hm = new HeatMap(document.getElementById("test-canvas"), w, h);

	function loop() {

		hm.addData([[
			Math.floor(Math.random() * w),
			Math.floor(Math.random() * h),
			Math.floor(Math.random() * 10)
		]]);
		hm.render();

		setTimeout(loop, 16);
	}

	loop();
};
