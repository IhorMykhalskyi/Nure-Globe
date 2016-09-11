var ctx, canvas, img = {};
var current_point;
var path;
var shift_x = 0, shift_y = 0, scale = 2; // transformation

$(function ()
{
    $("#canvas1").attr("width", screen.width)
                 .attr("height", screen.height - 100);
    canvas = $("#canvas1")[0];
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
        shift_x += canvas.width * (1 - K) / 2;
        shift_y += canvas.height * (1 - K) / 2;
        draw();
    })

    $("#scale_dec").on("click", function () {
        scale /= K;
        shift_x -= canvas.width * (1 - K) / 2;
        shift_y -= canvas.height * (1 - K) / 2;
        draw();
    })

    $("#shift_l").on("click", function () {
        shift_x -= 50;
        draw();
    })

    $("#shift_r").on("click", function () {
        shift_x += 50;
        if (shift_x > 0)
            shift_x = 0;
        draw();
    })

    $("#shift_u").on("click", function () {
        shift_y -= 50;
        draw();
    })

    $("#shift_d").on("click", function () {
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
        //auto_scale();
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
    if (!path) {
        scale = canvas.width / img[1].width;
    } else {
        var p1 = { x: path[0].x, y: path[0].y };
        var p2 = { x: path[0].x, y: path[0].y };

        for (var i = 0; i < path.length; i++) {
            var p = path[i];
            if (p1.x > p.x) p1.x = p.x;
            if (p1.y > p.y) p1.y = p.y;
            if (p2.x < p.x) p2.x = p.x;
            if (p2.y < p.y) p2.y = p.y;
        }
        p1.x -= 50;
        p2.x += 50;
        p1.y -= 50;

        scale = canvas.width / (p2.x - p1.x);

        //shift_x = -p1.x * scale;
        //shift_y = -p1.y * scale;

    }

}



