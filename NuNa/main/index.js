var ctx, canvas, img = {};
var current_point;
var path;
var shift_x = 0, shift_y = 0, scale = 1; // transformation

$(function ()
{
    canvas = $("#canvas1")[0];

    $("#canvas1").attr("width", screen.width - 10)
                 .attr("height", screen.height - 60);

    var lr = (screen.height - 100) / 2 | 0 + "px";
    $("#shift_l").css("top", lr);
    $("#shift_r").css("top", lr);

    var ud = (screen.width - 100) / 2 | 0 + "px";
    $("#shift_u").css("left", ud);
    $("#shift_d").css("left", ud);

    ctx = canvas.getContext("2d");
    img["1"] = new Image();
    img["1"].src = 'floors/1.svg';

    img["1"].onload = function ()
    {
        init_points(dots, lines);
    };

    $("#goButton").on("click", find_and_show_path);

    $("#step_back").on("click", step_back);
    $("#step_forward").on("click", step_forward);

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

    $("#shift_r").on("click", function () {
        shift_x -= 50;
        draw();
    })

    $("#shift_l").on("click", function () {
        shift_x += 50;
        if (shift_x > 0)
            shift_x = 0;
        draw();
    })

    $("#shift_d").on("click", function () {
        shift_y -= 50;
        draw();
    })

    $("#shift_u").on("click", function () {
        shift_y += 50;
        if (shift_y > 0)
            shift_y = 0;
        draw();
    })

});

//////////////////////////////////////////////////////////////////////

function find_and_show_path() {
    var fromKey = $("#from").val();
    var toKey = $("#to").val();

    //check input data 
    if (points[fromKey] && points[toKey])
    {
        path = dijkstra(fromKey, toKey);
        path = path.reverse();
        auto_scale();
        set_current_point(path[0]);
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
    //$('html, body').animate({
    //    scrollTop: current_point.y - screen.height / 2, scrollLeft: current_point.x - screen.width / 2
    //}, 500);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            var x = p.x;
            var y = p.y;
            ctx.lineTo(x, y);
            x0 = x; y0 = y;
        }
        ctx.stroke();

        // man
        ctx.fillStyle = "#0000FF";
        ctx.beginPath();
        ctx.arc(current_point.x, current_point.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function auto_scale() {
    var p = path[0];
    scale = 1;
    shift_x = -p.x * scale + screen.width/2;
    shift_y = -p.y * scale + screen.height/2;
}



