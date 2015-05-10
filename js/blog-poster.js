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

      function showBlog() {
        $(".blogs-container").html(
            "<div class='blog-item'>"+
              "<div class='blog-title dark-purple'><span class='inliner inc-md-size-text bolden'>Blog #" + (post+1) + ": " + blogs[post].title + "</span></div>"+
              "<div class='blog-time small-text'>" + blogs[post].time + "</div>"+
              "<div class='blog-body'>" + blogs[post].body + "</div>"+
            "</div>"+
            "<div class='separator2 dim-blue-bg'></div>"+
            "<div id='disqus_thread'></div>"+
            "<script type='text/javascript'>"+
          "var disqus_shortname = 'pieceblog';"+
          "var disqus_url = 'http://piecedigital.github.io/blogpost/blogpost.html?blog=" + post + "';"+

          "(function() {"+
            "var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;"+
            "dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';"+
            "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);"+
          "})();"+
          "</script>"+
          "<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>"
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