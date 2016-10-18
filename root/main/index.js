// inintial settings -----------

$(function ()
{
    // set canvas size accorging to screen size
    canvas = $("#canvas1")[0];
    $("#canvas1").attr("width", screen.availWidth)
                 .attr("height", screen.availHeight);

    ctx = canvas.getContext("2d");

    // load background images
    for (var i = 1; i < max_floor; ++i) {
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
        
        var start = track[0];
        ctx.moveTo(start.x, start.y);

        for (var i = 1; i < track.length; i++) {
            var p = track[i];
            ctx.save();
            if ( p.z != current_point.z) {
                ctx.globalAlpha = 0.5;
                ctx.setLineDash([4, 3]);
            }
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.restore();
            ctx.moveTo(p.x, p.y);
        }

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


