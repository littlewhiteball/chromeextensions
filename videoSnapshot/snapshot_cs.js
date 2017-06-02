chrome.runtime.sendMessage({ action: "show" });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == 'jump') {
      var url = document.location.href;
      var videoHost = window.location.host;

      switch (videoHost) {
          //TODO: Extract method
          case 'www.youtube.com':
              var videoHostId = getQueryStringParameterByName('v', url);
              var videoDiv = $($('.html5-video-container')[0]);
              var video = $(videoDiv.find('video')[0]);
              var videoUrl = video.attr('src');
              videoUrl = 'blob:https://www.youtube.com/092a85db-062f-4a30-89e1-1dbd45a71513';
              var xhr = new XMLHttpRequest;
              xhr.responseType = 'blob';
              xhr.onload = function() {
                  var recoveredBlob = xhr.response;
                  var reader = new FileReader;
                  reader.onload = function() {
                      var blobAsDataUrl = reader.result;
                      window.location = blobAsDataUrl;
                  }
                  reader.readAsDataURL(recoveredBlob);
              };
              xhr.open('GET', videoUrl);
              xhr.send();
              $.get(videoUrl, function(response) {
                  alert(response);
              });
              break;
          case 'www.pornhub.com':
              var videoHostId = getQueryStringParameterByName('viewkey', url);
              var videoDiv = $($('.mhp1138_videoWrapper')[0]);
              var video = $(videoDiv.find('video')[0]);
              var videoSrc = video.find('source').attr('src');
              break;
          case 'default':
              alert('Host {0} not supported'.format(videoHost));
              break;
      }

      var response = {
          'videoSrc': videoSrc,
          'videoHost': videoHost,
          'videoHostId': videoHostId
      };

      sendResponse(response);
  }
});


function getQueryStringParameterByName(name, url) {
    if (!url)
    {
        return '';
    }

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);

    if (!results)
    {
        return null;
    }

    if (!results[2])
    {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

