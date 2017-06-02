// JavaScript source code
$(function () {
    var w, h, ratio, context, video, canvas;
    $('#jump').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "jump" }, function(obj) {
                localStorage.setItem('videoSrc', JSON.stringify(obj));
                chrome.tabs.create({ url: 'newTab.html' });
            });
        });
    });
});

