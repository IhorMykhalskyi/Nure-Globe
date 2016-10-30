// inintial settings -----------

$(function () {

    // set canvas size accorging to screen size
    $("#canvas1").attr("width", $(window).width())
                 .attr("height", $(window).height());               

    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");

    // load background images (index starts from 1)
    imgs = {};
    for (var i = 1; i <= imgs_count; ++i) {
        imgs[i] = new Image();
        imgs[i].src = 'floors/' + i + '.svg';
    }

    // load floors
    imgs[1].onload = function () {
        MAP_HEIGHT = imgs[1].height;
        MAP_WIDTH = imgs[1].width;

        // show dialog at start
        set_current_point(graph.points["ВХОД"]);
        $("#request").click();
    };
   
    //---------------- settings event handlers --------------------------

    // scaling

    $("#scale-inc").on("click", function () {
        scale_anime(SCALE_PER_STEP);
    })

    $("#scale-dec").on("click", function () {
        scale_anime(1 / SCALE_PER_STEP);
    })

    $("#request").on("click", function () {
        // set dialog position
        //$("#dialog-popup").css('top', $(window).height() - $("#dialog-popup").height());
        $("#from").val(current_point.key);
    })

    // scrolling

    $(canvas).on('swipeup', function (event) {
        if ((-shift_y + canvas.height) / scale < MAP_HEIGHT) {
            shift_anime(0, -OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipedown', function (event) {
        if (shift_y / scale < 0) {
            shift_anime(0, OFFSET_PER_STEP);
        }
    });

    $(canvas).on('swipeleft', function (event) {
        if ((-shift_x + canvas.width) / scale < MAP_WIDTH) {
            shift_anime(-OFFSET_PER_STEP, 0);
        }
    });

    $(canvas).on('swiperight', function (event) {
        if (shift_x / scale < 0) {
            shift_anime(OFFSET_PER_STEP, 0);
        }
    });

    $(canvas).on('tap', function (event) {
        if (shift_anime_timer) {
            stop_shift_anime();
            return;
        }

        var x = (event.clientX - shift_x) / scale;
        var y = (event.clientY - shift_y) / scale;

        if (man.isNear(x, y)) {
            track.stepForward();
        } else {
            var nearestPoint = graph.findNearestPoint(x, y, current_point.z);
            set_current_point(nearestPoint);
        }
            
    });

    $(canvas).on('taphold', function (event) {
        stop_shift_anime();
    });
    
    // set dialog's event hadlers
    new Dialog();
});


function set_current_point(p) {
    current_point = p;
    man.setToPoint(p);
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
        track.draw(ctx);
        man.doStep()
    }
    man.draw(ctx);
    ctx.restore();

    // floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.font = "72px arial";
    ctx.fillText(current_point.z + " этаж", 50, canvas.height - 50);

}




