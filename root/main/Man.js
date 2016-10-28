function Man(x, y, z, points)
{
    var MAN_HEIGHT = 10;
    var MAN_WIDTH = 4;
    var imgIndex = 0;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.imgs = [];
    for (var i = 0; i < 2; ++i) {
        this.imgs[i] = new Image();
        this.imgs[i].src = 'pic/man' + (i + 1) + '.png';
    }



    this.doStep = function (ctx) {
        imgIndex = (imgIndex + 1) % 2;
    }

    this.draw = function (ctx) {
        ctx.drawImage(this.imgs[imgIndex], this.x, this.y, MAN_WIDTH, MAN_HEIGHT);
    }


    this.isNear = function (x, y) {
        var dx = x - scale * MAN_WIDTH / 2 - man.x;
        var dy = y - scale * MAN_HEIGHT / 2 - man.y;
        return dx * dx + dy * dy < 400;
    }

    this.setToPoint = function (p) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
    }

}

