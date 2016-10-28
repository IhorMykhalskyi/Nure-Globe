function Man(x, y, z, points) {
    this.x = x;
    this.y = y;
    this.z = z;
    for (var i = 0; i < 2; ++i) {
        this.imgs[i] = new Image();
        this.imgs[i].src = 'pic/man' + (i + 1) + '.png';
    }
    this.i = 0


    

}