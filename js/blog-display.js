$(document).ready(function(){
  var blogs;
  //load blogs json
  $.ajax({
    url: "blogs/blogs.json",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      blogs = data.blogs;
      //console.log(data.blogs)
      //blogs json load successful, proceed
      var blogAm = blogs.length, pageMin = blogAm-5, pageMax = pageMin+4, page = Math.ceil(blogAm/5), PMsub;

      if(pageMax > blogAm-1 ){pageMax = blogAm-1;};
      if(pageMin < 0){pageMin = 0};
      console.log(blogAm);
      console.log(pageMax);
      console.log(pageMin);

      function showBlogs() {
        $(".blog-files").html("");
        PMsub = pageMin;
        if(PMsub < 0){PMsub = 0};
        console.log(pageMax);
        console.log(pageMin);
        for(i = pageMax; i > PMsub -1; i--){
          $(".blog-files").append("<div id='" + (i+1) + "' class='blog-wrapper'>"+
                                  "<a href='blogpost/blogpost?blog=" + (i+1) + "'><h2>Blog#" + (i+1) + ": " + blogs[i].title + " &raquo;</h2></a>"+
                                  "<h6>" + blogs[i].time + "</h6>"+
                                  "<p class='shrink-img'>" + blogs[i].body.substring(0,140) + "...<a href='blogpost/blogpost?blog=" + (i+1) + "'>See More &raquo;</a></p>"+
                                  "</div> <!--end blogs wrapper-->"+
                                  "<div class='separator'></div>");
        };
        $(".blog-files").find(".separator").last().remove();
        if(PMsub === 0)
          {$("#prev").css({"opacity":".2","cursor":"default"})}
          else
          {$("#prev").css({"opacity":"1","cursor":"pointer"})};
        if(pageMax === blogAm-1)
          {$("#next").css({"opacity":".2","cursor":"default"})}
          else
          {$("#next").css({"opacity":"1","cursor":"pointer"})};

      $("#page-num").html(page + "/" + Math.ceil(blogAm/5));
      };
      showBlogs();
      /*button presses*/
      function prev() {
        if( !(pageMin <= 0) ){
          pageMin -= 5;
          pageMax = pageMin+4;
          //if(pageMin < 0){pageMin = 0};
          page--;

          showBlogs();
          console.log("left pressed");
        }
      };
      function next() {
        if( !(pageMax >= blogAm-1) ){
          pageMin += 5;
          pageMax = pageMin+4;
          if(pageMax > blogAm-1 ){pageMax = blogAm-1;};
          if(pageMin > pageMax){pageMin = pageMax-5;};
          page++;

          showBlogs();
          console.log("right pressed");
        }
      };

      $("#prev").on("click", prev );
      $("#next").on("click", next );

        $(document).keydown(function(key){
        switch(key.keyCode){
          case 37:
            prev();
            break;
          case 39:
            next();
            break;
        };
      });
    },
    error: function(errmsg1, errmsg2, errmsg3) {
      console.log(errmsg1.status);
      console.log(errmsg2);
      console.log(errmsg3.message);
    }
  });
});
