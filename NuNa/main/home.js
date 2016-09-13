var ctx, canvas, img = {};
var current_point;
var path;
var shift_x = 0, shift_y = 0, scale = 1; // transform params

$(function ()
{
    // canvas size
    canvas = $("#canvas1")[0];
    $("#canvas1").attr("width", screen.width)
                 .attr("height", screen.height);
    ctx = canvas.getContext("2d");

    // background images
    for (var i = 1; i < 3; ++i)
    {
        img[i] = new Image();
        img[i].src = 'floors/'+ i +'.svg';
    }

    // init data
    img[2].onload = function ()
    {
        init_points(dots, lines);
        set_current_point(points["ENTER"]);
    };

    // scaling

    var K = Math.sqrt(2);
    $("#scale_inc").on("click", function () {
        scale *= K;
        shift_x = shift_x * K - canvas.width / 2 * (K - 1);
        shift_y = shift_y * K - canvas.height / 2 * (K - 1);
        draw();
    })

    $("#scale_dec").on("click", function () {
        var k = 1 / K;
        scale *= k;
        shift_x = shift_x * k - canvas.width / 2 * (k - 1);
        shift_y = shift_y * k - canvas.height / 2 * (k - 1);
        draw();
    })

    // scrolling
    var SCROL_STEP = (screen.width / 2) | 0;

    $(canvas).on('swipeup', function (event) {
        event.stopPropagation();
        event.preventDefault();
        shift_y -= SCROL_STEP;
        draw();

    });

    $(canvas).on('swipedown', function (event) {
        event.stopPropagation();
        event.preventDefault();
        shift_y += SCROL_STEP;
        draw();

    });

    $(canvas).on('swipeleft', function (event) {
        event.stopPropagation();
        event.preventDefault();
        shift_x -= SCROL_STEP;
        draw();

    });

    $(document).on('swiperight', 'canvas', function (event) {
        event.stopPropagation();
        event.preventDefault();
        shift_x += SCROL_STEP;
        draw();

    });

    $(canvas).on('tap', function (event) {
        event.stopPropagation();
        event.preventDefault();
        step_forward();

    });

    $(canvas).on('taphold', function (event) {
        location.replace('#dialog');
    });


    $("#goButton").on("click", find_and_show_path);



});



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
    var i = (path.indexOf(current_point) + 1) % path.length;
    set_current_point(path[i]);
};

function step_back() {
    if (path == undefined)
        return;
    var i = (path.indexOf(current_point) - 1 + path.length) % path.length;
    set_current_point(path[i]);
}

function set_current_point(p) {
    current_point = p;
    draw();
}

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
            //if (p.z == current_point.z) {
                ctx.lineTo(p.x, p.y);
                x0 = p.x; y0 = p.y;
            //}
        }
        ctx.stroke();

        // man
        ctx.fillStyle = "#0000FF";
        ctx.beginPath();
        ctx.arc(current_point.x, current_point.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    // floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.font = "72px arial";
    ctx.fillText(current_point.z + " этаж", 50, canvas.height - 50);

}

function auto_scale() {
    var p = path[0];
    scale = 1;
    shift_x = -p.x * scale + screen.width/2;
    shift_y = -p.y * scale + screen.height/2;
}



