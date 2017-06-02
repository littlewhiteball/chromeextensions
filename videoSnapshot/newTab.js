$(function() {
    var videoSrc = JSON.parse(localStorage.getItem('videoSrc'));
    localStorage.clear();

    var snapMinSecond = 1;
    var snapMaxSecond = 9000000000;
    var lastSecond = -1;
    var positionPredictionServer = $('input[name="predictionServer"]:checked').val();
    $('input[name="predictionServer"]').change(function() {
        positionPredictionServer = $(this).val();
    });
    var categoryListUrl = "category/";

    var video = document.getElementById('video');
    $('#videoSource').attr('src', videoSrc['videoSrc']).attr('type', 'video/mp4');
    video.load();
    video.addEventListener('timeupdate', function() {
        var currentSecond = Math.floor(video.currentTime);
        if (currentSecond != lastSecond && currentSecond >= snapMinSecond && currentSecond <= snapMaxSecond) {
            lastSecond = currentSecond;
            snap(currentSecond);
        }
    }, false);

    $('#playBtn').click(function() {
        video.play();
    });

    $('#pauseBtn').click(function() {
        video.pause();
    });

    $('#snapBtn').click(function() {
       snap(Math.floor(video.currentTime));
    });

    function snap(currentSecond) {
        video.pause();
        var forceUpdate = $('#forceUpdateCheckbox').prop('checked');
        var canvas = document.getElementById('canvas');
        w = 300;
        h = 150;
        canvas.width = w;
        canvas.height = h;
        var context = canvas.getContext('2d');
        context.fillRect(0, 0, w, h);
        context.drawImage(video, 0, 0, w, h);
        var imgUrl = canvas.toDataURL('image/jpeg');
        $('#image').attr('src', imgUrl);

        var downloadName = "download" + currentSecond + ".jpg";
        //download(downloadName, imgUrl);

        $.post(
            //positionPredictionServer + categoryListUrl,
            positionPredictionServer + categoryListUrl,
            {
                forceUpdate: forceUpdate,
                imageUrl: imgUrl,
                videoHost: videoSrc['videoHost'],
                videoHostId: videoSrc['videoHostId'],
                videoTimeInSecond: currentSecond
            }
        ).done(function (json) {
            var position = json.positions[0];
            var confidence = json.confidences[0];
            $('#predictionSpan').text(position + ',' + confidence);
            video.play();
            //video.currentTime = video.currentTime + 1;
        });
    }

    function download(name, url) {
        var link = document.createElement('a');
        link.download = name;
        link.href = url;
        link.click();
        link.remove();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});

