$(document).ready(
    function(){		      
	//initialize		  
	//localStorageからフォームに並べる作業が必要

	var bg = chrome.extension.getBackgroundPage();
	if(localStorage.keyword){
	    var initArr = arraydb.parse("keyword");
	    for(var i = 0; i < initArr.length; i++){
		$("#formDomain").append(
		    $("<option>")
		    .html(initArr[i])
		    .val(initArr[i])
		);
	    }
	}
	//alert some message
	/*
	var alertmsg = function(elm){
	    switch(elm){
	    case blankAlert:
		$("#blankAlert").text("write Domain");
		break;
	    case alert_start:
		$("#alert_end").text("start!").;
		break;
	    case alert_end:
		$("#alert_end").text("End!").css("color", "red");
		break;
	    }	    
	};*/
	var alertmsg = function(elm, text){
		$(elm).text(text).css("color", "red");
	};


	$("#add").on("click",
			function(){
			    var form = $("#form").first().val();
			    
			    if(!form) alertmsg();

			    if(!localStorage.length){			
				bg.keyword.push(form);
				var keyword = bg.keyword.toString();
				localStorage["keyword"] = keyword;
			    }else{
				arraydb.push("keyword", form);				
			    }
			    $("#formDomain").append(
				$("<option>")
				.html(form)
				.val(form)
			    );
			    $("#form").val("");
			});

	$("#delButton").on("click",
	    function(){
		var delkey = $("#formDomain option:selected").val();
		if(!delkey) alertmsg(del);
		var str = localStorage["keyword"].split(",");
		arraydb.del("keyword", delkey);
		$("#formDomain option:selected").remove();
		       }
	);
	
	$("#startButton").on("click",
	    function(){		
		var hour = parseInt($("#hour").val()) * bg.TIME.HOUR;
		if(isNaN(hour)) hour = 0;
		var min = parseInt($("#min").val()) * bg.TIME.MIN;
		if(isNaN(min)) min = 0;

		var period = hour + min;
		alertmsg("#alert_start", "start!");
		chrome.extension.sendRequest(period);
		$("#hour").val("");
		$("#min").val("");
	    }
	);
});



