// JavaScript source code

$(function () {
    var imgSrcList = JSON.parse(localStorage.getItem('imgSrcList'));
    $('#numPics').text(imgSrcList.length);
    imgSrcList.forEach(function(imgSrc) {
        var imgDiv = $('<div></div>').addClass('imgControl');
        $('<input />', { type: 'submit', value: 'download' })
            .addClass('btnDownload')
            .click(function() {
                var downloadName = imgSrc.substr(imgSrc.length - 16) + '.jpeg';
                var link = document.createElement('a');
                link.download = downloadName;
                link.href = imgSrc;
                link.click();
                link.remove();
            })
            .appendTo(imgDiv);
        $('<img></img>', { src: imgSrc })
            .appendTo(imgDiv);
        imgDiv.appendTo('#imgSrcList');
    });
    localStorage.clear();
});
