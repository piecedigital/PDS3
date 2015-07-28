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
              "<div class='blog-title dark-blue'><span class='inliner inc-md-size-text bolding'>Blog #" + (post+1) + ": " + blogs[post].title + "</span></div>"+
              "<div class='blog-time small-text'>" + blogs[post].time + "</div>"+
              "<div class='blog-body'>" + blogs[post].body + "</div>"+
            "</div>"+
            "<div class='separator2 dim-blue-bg'></div>"+
            "<p>Share this blog: </p> <a class='twitter-share-button' href='https://twitter.com/share' data-url='https://piecedigital.github.io/blogpost?blog=" + (post+1) + "' data-via='PieceDigital' data-text='NEW BLOG | " + blogs[post].title + " -' data-related='Piece Digital Blog' data-count='vertical'> </a> <div class='fb-share-button' data-href='https://piecedigital.github.io/blogpost?blog=" + (post+1) + "' data-layout='box_count'></div>"+
            "<div class='separator2 dim-blue-bg'></div>"+
          "<script>window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src='https://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,'script','twitter-wjs'));</script><div id='fb-root'></div><script>(function(d, s, id){var js, fjs=d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js=d.createElement(s); js.id=id; js.src='//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0'; fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>"+
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