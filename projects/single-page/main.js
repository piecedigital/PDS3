$(document).ready(function() {
	//aquire search query, if it exist, and asign it to the variable "pageQuery"
	var pageQuery;
	if( window.location.search ) {
		pageQuery = window.location.search.split("=").pop();
		if(pageQuery === "home" || pageQuery === "about" || pageQuery === "contact") {
			pageLoader(pageQuery);
		} else {
			pageLoader("home");
		}
	} else {
		pageLoader("home");
	}
	//nav clicks
	$(".nav-li").on("click", function() {
		var data = $(this).data("href");
		pageLoader(data);
	});
	//ajax page loading functions
	function pageLoader(page) {
		$.ajax({
		  url: "./" + page + ".html",
		  success: function(data){
		  	$("#page-data").html();
		  	$("#page-data").html(data);
		  	window.history.replaceState({}, page, "index.html?page="+ page )
			}
		});
	}
	//mo-nav clicks
	$(".mo-nav").on("click", function() {
		if( $(this).hasClass("closed") ) {
			Open( $(this) );
		} else {
			Close( $(this) );
		}
	});
	$(".nav-li").on("click", function() {
		Close( $(".mo-nav") );
	});
	function Open(given) {
		//remove animation class
		given.find(".tick-1").removeClass("tick1-animC");
		given.find(".tick-2").removeClass("tick2-animC");
		given.find(".tick-3").removeClass("tick3-animC");
		//add animations class
		given.find(".tick-1").addClass("tick1-anim");
		given.find(".tick-2").addClass("tick2-anim");
		given.find(".tick-3").addClass("tick3-anim");
		//replace this class
		given.removeClass("closed");
		given.addClass("opened");
		//open nav
		$(".nav").css({"height": "102px"});
	}
	function Close(given) {
	//remove animation class
		given.find(".tick-1").removeClass("tick1-anim");
		given.find(".tick-2").removeClass("tick2-anim");
		given.find(".tick-3").removeClass("tick3-anim");
		//add animations class
		given.find(".tick-1").addClass("tick1-animC");
		given.find(".tick-2").addClass("tick2-animC");
		given.find(".tick-3").addClass("tick3-animC");
		//replace this class
		given.removeClass("opened");
		given.addClass("closed");
		//close nav
		$(".nav").css({"height": "0"});
	}
	//end document ready
});