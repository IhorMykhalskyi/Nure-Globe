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
"151 X11 137 136,165 136а X12 X13 120 119,X14 118 117 116 116а 113,114",
"L11 X12 ВХОД", 
"129,130,130а 128 128б,131 128а 127 126,L14 125а,М11 131а 125б 132а 124,132б 133 123 134 122,135 135в X13",
];

// find shortest track
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
    // track
    p = points[key_finish]
    var track = [p];
    while (p.from) {
        p = p.from;
        track.push(p);
    }
    return tune(track);
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
function tune(track) 
{
    if (track.length < 4)
        return track;

    var res = [track[0]];
    for (var i = 1; i < track.length - 1; i++) {
        var a = track[i - 1], b = track[i], c = track[i + 1];
        var can_remove =
            a.x == b.x && b.x == c.x &&   a.y == b.y && b.y == c.y ||
            a.x == b.x && b.x == c.x &&   a.z == b.z && b.z == c.z ||
            a.z == b.z && b.z == c.z &&   a.y == b.y && b.y == c.y;
        if (!can_remove)
            res.push(b);
    }
    res.push(track[track.length-1]);
    return res;
}
// Point of the track.
// x, y, z - coords
// E - dictionary of belonging edges (key:distance pairs)

function Point(key, x, y, z) {
    this.key = key;
    this.x = x;
    this.y = y;
    this.z = z;
    this.E = {}; 
}

// -----------------------------------------------------------

var points;  // dictionary of Points

var MAP_HEIGHT;
var MAP_WIDTH;

var MAN_HEIGHT = 10;
var MAN_WIDTH = 4;

var ctx, canvas;
var imgs = {}, imgs_count = 2;

var current_point;

var track;  // current track

var shift_x = 0, shift_y = 0, scale = 1; // transformation params

var man = { x: 0, y: 0, i: 0, imgs: {} }; // one who runs. Has two images.

// -----------------------------------------------------------



var SCALE_PER_STEP = Math.pow(2, 1 / 30);
var OFFSET_PER_STEP = 10;
var shift_anime_timer = null;

function stop_shift_anime() {
    if (shift_anime_timer) {
        clearInterval(shift_anime_timer);
        shift_anime_timer = null;
    }
}

function shift_anime(dx, dy) {
    var STEP_COUNT = 50;
    var t = 0;
    if (!shift_anime_timer) {
        shift_anime_timer = setInterval(function () {
            //  
            shift_x += dx;
            shift_y += dy;
            //
            draw();
            t++;
            if (t >= STEP_COUNT) {
                clearInterval(shift_anime_timer);
                shift_anime_timer = null;
            }
        }, 20);
    }
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



// inintial settings -----------

$(function ()
{
    // set canvas size accorging to screen size
    canvas = $("#canvas1")[0];
    $("#canvas1").attr("width", screen.availWidth)
                 .attr("height", screen.availHeight);

    ctx = canvas.getContext("2d");

    // load background images
    for (var i = 1; i < 3; ++i) {
        imgs[i] = new Image();
        imgs[i].src = 'floors/' + i + '.svg';
    }

    // load mans pictures
    for (var i = 0; i < 2; ++i) {
        man.imgs[i] = new Image();
        man.imgs[i].src = 'pic/man' + (i + 1) + '.png';
    }

    // init data
    imgs[imgs_count].onload = function ()
    {
        init_data(dots, lines);
        set_current_point(points["ВХОД"]);
        MAP_HEIGHT = imgs[1].height;
        MAP_WIDTH = imgs[1].width;
    };

    //---------------- settings event handlers --------------------------

    // scaling

    $("#scale_inc").on("click", function () {
        scale_anime(SCALE_PER_STEP)
    })

    $("#scale_dec").on("click", function () {
        scale_anime(1/SCALE_PER_STEP)
    })

    // scrolling

    $(canvas).on('swipeup', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_y + canvas.height) / scale < MAP_HEIGHT) {
            shift_anime(0, -OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipedown', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_y / scale < 0) {
            shift_anime(0, OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipeleft', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if ((-shift_x + canvas.width) / scale < MAP_WIDTH) {
            shift_anime(-OFFSET_PER_STEP, 0);
        }
    });

    $(document).on('swiperight', 'canvas', function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (shift_x / scale < 0) {
            shift_anime(OFFSET_PER_STEP, 0);
        }
    });

    $(canvas).on('tap', function (event) {
        event.stopPropagation();
        event.preventDefault();

        stop_shift_anime();

        var dx = (event.clientX - shift_x - MAN_WIDTH/2) / scale - man.x;
        var dy = (event.clientY - shift_y - MAN_HEIGHT/2) / scale - man.y;
        if (dx * dx + dy * dy < 400) {
            step_forward();
        }
    });

    $(canvas).on('taphold', function (event) {
        event.stopPropagation();
        event.preventDefault();
        //stop_shift_anime();
        scale_anime(SCALE_PER_STEP);
    });

    $("#goButton").on("click", function (event) {
        stop_shift_anime();
        find_and_show_track();
    });

});


//
function init_data(dots, lines)
{
    // points
    points = {};
    for (var polykey in dots) {
        var keys = polykey.split(",");
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            points[key] = new Point(key, dots[polykey][0], dots[polykey][1], dots[polykey][2]);
        }
    }

    // edges
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].replace(/,/g, " ");

        var keys = line.split(' ');
        for (var j = 1; j < keys.length; j++) {
            var k1 = keys[j - 1], k2 = keys[j];
            if (points[k1] && points[k2]) {
                var dx = points[k1].x - points[k2].x;
                var dy = points[k1].y - points[k2].y;
                var dz = points[k1].z - points[k2].z;
                var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                points[k1].E[k2] = points[k2].E[k1] = dist;
            }
            else {
                if (!points[k1])
                    console.log('Wrong key: ' + k1);
                if (!points[k2])
                    console.log('Wrong key: ' + k2);
            }
        }
    }
}

//
function find_and_show_track() {
    var fromKey = $("#from").val();
    var toKey = $("#to").val();

    $("#from").css("color", points[fromKey] ? "black" : "red");
    $("#to").css("color", points[toKey] ? "black" : "red");

    //check input data 
    if (points[fromKey] && points[toKey])
    {
        track = dijkstra(fromKey, toKey);
        track = track.reverse();
        auto_scale();
        set_current_point(track[0]);
    } else {
        track = null;
        location.replace('#dialog');
    }
}

//
function step_forward() {
    if (track == undefined)
        return;
    var i1 = track.indexOf(current_point);
    var i2 = (i1 + 1) % track.length;
    set_current_point(track[i1]);

    if (track[i1].z == track[i2].z) 
    {
        step_anime(track[i1], track[i2]);     
    } else {
        ladder_anime(track[i1], track[i2])
    }
};

function step_back() {
    if (track == undefined)
        return;
    var i = (track.indexOf(current_point) - 1 + track.length) % track.length;
    set_current_point(track[i]);
}

function set_current_point(p) {
    current_point = p;
    man.x = p.x;
    man.y = p.y;
    draw();
}

// drawing -------------------------

function draw()
{
    // background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // transform
    ctx.save();
    ctx.translate(shift_x, shift_y);
    ctx.scale(scale, scale);


    var bg = current_point.z;
    ctx.drawImage(imgs[bg], 0, 0);

    // track
    if (track) {
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        var p = track[0];
        var x0 = p.x;
        var y0 = p.y;
        ctx.moveTo(x0, y0);
        for (var i = 1; i < track.length; i++) {
            var p = track[i];
            ctx.lineTo(p.x, p.y);
            x0 = p.x; y0 = p.y;
        }
        ctx.stroke();

        // man
        ctx.drawImage(man.imgs[man.i], man.x, man.y, MAN_WIDTH, MAN_HEIGHT);
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
    var p = track[0];
    scale = 2;
    shift_x = -p.x * scale + screen.width / 2;
    shift_y = -p.y * scale + screen.height / 2;
}

function auto_shift()
{
    var MARGIN = 40;
    // X
    if (man.x < -shift_x / scale) {
        shift_x = (-man.x + MARGIN) * scale;
    }
    if (man.x > (-shift_x + canvas.width) / scale) {
        shift_x = canvas.width - (man.x + man.imgs[0].width + MARGIN) * scale;
    }
    // Y
    if (man.y < -shift_y / scale) {
        shift_y = (-man.y + MARGIN) * scale;
    }
    if (man.y > (-shift_y + canvas.height) / scale) {
        shift_y = canvas.height - (man.y + man.imgs[0].height + MARGIN) * scale;
    }

}