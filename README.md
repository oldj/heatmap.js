heatmap.js
==========

* @author: oldj
* @blog: http://oldj.net

heatmap.js is a heatmap library based on Canvas.


* demo：[http://oldj.github.io/heatmap.js/](http://oldj.github.io/heatmap.js/)

## Initialize

    var heatmap = new HeatMap(canvas_node, width, height);

## API

* *addData(data)*

    add data(points), the parameter `data` is an Array looks like:

        [[x1, y1, n1], [x2, y2, n2], [x3, y3, n3], ... ]

    set points and count/weight, such as:

        [[12, 587, 1], [425, 220, 2], [449, 28, 6], ...]

    the 3rd parameter `n` is optional with a default value `1`. For example:

        [[144, 59, 1], [209, 94, 1], [83, 391, 1], ...]

    equals to:

        [[144, 59], [209, 94], [83, 391], ...]
 
 
* *render()*
 
    render the headmap.
 
* *clear()*
 
    clear the canvas.
