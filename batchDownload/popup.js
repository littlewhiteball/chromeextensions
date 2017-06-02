// JavaScript source code
$(function () {
    $('#jump').click(function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "jump" }, function(obj) {
                localStorage.setItem('imgSrcList', JSON.stringify(obj));
                chrome.tabs.create({ url: 'background.html' });
            });
        });
    });
});

