function drawAllPathsTest(ctx) {

    for (var from in graph.points)
    {
        for (var to in graph.points)
        {
            var way = graph.dijkstra(from, to).reverse();
            track = new Track(from, to, way);
            track.draw(ctx);
        }
    }
    //graph.points.forEach(function (from, w, q) {
    //    graph.points.forEach(function (to, e, r) {
    //        var way = graph.dijkstra(from, to).reverse();
    //        track = new Track(from, to, way);
    //        track.draw(ctx)
    //    });
    //});
   
                
}