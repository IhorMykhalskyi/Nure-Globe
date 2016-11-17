// inintial settings -----------

var MENU_PANEL_HEIGHT = 46;
var VIEW_WIDTH = $(window).width();
var VIEW_HEIGHT = $(window).height() - MENU_PANEL_HEIGHT;


$(function () {

    // layout
    $("#canvas-panel").css('width', VIEW_WIDTH).css('height', VIEW_HEIGHT);
    $("#dashboard").css('width', VIEW_WIDTH).css('height', MENU_PANEL_HEIGHT).css('top', VIEW_HEIGHT);



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
        man.setToPoint(graph.points["ВХОД"]);
        draw();
    };
    centering(man);

    //
    new Dashboard();
});


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


    var bg = man.z;
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
        ctx.drawImage(man.ladder, man.ladder_x, man.ladder_y, man.ladder_size, man.ladder_size);
    }
    else
    {
        man.draw(ctx);
    }

    ctx.restore();

    // draw number of the floor
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.font = "72px arial";
    ctx.fillText(man.z + " этаж", 50, VIEW_HEIGHT - 50);
    ctx.fillText(man.z + " этаж", 50 + VIEW_WIDTH, VIEW_HEIGHT - 50);
    ctx.fillText(man.z + " этаж", 50 + VIEW_WIDTH + VIEW_WIDTH, VIEW_HEIGHT - 50);

}


function centering(p) {
    $('#canvas-panel').scrollLeft(p.x * scale - screen.width / 2);
    $('#canvas-panel').scrollTop(p.y * scale - screen.height / 2);
}



