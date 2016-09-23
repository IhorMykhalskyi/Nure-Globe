﻿var SCALE_PER_STEP = Math.pow(2, 1 / 30);
var OFFSET_PER_STEP = 10;
var shift_anime_timer = null;

function stop_shift_anime() {
    if (shift_anime_timer) {
        clearInterval(shift_anime_timer);
        shift_anime_timer = null;
    }
}

function shift_anime(dx, dy) {
    var STEP_COUNT = 50;
    var t = 0;
    if (!shift_anime_timer) {
        shift_anime_timer = setInterval(function () {
            //  
            shift_x += dx;
            shift_y += dy;
            //
            draw();
            t++;
            if (t >= STEP_COUNT) {
                clearInterval(shift_anime_timer);
                shift_anime_timer = null;
            }
        }, 20);
    }
}

function scale_anime(k) {
    var STEP_COUNT = 15;
    var t = 0;
    var timer = setInterval(function () {
        //
        scale *= k;
        shift_x = shift_x * k - canvas.width / 2 * (k - 1);
        shift_y = shift_y * k - canvas.height / 2 * (k - 1);
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
        }
    }, 20);
}

function step_anime(p1, p2) {
    var STEP_COUNT = 10;
    var dx = (p2.x - p1.x) / STEP_COUNT;
    var dy = (p2.y - p1.y) / STEP_COUNT;
    var t = 0;
    var timer = setInterval(function () {
        //
        man.x += dx;
        man.y += dy;
        //
        auto_shift();

        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
            man.i = 0;
            draw();
        }
    }, 50);
    
}


function ladder_anime(p1, p2) {
    var ladderNo = p1.key[2], dx, dy;
    switch (ladderNo) {
        case "1": dx = 0; dy = 2; break;
        case "2": dx = 2; dy = 0; break;
        case "3": dx = -2; dy = 0; break;
    }
    var STEP_COUNT = 20;
    var t = 0;
    var timer = setInterval(function () {
        //
        if (t < STEP_COUNT / 2) {
            man.x += dx;
            man.y += dy;
        } else {
            man.x -= dx;
            man.y -= dy;
        }
        //
        draw();
        t++;
        if (t >= STEP_COUNT) {
            clearInterval(timer);
            set_current_point(p2);
        }
    }, 20);
    
}

