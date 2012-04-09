var arraydb = {
    push: function(key, val){
	if(!localStorage.length) return;
	
	var arr = localStorage[key].split(",");
	arr.push(val);
	localStorage[key] = arr;
    },
    get: function(key){
	return localStorage[key];
    },
    del: function(key, val){
	if(localStorage[key] == undefined) return;
	var arr = localStorage[key].split(",");	
	for(var i = 0; i < arr.length; i++){
	    if(val === arr[i]) delete arr[i];
	}
	for(var k = 0; k < arr.length; k++){
	    if(arr[k] === "") delete arr[k];
	}
	localStorage[key] = arr;
    },
    //return char -> Array
    parse: function(key){
	var arr = localStorage[key].split(",");
	return arr;
    },
    rmall: function(){
	for(var i in localStorage) {
	    delete localStorage[i];
	}
	console.info(localStorage);
    }
};
