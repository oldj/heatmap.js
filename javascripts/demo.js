/**
 * author: oldj
 * blog: http://oldj.net
 */

function demo1() {
        var w = 640, h = 360;
        var hm = new HeatMap(document.getElementById("rnd-canvas"), w, h);
        var rnd_points = [];
        var init_count = 3;
        var pos;
        var i, l, j = 15, wv = w / 4;

        for (i = 0; i < init_count; i ++) {
                rnd_points.push([
                        Math.floor(Math.random() * w),
                        Math.floor(Math.random() * h),
                        Math.floor(Math.random() * 10) + 1
                ]);
        }

        while(j--) {
                l = rnd_points.length;
                while (l--) {
                        pos = rnd_points[l];
                        rnd_points.push([
                                Math.floor((Math.random() - 0.5) * wv + pos[0]),
                                Math.floor((Math.random() - 0.5) * wv + pos[1]),
                                Math.floor(Math.random() * 10) + 1
                        ]);
                }
        }

        hm.addData(rnd_points);

        hm.render();
}

function demo2() {
        var w = 640, h = 360;
        var hm = new HeatMap(document.getElementById("dynamic-canvas"), w, h);

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
}

window.onload = function () {
	demo1();
	demo2();
}
