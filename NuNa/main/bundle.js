(function () {
    var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [data.pageX, data.pageY],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[0] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function (event) {
                            $this.unbind(touchMoveEvent, moveHandler);
                            if (start && stop) {
                                if (stop.time - start.time < 1000 &&
                                        Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                        Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                    start.origin
                                            .trigger("swipeupdown")
                                            .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                }
                            }
                            start = stop = undefined;
                        });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();
function Point(key, x, y, z) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.z = z;
    this.E = {}; 
}

// -----------------------------------------------------------

var points;  // dictionary of Points

function init_points(ps, lines) {
    points = {};
    for (var polykey in ps) {
        var keys = polykey.split(",");
        for (var i = 0; i < keys.length; ++i)
        {
            var key = keys[i];
            points[key] = new Point(key, ps[polykey][0], ps[polykey][1], ps[polykey][2]);
        }
    }

    for(var i = 0; i < lines.length; i++) 
    {
        var keys = lines[i].split(' ');
        for(var j = 1; j < keys.length; j++)
        {
            var k1 = keys[j - 1], k2 = keys[j];
            if (points[k1] && points[k2]) {
                var dx = ps[k1][0] - ps[k2][0];
                var dy = ps[k1][1] - ps[k2][1];
                var dz = ps[k1][2] - ps[k2][2];
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                points[k1].E[k2] = points[k2].E[k1] = dist;
            }
            else {
                console.log('Wrong keys: ' + k1 + ", " + k2);
            }
        }
    }
}




// find shortest path
//
function dijkstra(key_start, key_finish) {
    // reset points
    for (var key in points) {
        points[key].mark = Number.MAX_VALUE;
        points[key].const = false;
        points[key].from = null;
    }
    points[key_start].mark = 0;
    points[key_start].const = true;

    var p = points[key_start];
    while (p.key != key_finish)
    {
        p = dijkstra_step(p);
        if (!p) {
            console.log("граф не связен");
        }
        // ставим постоянную отметку
        p.const = true;        
    }
    // path
    p = points[key_finish]
    var path = [p];
    while (p.from) {
        p = p.from;
        path.push(p);
    }
    return tune(path);
}

// A step of Dijkstra's alg.
//
function dijkstra_step(point)
{
    for (var k in point.E) {
        var p = points[k];
        if (p.const)
            continue;
        d = point.E[k];
        if (point.mark + d < p.mark) {
            p.mark = point.mark + d;
            p.from = point;
        }
    }

    // marks nearest point as const
    var min = Number.MAX_VALUE;
    for (var k in points)
    {
        var p = points[k];
        if (p.const)
            continue;
        if (p.mark < min) {
            var nearest = p;
            min = p.mark;
        }
    }
    return nearest;
}

// Remove on streight line vertexes
//
function tune(path) 
{
    if (path.length < 4)
        return path;

    var res = [path[0]];
    for (var i = 1; i < path.length - 1; i++) {
        var a = path[i - 1], b = path[i], c = path[i + 1];
        var can_remove =
            a.x == b.x && b.x == c.x &&   a.y == b.y && b.y == c.y ||
            a.x == b.x && b.x == c.x &&   a.z == b.z && b.z == c.z ||
            a.z == b.z && b.z == c.z &&   a.y == b.y && b.y == c.y;
        if (!can_remove)
            res.push(b);
    }
    res.push(path[path.length-1]);
    return res;
}
var dots = {
"116": [414, 294, 1],
"117": [391, 294, 1],
"118": [373, 294, 1],
"120": [331, 294, 1],
"123": [311, 224, 1],
"127": [311, 148, 1],
"128": [311, 124, 1],
"133": [311, 219, 1],
"134": [311, 234, 1],
"137": [152, 294, 1],
"139": [128, 244, 1],
"142": [128, 137, 1],
"144": [103, 137, 1],
"145": [128, 150, 1],
"146": [128, 169, 1],
"148": [128, 197, 1],
"151": [104, 294, 1],
"141а": [128, 156, 1],
"141,147": [128, 184, 1],
"L12": [128, 205, 1],
"140а": [128, 217, 1],
"140,149": [128, 229, 1],
"138,150": [128, 262, 1],
"L13": [128, 276, 1],
"X11": [128, 294, 1],
"136,165": [166, 294, 1],
"136а": [184, 294, 1],
"X12": [249, 294, 1],
"X13": [311, 294, 1],
"119,X14": [356, 294, 1],
"116а": [433, 294, 1],
"113,114": [458, 294, 1],
"L11": [249, 253, 1],
"ВХОД": [249, 339, 1],
"129,130,130а": [311, 116, 1],
"128б,131": [311, 132, 1],
"128а": [311, 142, 1],
"126,L14": [311, 156, 1],
"125а,М11": [311, 169, 1],
"131а": [311, 182, 1],
"125б": [311, 186, 1],
"132а": [311, 193, 1],
"124,132б": [311, 204, 1],
"122,135": [311, 251, 1],
"135в": [311, 269, 1]
}

var lines = [
"144 142 145 141а 146 141,147 148 140а 140,149 139 138,150 X11",
"151 X11 137 136,165 136а X12 120 119,X14 118 117 116 116а 113,114",
"L11 X12 ВХОД", 
"129,130,130а 128 128б,131 128а 127 126,L14 125а,М11 131а 125б 132а 124,132б 133 123 134 122,135 135в X13",
];
var MAP_HEIGHT, MAP_WIDTH;
var SCALE_STEP = Math.pow(2, 1 / 30);
var SCROL_STEP = 10;

var ctx, canvas, img = {};
var current_point;
var path;
var shift_x = 0, shift_y = 0, scale = 1; // transform params
var man = { x: 0, y: 0, i: 0, img: {}};

// inintial settings -----------

$(function ()
{
    // canvas size
    canvas = $("#canvas1")[0];
    $("#canvas1").attr("width", screen.availWidth)
                 .attr("height", screen.availHeight);
    ctx = canvas.getContext("2d");

    // background images
    for (var i = 1; i < 3; ++i) {
        img[i] = new Image();
        img[i].src = 'floors/' + i + '.svg';
    }

    // mans pictures
    for (var i = 0; i < 2; ++i) {
        man.img[i] = new Image();
        man.img[i].src = 'pic/man' + (i + 1) + '.png';
    }

    // init data
    img[2].onload = function ()
    {
        init_points(dots, lines);
        set_current_point(points["ENTER"]);
        MAP_HEIGHT = img[2].height;
        MAP_WIDTH = img[2].width;
    };

    // scaling

    $("#scale_inc").on("click", function () {
        scale_anime(SCALE_STEP)
    })

    $("#scale_dec").on("click", function () {
        scale_anime(1/SCALE_STEP)
    })

    // scrolling


    $(canvas).on('swipeup', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_y + canvas.height) / scale < MAP_HEIGHT) {
            shift_anime(0, -SCROL_STEP);
        }
    });

    $(canvas).on('swipedown', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_y / scale < 0) {
            shift_anime(0, SCROL_STEP);
        }
    });

    $(canvas).on('swipeleft', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_x + canvas.width) / scale < MAP_WIDTH) {
            shift_anime(-SCROL_STEP, 0);
        }
    });

    $(document).on('swiperight', 'canvas', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_x / scale < 0) {
            shift_anime(SCROL_STEP, 0);
        }
    });

    $(canvas).on('tap', function (event) {
        event.stopPropagation();
        event.preventDefault();
        step_forward();
    });

    //$(canvas).on('taphold', function (event) {
    //    location.replace('#dialog');
    //});


    $("#goButton").on("click", find_and_show_path);

});

//
function find_and_show_path() {
    var fromKey = $("#from").val();
    var toKey = $("#to").val();

    $("#from").css("color", points[fromKey] ? "black" : "red");
    $("#to").css("color", points[toKey] ? "black" : "red");

    //check input data 
    if (points[fromKey] && points[toKey])
    {
        path = dijkstra(fromKey, toKey);
        path = path.reverse();
        auto_scale();
        set_current_point(path[0]);
    } else {
        path = null;
        location.replace('#dialog');
    }
}

function step_forward() {
    if (path == undefined)
        return;
    var i1 = path.indexOf(current_point);
    var i2 = (i1 + 1) % path.length;
    set_current_point(path[i1]);

    if (path[i1].z == path[i2].z) 
    {
        step_anime(path[i1], path[i2]);     
    } else {
        ladder_anime(path[i1], path[i2])
    }
};

function step_back() {
    if (path == undefined)
        return;
    var i = (path.indexOf(current_point) - 1 + path.length) % path.length;
    set_current_point(path[i]);
}

function set_current_point(p) {
    current_point = p;
    man.x = p.x;
    man.y = p.y;
    draw();
}

// drawing & animation -------------

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // transform
    ctx.save();
    ctx.translate(shift_x, shift_y);
    ctx.scale(scale, scale);

    // background
    var bg = current_point.z;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img[bg], 0, 0);

    // path
    if (path) {
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var p = path[0];
        var x0 = p.x;
        var y0 = p.y;
        ctx.moveTo(x0, y0);
        for (var i = 1; i < path.length; i++) {
            var p = path[i];
            ctx.lineTo(p.x, p.y);
            x0 = p.x; y0 = p.y;
        }
        ctx.stroke();

        // circle
        //ctx.fillStyle = "#0000FF";
        //ctx.beginPath();
        //ctx.arc(man.x, man.y, 5, 0, Math.PI * 2);
        //ctx.fill();

        // man
        ctx.drawImage(man.img[man.i], man.x, man.y, 8, 20);
        man.i = (man.i + 1) % 2;
    }
    ctx.restore();

    // floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.font = "72px arial";
    ctx.fillText(current_point.z + " этаж", 50, canvas.height - 50);

}

function auto_scale()
{
    var p = path[0];
    scale = 1;
    shift_x = -p.x * scale + screen.width / 2;
    shift_y = -p.y * scale + screen.height / 2;
}

function auto_shift()
{
    // X
    if (man.x < -shift_x / scale) {
        shift_x = (-man.x + 10) * scale;
    }
    if (man.x > (-shift_x + canvas.width) / scale) {
        shift_x = canvas.width - (man.x + man.img[0].width + 10) * scale;
    }
    // Y
    if (man.y < -shift_y / scale) {
        shift_y = (-man.y + 10) * scale;
    }
    if (man.y > (-shift_y + canvas.height) / scale) {
        shift_y = canvas.height - (man.y + man.img[0].height + 10) * scale;
    }

}

function shift_anime(dx, dy) {
    var STEP_COUNT = 15;
    var t = 0;
    var timer = setInterval(function ()
    {
        //  
        shift_x += dx;
        shift_y += dy;
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
        }
    }, 20);
}

function scale_anime(k) {
    var STEP_COUNT = 15;
    var t = 0;
    var timer = setInterval(function () {
        //
        scale *= k;
        shift_x = shift_x * k - canvas.width / 2 * (k - 1);
        shift_y = shift_y * k - canvas.height / 2 * (k - 1);
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
        }
    }, 20);
}

function step_anime(p1, p2) {
    var STEP_COUNT = 10;
    var dx = (p2.x - p1.x) / STEP_COUNT;
    var dy = (p2.y - p1.y) / STEP_COUNT;
    var t = 0;
    var timer = setInterval(function () {
        //
        man.x += dx;
        man.y += dy;
        //
        auto_shift();

        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
            man.i = 0;
            draw();
        }
    }, 50);
    
}


function ladder_anime(p1, p2) {
    var ladderNo = p1.key[2], dx, dy;
    switch (ladderNo) {
        case "1": dx = 0; dy = 2; break;
        case "2": dx = 2; dy = 0; break;
        case "3": dx = -2; dy = 0; break;
    }
    var STEP_COUNT = 20;
    var t = 0;
    var timer = setInterval(function () {
        //
        if (t < STEP_COUNT / 2) {
            man.x += dx;
            man.y += dy;
        } else {
            man.x -= dx;
            man.y -= dy;
        }
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
        }
    }, 20);
    
}