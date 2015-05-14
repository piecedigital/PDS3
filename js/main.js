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
		//console.log("clicked a-tag");
		//console.log( $(this).data("href") );
		if( $(this).data("href") ) {
			var page = $(this).data("href");
			var blogQuery = $(this).data("blogquery") || "";
			//console.log("link had: " + page);
			pageLoader(page, blogQuery);
			pushState(page, blogQuery);
			$("nav").removeClass("open");
			$("#sub-nav").removeClass("open");
		}
	});
	//ajax page loading functions
	function pageLoader(page, blogpost) {
		//console.log(page);
		blogpost = blogpost || "";
		$("#loading-icon").show();
		$.ajax({
		  url: "./views/" + page + ".html",
		  success: function(data){
		  	$("#page-insertion").html(data);
		  	$("#loading-icon").hide();
		  	$("meta[property='og:url']").attr("content", "http://piecedigital.github.io/" + page);
		  	$("body").attr("class", $("#page").attr("class") );
		  	//console.log( $("#page").attr("class") );
		  	$("meta[property='og:url']").attr("content", window.location.href);
		  	document.body.scrollTop = 0;
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
		if(history[historyIndex] !== page) {
			blogPost = blogPost || "";
			window.history.pushState({}, page, "" + page + ".html" + blogPost );
			historyIndex++;
			history[historyIndex] = page;
			history = history.slice(0, historyIndex+1);
			//console.log(history);
			//console.log("page index: " +historyIndex);
		}
	}
	function replaceState(page, blogPost) {
		if(true) {
			blogPost = blogPost || "";
			window.history.replaceState({}, page, "" + page + ".html" + blogPost );
			history[historyIndex] = page;
			//console.log(history);
		}
	}
	// nav bar
  $(document).on({
    scroll: function() {
    	$("nav").removeClass("open");
	    $("#sub-nav").removeClass("open");
	    // console.log("scroll action");
    },
    touchmove: function() {
    	$("nav").removeClass("open");
	    $("#sub-nav").removeClass("open");
	    // console.log("touchmove action");
    }
  });
  $("#mo-nav").on("click", function() {
    $("nav").toggleClass("open");
    $("#sub-nav").removeClass("open");
    // console.log("nav opened");
  });
  $("#portfolio").on("click", function() {
    $("#sub-nav").toggleClass("open");
    // console.log("sub-nav opened");
  });
  setInterval(function() {
  	var currentPage = window.location.pathname.split("/").pop().replace(/.html/gi, "");
  	// console.log(currentPage);
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