chrome.runtime.sendMessage({ action: "show" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == 'jump') {
      //url = document.location.href;
      var imgSrcList = [];
      $('* img').each(function() {
          imgSrcList.push($(this).attr('src'));
      });
      sendResponse(imgSrcList);
  }
});

