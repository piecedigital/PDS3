$(document).ready(function() {

	//aquire search query, if it exist, and asign it to the variable "queryPage"
	if( window.location.search ) {
		var queryType = window.location.search.split("=").shift();
		var queryPage = window.location.search.split("=").pop();
		if(queryType === "?page") {
			pageLoader(queryPage);
			replaceState(queryPage);
		} else
		if(queryType === "?blogpost") {
			pageLoader("blogpost", "?blogpost=" + queryPage);
			replaceState("blogpost", "?blogpost=" + queryPage);
		}
	} else {
		pageLoader("home");
		replaceState("home");
	};

	//nav clicks
	$(".a-tag").on("click", function() {
		if( $(this).data("href") ) {
			var data = $(this).data("href");
			console.log("link had: " + data);
			console.log(typeof data);
			pageLoader(data);
			pushState(data);
		}
	});
	//ajax page loading functions
	function pageLoader(page) {
		$("#loading-icon").show();
		$.ajax({
		  url: "./views/" + page + ".html",
		  success: function(data){
		  	$("#page-insertion").html(data);
		  	$("#loading-icon").hide();
		  	$("meta[property='og:url']").attr("content", "http://piecedigital.github.io/" + page);
		  	$("body").addClass( $("#page").attr("class") );
		  	console.log( $("#page").attr("class") );
			},
	    error: function(errmsg1, errmsg2, errmsg3) {
	      console.log(errmsg1.status);
	      console.log(errmsg2);
	      console.log(errmsg3.message);
	    }
		});
	}
	function pushState(page, blogPost) {
		blogPost = blogPost || "";
		window.history.pushState({}, page, "" + page + ".html" + blogPost )		  	
	}
	function replaceState(page, blogPost) {
		blogPost = blogPost || "";
		window.history.replaceState({}, page, "" + page + ".html" + blogPost )		  	
	}
	// nav bar
  $(document).on({
    scroll: function() {
    	$("nav").removeClass("open");
	    $("#sub-nav").removeClass("open");
	    console.log("scroll action");
    },
    touchmove: function() {
    	$("nav").removeClass("open");
	    $("#sub-nav").removeClass("open");
	    console.log("touchmove action");
    }
  });
  $("#mo-nav").on("click", function() {
    $("nav").toggleClass("open");
    $("#sub-nav").removeClass("open");
    console.log("nav opened")
  });
  $("#portfolio").on("click", function() {
    $("#sub-nav").toggleClass("open");
    console.log("sub-nav opened")
  });
	//end document ready
});