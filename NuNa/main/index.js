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
        ctx.strokeStyle = "#0000FF";
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

function auto_scale() {
    var p = path[0];
    scale = 1;
    shift_x = -p.x * scale + screen.width/2;
    shift_y = -p.y * scale + screen.height/2;
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


