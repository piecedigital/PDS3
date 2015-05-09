$(document).ready(function(){
  var blogs;
  //load blogs json
  $.ajax({
    url: "blogs/blogs.json",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      var blogs = data.blogs;
      //blogs json load successful, proceed
      var post = window.location.search.split("=").pop();
      post -= 1;
      console.log("blogs: " + blogs);
      console.log(post)
      console.log("post: " + blogs[post]);

      function showBlog() {
        $(".blogs-container").html(
            "<div class='blog-item'>"+
              "<div class='blog-title dark-purple'><span class='inliner inc-md-size-text'>Blog #" + post + ": " + blogs[post].title + "</span></div>"+
              "<div class='blog-time small-text'>" + blogs[post].time + "</div>"+
              "<div class='blog-body'>" + blogs[post].body + "</div>"+
            "</div>"+
            "<div class='separator2 dim-blue-bg'></div>"
          );
      }
      showBlog();
    },
    error: function(errmsg1, errmsg2, errmsg3) {
      console.log(errmsg1.status);
      console.log(errmsg2);
      console.log(errmsg3.message);
    }
  });
});