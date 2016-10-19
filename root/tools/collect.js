// 0) задать рисунок(IMG_SRC) и этаж (Z)
// 1) нарисовать на схеме линии маршрутов
// 2) на плане пронаименовать все аудитории и перекрестки (включая лестницы)
// 3) проставить точки для аудиторий и перекрестков на линиях маршрутов
// 4) вручную скопировать словарь из текстового поля в файл dots.js  ("var dots = словарь")
// 5) создать список сегментов (аудитория, перекресток)

var IMG_SRC = "floors/3.svg";
var Z = 3;


var ctx, canvas;
var img;
var shift_x = 0, shift_y = 0, scale = 2.0; // transformation
var dragmode = 0; // 0 - normal, 1 - dgagging, 2 - dragged

$(function () {
    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");
    img = new Image();
    img.src = IMG_SRC;

    ///////////////////////////////////////////
    $("#ruler_x").val("200");
    $("#ruler_y").val("200");
    ///////////////////////////////////////////


    img.onload = function () {
        draw();
        show_dots();
    };


    canvas.onmouseup = function (e) {
        var key = $("#key").val().trim();
        if (key != "") // no key
        {
            var offset = $("canvas").offset();
            var x = ((e.x - shift_x - offset.left + scrollX) / scale) | 0;
            var y = ((e.y - shift_y - offset.top + scrollY) / scale) | 0;

            // ajust point
            var rx = +$("#ruler_x").val();
            var ry = +$("#ruler_y").val();
            x = rx || x;
            y = ry || y;

            // add a point
            dots[key] = [x, y, Z];           

            // redraw
            //$("#key").val("");  // uncomment to clear the textbox
            $("#key")[0].focus();
            draw();
            show_dots()
        }
    }


    canvas.onmousemove = function (e)
    {
        var offset = $("canvas").offset();
        var x = ((e.x - shift_x - offset.left + scrollX) / scale) | 0;
        var y = ((e.y - shift_y - offset.top + scrollY) / scale) | 0;

        $("#coords").text("x:" + x + " y:" + y);

        // show selected key
        var keys = "";
        for (var key in dots) {
            if (near(dots[key], [x, y, Z], DOT_SIZE))
                keys += key + " ";
        }           
        $("#selected_key").text(keys);        
    }

    $("#save").on("click", function () {
        var s = $("#result").val();
        if (s) {
            dots = JSON.parse(s);
            draw();
        }
    });

    $("#draw_lines").on("click", draw_lines);


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
    $("#result").val(s);
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
    ctx.strokeStyle = "blue";
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


function draw_lines() 
{
    ctx.save();
    ctx.translate(shift_x, shift_y);
    ctx.scale(scale, scale);

    ctx.strokeStyle = "blue";
    ctx.beginPath();

    for(var i = 0; i < lines.length; i++) 
    {
        var keys = lines[i].split(' ');
        for(var j = 1; j < keys.length; j++)
        {
            var k1 = keys[j - 1], k2 = keys[j];
            if (dots[k1] && dots[k2]) {
                ctx.moveTo(dots[k1][0], dots[k1][1]);
                ctx.lineTo(dots[k2][0], dots[k2][1]);
            }
            else {
                if (!dots[k1])
                    console.log('Wrong key: ' + k1);
                if (!dots[k2])
                    console.log('Wrong key: ' + k2);
            }
        }
    }
    ctx.stroke();

    ctx.restore();

}