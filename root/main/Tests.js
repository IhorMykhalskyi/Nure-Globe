function drawAllPathsTest(ctx) {
    for (var from in graph.points)
    {
        for (var to in graph.points)
        {
            try{
                var way = graph.dijkstra(from, to).reverse();
                track = new Track(from, to, way);
                track.draw(ctx);
            }
            catch(er){
                console.log(from + " " + to);
            }
        }
    }
}

function DotsDuplicationTest(){
    var p = [];
    for (var key in graph.points) {
        p.push(key);
    }
    p.sort();
    var prev;
    for (var key in p) {
        if (key == prev) {
            console.log("dup: " + key);
        }
        prev = key;
    }
}