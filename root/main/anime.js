function Anime()
{
    var SCALE_PER_STEP = Math.pow(2, 1 / 30);
    var me = this;

    this.imgs = [];
    for (var i = 0; i < 4; ++i) {
        this.imgs[i] = new Image();
        this.imgs[i].src = 'pic/ladder' + (i + 1) + '.png';
    }

    this.step = function (p1, p2) {
        var STEP_COUNT = 10;
        var dx = (p2.x - p1.x) / STEP_COUNT;
        var dy = (p2.y - p1.y) / STEP_COUNT;
        var t = 0;
        var timer = setInterval(function () {
            //
            man.x += dx;
            man.y += dy;
            //
            centering(man);

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

    this.ladder_go_back = function (p1, p2) {
        var ladderNo = p1.key[4], dx, dy;
        switch (ladderNo) {
            case "R": dx = 2; dy = 0; break;
            case "U": dx = 0; dy = -2; break;
            case "D": dx = 0; dy = 2; break;
            case "L": dx = -2; dy = 0; break;
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

    this.ladder = function (p1, p2)
    {
        var STEP_COUNT = me.imgs.length;
        var upstear = p1.z < p2.z;
        var idx = upstear ? [0, 1, 2, 3] : [3, 2, 1, 0];
        var step = 0;
        var timer = setInterval(function () {
            if (step < STEP_COUNT) {
                man.ladder = me.imgs[idx[step]];
                man.ladder_size = 20;
                man.ladder_x = upstear ? man.x : man.x - man.ladder_size;
                man.ladder_y = upstear ? man.y - man.ladder_size : man.y;                
            }
            draw();
            step++;
            if (step >= STEP_COUNT) {
                man.x = p2.x;
                man.y = p2.y;
                man.z = p2.z;
                man.ladder = null;
                clearInterval(timer);
                draw();
            }
        }, 150);
    }

}

