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
        step_forward();
    });

    //$(canvas).on('taphold', function (event) {
    //    location.replace('#dialog');
    //});

    $("#goButton").on("click", find_and_show_track);

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

// drawing & animation -------------

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
        ctx.drawImage(man.imgs[man.i], man.x, man.y, 8, 20);
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
    // X
    if (man.x < -shift_x / scale) {
        shift_x = (-man.x + 10) * scale;
    }
    if (man.x > (-shift_x + canvas.width) / scale) {
        shift_x = canvas.width - (man.x + man.imgs[0].width + 10) * scale;
    }
    // Y
    if (man.y < -shift_y / scale) {
        shift_y = (-man.y + 10) * scale;
    }
    if (man.y > (-shift_y + canvas.height) / scale) {
        shift_y = canvas.height - (man.y + man.imgs[0].height + 10) * scale;
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


