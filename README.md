heatmap.js
==========

    @author: oldj
    @blog: http://oldj.net

heatmap.js是一个基于Canvas的热图绘制库。

 
* 版本：1.0
* 作者：oldj
* demo：[http://oldj.github.io/heatmap.js/](http://oldj.github.io/heatmap.js/)
 
## 初始化组件
 
    var heatmap = new HeatMap(canvas_node, width, height);

## API说明
 
* *addData(data)*
 
    添加数据。其中 data 是一个数组，形如：
 
    [[x1, y1, n1], [x2, y2, n2], [x3, y3, n3], ... ]
 
    含义为每个坐标以及它对应的权重，比如：
 
    [[12, 587, 1], [425, 220, 2], [449, 28, 6], ...]
 
    其中第三位 n 也可以省略，如果省略，则默认为 1，比如：
 
    [[144, 59, 1], [209, 94, 1], [83, 391, 1], ...]
 
    等价于：
 
    [[144, 59], [209, 94], [83, 391], ...]
 
 
* *render()*
 
    绘制热图。
 
* *clear()*
 
    清空画布。
