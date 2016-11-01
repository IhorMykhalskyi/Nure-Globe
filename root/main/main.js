// inintial settings -----------

$(function () {

    // location
    var ww = $(window).width(), wh = $(window).height(), h = 46;
    $("#canvas-panel").css('width', ww).css('height', wh - h);
    $("#menu-panel").css('width', ww).css('height', h).css('top', wh - h);

    // load background images (index starts from 1)
    imgs = {};
    for (var i = 1; i <= imgs_count; ++i) {
        imgs[i] = new Image();
        imgs[i].src = 'floors/' + i + '.svg';
    }

    // when first floor is load all is ready
    imgs[1].onload = function () {
        MAP_HEIGHT = imgs[1].height;
        MAP_WIDTH = imgs[1].width;

        // set the canvas size like the map size
        $("#canvas1").attr("width", MAP_WIDTH).attr("height", MAP_HEIGHT);
        canvas = $("#canvas1")[0];

        //
        set_current_point(graph.points["ВХОД"]);
        draw();
    };


    //---------------- settings event handlers --------------------------

    // scaling

    $("#scale-inc").on("click", function () {
        scale *= 1.1;
        canvas.width = MAP_WIDTH * scale;
        canvas.height = MAP_HEIGHT * scale;      
        draw();
    })

    $("#scale-dec").on("click", function () {
        scale /= 1.1;
        canvas.width = MAP_WIDTH * scale;
        canvas.height = MAP_HEIGHT * scale;
        draw();
    })

    //
    new Dashboard();
});


function set_current_point(p) {
    current_point = p;
    man.setToPoint(p);
    draw();
}

// drawing -------------------------

function draw()
{
    ctx = canvas.getContext("2d");
    // background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle="#cccccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // transform
    ctx.save();
    ctx.scale(scale, scale);


    var bg = current_point.z;
    ctx.drawImage(imgs[bg], 0, 0);

    // draw track
    if (track) {
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 2;
        track.draw(ctx);
        man.doStep()
    }
    // draw man or ladder
    if (man.ladder) {
        ctx.drawImage(man.ladder, man.x, man.y, 60, 40);
    }
    else
    {
        man.draw(ctx);
    }

    ctx.restore();

    // draw number of the floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.font = "72px arial";
    ctx.fillText(current_point.z + " этаж", 50, canvas.height - 50);

}

function centering(p) {
    $('#canvas-panel').scrollLeft(p.x * scale - screen.width / 2);
    $('#canvas-panel').scrollTop(p.y * scale - screen.height / 2);
}



