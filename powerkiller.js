window.onload = function() {
  
  document.getElementById('appcontent').style.width = window.innerWidth + 'px';
  document.getElementById('appcontent').style.height = (window.innerHeight - 50) + 'px';
  
  var appContentTopInt = parseInt(document.getElementById('appcontent').style.top, 10);
  var appContentHeightInt = parseInt(document.getElementById('appcontent').style.height, 10);
  var titlebarWidthInt = parseInt(document.getElementById('windowbar').style.width, 10);
  
  document.getElementById('power1').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('power1').style.left = document.getElementById('appcontent').style.left;
  
  document.getElementById('power2').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('power2').style.left = document.getElementById('appcontent').style.left;
  
  document.getElementById('powerEnd').style.width = document.getElementById('appcontent').style.width;
  document.getElementById('powerEnd').style.left = document.getElementById('appcontent').style.left;
  document.getElementById('powerEnd').style.top = Math.floor(appContentHeightInt - 50) + 'px';
  
  if (chrome.experimental == undefined) {
    document.body.style.backgroundImage = 'url("BeachWallpaper.png")';
  }
  
  document.getElementById('power1').onclick = function() { chrome.power.requestKeepAwake("system"); }
  
  document.getElementById('power1').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "System kept awake",
      message: "To revert the system back to normal behavior, click the Cancel button",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("systemPowKeptAwake", opt, function(id) {
      id = "systemPowKeptAwake";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('power2').onclick = function() { chrome.power.requestKeepAwake("display"); }
  
  document.getElementById('power2').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "Display kept awake",
      message: "To revert the display and system back to normal behavior, click the Cancel button",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("displayPowKeptAwake", opt, function (id) {
      id = "displayPowKeptAwake";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('powerEnd').onclick = function() { chrome.power.releaseKeepAwake(); }
  
  document.getElementById('powerEnd').addEventListener("click", function(opt) {
    
    opt = {
      type: "basic",
      title: "Back to normal",
      message: "System has been reverted back to normal behavior",
      iconUrl: "icon_128.png"
    }
    
    chrome.notifications.create("backToNormal", opt, function(id) {
      id = "backToNormal";
      console.log(id + " event fired.");
    });
    
  });
  
  document.getElementById('windowbar').style.width = window.innerWidth + 'px';
  
  document.getElementById('minimize').onclick = function() { chrome.app.window.current().minimize(); }
  
  document.getElementById('maximize').onclick = function() {
    
    var b = chrome.app.window.current().getBounds();
    
    if (b.width != screen.availWidth && b.height != screen.availHeight) {
      
      chrome.app.window.current().setBounds({left: 0, top: 0, width: screen.availWidth, height: screen.availHeight});
      document.getElementById('windowbar').style.webkitAppRegion = "no-drag";
      
    } else {
      
      var screenWidth = screen.availWidth;
      var screenHeight = screen.availHeight;
      
      var width = Math.floor(screenWidth/4);
      var height = Math.floor(screenHeight*(4/5));
      
      var left = Math.floor((screenWidth-width)/2);
      var top = Math.floor((screenHeight-height)/2);
      
      chrome.app.window.current().setBounds({left: left, top: top, width: width, height: height});
      document.getElementById('windowbar').style.webkitAppRegion = "drag";
      
    }
    
  }
  
  document.getElementById('close').onclick = function() { chrome.app.window.current().close(); }
  
  chrome.app.window.current().onBoundsChanged.addListener(function() {
    
    //Re-draw inner elements when the window size changes
    
    var cb = chrome.app.window.current().getBounds();
    
    var appcontwidth = parseInt(document.getElementById('appcontent').style.width, 10);
    var appcontheight = parseInt(document.getElementById('appcontent').style.height, 10);
    
    document.getElementById('windowbar').style.width = cb.width + 'px';
    
    document.getElementById('appcontent').style.left = Math.floor((cb.width - appcontwidth)/2) + 'px';
    document.getElementById('appcontent').style.top = Math.floor((cb.height - appcontheight + 50)/2) + 'px';
      
  });
  
}