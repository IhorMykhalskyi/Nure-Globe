// 0) задать рисунок(IMG_SRC) и этаж (Z)
// 1) нарисовать на схеме линии маршрутов
// 2) на плане пронаименовать все аудитории и перекрестки (включая лестницы)
// 3) проставить точки для аудиторий и перекрестков на линиях маршрутов
// 4) вручную скопировать словарь из текстового поля в файл dots.js  ("var dots = словарь")
// 5) создать список сегментов (аудитория, перекресток)

var IMG_SRC = "floors/draft1.svg";
var Z = 1;

var ctx, canvas;
var img;
var shift_x = 0, shift_y = 0, scale = 1.0; // transformation
var dragmode = 0; // 0 - normal, 1 - dgagging, 2 - dragged

$(function () {
    canvas = document.getElementById("canvas1");
    var btnSave = document.getElementById("save");
    ctx = canvas.getContext("2d");
    img = new Image();
    img.src = IMG_SRC;


    img.onload = function () {
        draw();
        show_dots();
    };


    canvas.onmouseup = function (e) {
        var key = $("#key").val().trim();
        if (key != "") // no key
        {
            // add a point
            var x = ((e.x - shift_x - canvas.offsetLeft + scrollX) / scale) | 0;
            var y = ((e.y - shift_y - canvas.offsetTop + scrollY) / scale) | 0;

            // ajust point
            var rx = +$("#ruler_x").val();
            var ry = +$("#ruler_y").val();
            x = rx || x;
            y = ry || y;

            dots[key] = [x, y, Z];           

            // redraw
            key = "";
            $("#key")[0].focus();
            draw();
            show_dots()
        }
    }


    canvas.onmousemove = function (e) {
        var x = ((e.x - shift_x - canvas.offsetLeft + scrollX) / scale) | 0;
        var y = ((e.y - shift_y - canvas.offsetTop + scrollY) / scale) | 0;
           
        $("#coords").text("x:" + x + " y:" + y);

        // show selected key
        var keys = "";
        for (var key in dots) {
            if (near(dots[key], [x, y, Z], DOT_SIZE))
                keys += key + " ";
        }           
        $("#selected_key").text(keys);        
    }


    btnSave.onclick = function () {
        var s = $("#result").val();
        if (s) {
            dots = JSON.parse(s);
            draw();
        }
    }

    $("#scale_inc").on("click", function () {
        scale *= Math.sqrt(2);
        draw();
    })

    $("#scale_dec").on("click", function () {
        scale /= Math.sqrt(2);
        draw();
    })

    $("#shift_l").on("click", function () {
        shift_x -= 50;
        draw();
    })

    $("#shift_r").on("click", function () {
        shift_x += 50;
        draw();
    })

    $("#shift_u").on("click", function () {
        shift_y -= 50;
        draw();
    })

    $("#shift_d").on("click", function () {
        shift_y += 50;
        draw();
    })

    $("#ruler_x").on("blur", function () {
        $("#ruler_y").val("");
        draw();
    });

    $("#ruler_y").on("blur", function () {
        $("#ruler_x").val("");
        draw();
    });

});

function near(a, b, d) {
    var dx = a[0] - b[0], dy = a[1] - b[1];
    return dx * dx + dy * dy <= d * d;
}


function show_dots() {
    var s = JSON.stringify(dots);
    s = s.replace(/\],/g, "\],\n");
    document.getElementById("result").innerHTML = s;
}

var DOT_SIZE = 2;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(shift_x, shift_y);
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);

    // dots
    ctx.strokeStyle = "#FF0000"
    for (var key in dots) {
        var dot = dots[key];
        ctx.strokeRect(dot[0] - 1, dot[1] - 1, DOT_SIZE, DOT_SIZE);
    }
    // rulers
    ctx.strokeStyle = "blue"
    var rx = +$("#ruler_x").val();
    var ry = +$("#ruler_y").val();
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(rx, 0);
    ctx.lineTo(rx, 10000);
    ctx.moveTo(0, ry);
    ctx.lineTo(10000, ry);

    ctx.stroke();


    ctx.restore();
}


