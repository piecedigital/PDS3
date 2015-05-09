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
        $(".blogs-container").html("");
        PMsub = pageMin;
        if(PMsub < 0){PMsub = 0};
        console.log(pageMax);
        console.log(pageMin);
        for(i = pageMax; i > PMsub -1; i--){
          $(".blogs-container").append(
              "<div class='blog-item'>"+
                "<div class='blog-title dark-purple'><span data-href='blogpost' data-blogquery='?blogpost=" + (i+1) + "' class='inliner inc-md-size-text a-tag'>Blog #" + (i+1) + ": " + blogs[i].title + "</span></div>"+
                "<div class='blog-time small-text'>" + blogs[i].time + "</div>"+
                "<div class='blog-body'>" + blogs[i].body.substring(0, 140) + "... " + "<span data-href='blogpost' data-blogquery='?blogpost=" + i + "' class='a-tag dark-purple'>Read More</span></div>"+
              "</div>"+
              "<div class='separator2 dim-blue-bg'></div>"
            );
        };
        $(".blogs-container").find(".separator2").last().remove();
        if(PMsub === 0)
          {$("#blog-prev-btn").css({"opacity":".2","cursor":"default"})}
          else
          {$("#blog-prev-btn").css({"opacity":"1","cursor":"pointer"})};
        if(pageMax === blogAm-1)
          {$("#blog-next-btn").css({"opacity":".2","cursor":"default"})}
          else
          {$("#blog-next-btn").css({"opacity":"1","cursor":"pointer"})};

      $("#blog-counter").html(page + "/" + Math.ceil(blogAm/5));
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

      $("#blog-prev-btn").on("click", prev );
      $("#blog-next-btn").on("click", next );

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
