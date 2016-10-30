function Dialog() {
    $("#goButton").on("click", function () {
        var fromKey = $("#from").val();
        var toKey = $("#to").val();
        var way = graph.dijkstra(fromKey, toKey).reverse();
        track = new Track(fromKey, toKey, way);
        scaleForTrack(track.startPoint);
        set_current_point(track.startPoint);
    });


    $("#from").on("tap", makeListOfLabels).on("input", autocomplete);
    $("#to").on("tap", makeListOfLabels).on("input", autocomplete);


    function makeListOfLabels(event) {
        $list = $('#ul-keys');
        $list.css('top', -$("#dialog").offset().top + 5);
        $list.css('height', $(window).height() - 10);

        var el = event.target;
        // fill list of keys
        $list.html("");
        for (var i in graph.labels) {
            var $li = $("<div class='li-key'>" + graph.labels[i] + "</div>");
            $li.on("click", function (ev) {
                $(el).val($(this).text());
                $list.css('visibility', 'hidden');
                el.focus();
            });
            $list.append($li);
        }

        $list.css('visibility', 'visible');
    }

    function autocomplete(event) {
        $el = $(this);

        var text = this.value.slice(0, this.selectionStart);
        if (text === "") {
            $el.val("");
            return;
        }
        var label = graph.labels.find(function (k) { return k.startsWith(text) });
        if (label) {
            $el.val(label);
            $el[0].selectionStart = $el[0].selectionEnd = text.length;
        } else {
            $el.val($el.val().slice(0, $el[0].selectionStart - 1));
            $el.animate({ opacity: 0 }, 200, function () { $el.animate({ opacity: 1 }, 200); });
        }

    }

    function scaleForTrack(p) {
        //scale = 1;
        shift_x = -p.x * scale + screen.width / 2;
        shift_y = -p.y * scale + screen.height / 2;
    }


}