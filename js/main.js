$(document).ready(function() {
	var history = [];
	var historyIndex = 0;
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
	$(document).on("click", ".a-tag", function() {
		console.log("clicked a-tag");
		if( $(this).data("href") ) {
			var data = $(this).data("href");
			console.log("link had: " + data);
			console.log(typeof data);
			pageLoader(data);
			pushState(data);
			$("nav").removeClass("open");
			$("#sub-nav").removeClass("open");
		}
	});
	//ajax page loading functions
	function pageLoader(page) {
		//console.log(page);
		$("#loading-icon").show();
		$.ajax({
		  url: "./views/" + page + ".html",
		  success: function(data){
		  	$("#page-insertion").html(data);
		  	$("#loading-icon").hide();
		  	$("meta[property='og:url']").attr("content", "http://piecedigital.github.io/" + page);
		  	$("body").attr("class", $("#page").attr("class") );
		  	//console.log( $("#page").attr("class") );
			},
	    error: function(errmsg1, errmsg2, errmsg3) {
	      $("#loading-icon").hide();
	      console.log(errmsg1.status);
	      console.log(errmsg2);
	      console.log(errmsg3.message);
	      pageLoader("home");
				replaceState("home");
	    }
		});
	}
	function pushState(page, blogPost) {
		blogPost = blogPost || "";
		window.history.pushState({}, page, "" + page + ".html" + blogPost );
		historyIndex++;
		history.push(page);
		console.log(history);
	}
	function replaceState(page, blogPost) {
		blogPost = blogPost || "";
		window.history.replaceState({}, page, "" + page + ".html" + blogPost );
		history[historyIndex] = page;
		historyIndex = ( history.slice(0, history.length) ).length;
		console.log(history);
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
  setInterval(function() {
  	var currentPage = window.location.pathname.split("/").pop().replace(/.html/gi, "");
  	console.log(currentPage);
  	if(currentPage !== history[historyIndex]) {
  		if(currentPage === history[historyIndex-1]) {
  			historyIndex--;
  			pageLoader(currentPage);
  		}
  		if(currentPage === history[historyIndex+1]) {
  			historyIndex++;
  			pageLoader(currentPage);
  		}
  	}
  }, 100);
	//end document ready
});