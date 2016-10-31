﻿// inintial settings -----------

var MENU_PANEL_HEIGHT = 46;
var VIEW_WIDTH = $(window).width();
var VIEW_HEIGHT = $(window).height() - MENU_PANEL_HEIGHT;


$(function () {

    // layout
    $("#canvas-panel").css('width', VIEW_WIDTH).css('height', VIEW_HEIGHT);
    $("#menu-panel").css('width', VIEW_WIDTH).css('height', MENU_PANEL_HEIGHT).css('top', VIEW_HEIGHT);



    // load background images (index starts from 1)
    imgs = {};
    for (var i = 1; i <= imgs_count; ++i) {
        imgs[i] = new Image();
        imgs[i].src = 'floors/' + i + '.svg';
    }


    // all are ready - can start
    imgs[1].onload = function () {
        MAP_HEIGHT = imgs[1].height;
        MAP_WIDTH = imgs[1].width;

        // set canvas size accorging to map size
        $("#canvas1").attr("width", MAP_WIDTH).attr("height", MAP_HEIGHT);
        canvas = $("#canvas1")[0];

        // show map at start
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
    ctx.fillText(current_point.z + " этаж", 50, VIEW_HEIGHT - 50);
    ctx.fillText(current_point.z + " этаж", 50 + VIEW_WIDTH, VIEW_HEIGHT - 50);
    ctx.fillText(current_point.z + " этаж", 50 + VIEW_WIDTH + VIEW_WIDTH, VIEW_HEIGHT - 50);

}

function centering(p) {
    $('#canvas-panel').scrollLeft(p.x * scale - screen.width / 2);
    $('#canvas-panel').scrollTop(p.y * scale - screen.height / 2);
}



