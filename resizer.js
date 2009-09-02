// Connects up a message listener when the page loads
// This will receive the port.postMessage() from the extension

function white_space(field)
{
     return field.replace(/^\s*|\s*$/g,'');
}

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
	jQuery('.main').click(function() { 
	
	chrome.toolstrip.expand({height:300});
	jQuery('.options').show();
	jQuery('.ext').width('200px');
		
	});

	jQuery('.size').click(function(event) { 
	console.log("size event initiated");
	console.log("size: " + white_space(jQuery(event.target).text()));
	var s = white_space(jQuery(event.target).text()).split('x');
	console.log(s);
	var h = s[1] * 1;
	var w = s[0] * 1;
	console.log( w + " by " + h);
	port.postMessage({height:h, width:w});
		
	});

	jQuery('.ext').bind("mouseleave", function() {
		chrome.toolstrip.collapse();
		jQuery('.options').hide();
		jQuery('.ext').width('100%');
		
	});


	console.log("Listener connected");
});