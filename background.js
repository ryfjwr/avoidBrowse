var keyword = [];
//domain keyword

const TIME = {    
    HOUR: 1000 * 60 * 60,
    MIN:  1000 * 60,
    SEC:  1000
};
/*
var RestOfTime = function(){
    
};*/


var avoidTab = function(timeOut,  tabId){
    var interval = 1000;    
    setTimeout((function(){
		    console.info("start");
		    timeOut = timeOut - interval;
		    return function timerFunc(){
			console.info("into timer");
			chrome.tabs.remove(tabId, {url:"http://localhost/"});
			
			if(!timeOut){
			    console.info("limit over");
			    return;
			}
			setTimeout(timerFunc, interval);
		    }
		})(), interval);
};

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse){
	if(typeof request !== "number")  request = parseInt(request);
	var period = request;
	//count request from popup startbutton
	var count = 0;
	
	chrome.tabs.onCreated.addListener(
	    function(tab){
		var url = tab.url;
		var id = tab.id;
		var list = localStorage["keyword"].split(",");
		count++;

  		if(!list) return;
		
		for(var i = 0; i < list.length; i++){
		    var regEx = new RegExp("^http(s)?:\\/\\/(" + list[i] +")+\\/[a-z]*", "i");
		    if(regEx.test(url)){
			console.info("regEx");
			avoidTab(period, id);
		    }
		}
	    });
    }
);

