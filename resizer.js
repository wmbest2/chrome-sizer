// Connects up a message listener when the page loads
// This will receive the port.postMessage() from the extension


jQuery(document).ready(function() {

console.log("init");

var port = chrome.extension.connect();
 
chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(data) {
    console.log("data passed");
  console.log(data);
  chrome.windows.getLastFocused(function(w){console.log(w);chrome.windows.update(w.id, {width:data.width,height:data.height})});
  });
});

console.log("init toolstrip");
jQuery('.options').hide();
	jQuery('.toolstrip-button').click(function() { 
	
	chrome.toolstrip.expand({height:300});
	jQuery('.options').show();
		
	});

	jQuery('.ext').bind("mouseleave", function() {
		chrome.toolstrip.collapse();
		jQuery('.options').hide();
	});


	console.log("Listener connected");
});