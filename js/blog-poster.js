//set meta tag url
$("meta[property='og:url']").attr("content", window.location.href);

$(document).ready(function(){
  var getQ, blogs;
  //load json blog data
  $.ajax({
    url: "../blogs/blogs.json",
    success: function(data){
      blogs = data.blogs;
      console.log(blogs);
      console.log("Success!");
    if (window.location.search && window.location.search.substring(0,6) === "?blog=")
      {var getQ = window.location.search;}
      else
        {window.location = "../blog"};
        var num = getQ.toString().split("=").pop();

        var con = blogs[num-1];
        if (!num || num > blogs.length){window.location = "../blog"}
          else{$("title").text(blogs[num-1].title + " | Piece Digital Studios");
          $(".blog-files").html("<div id='" + num + "' class='blog-wrapper'>"+
          "<h2>" + blogs[num-1].title + "</h2>"+
          "<h6>" + blogs[num-1].time + "</h6>"+
          "<p id='body'>" + blogs[num-1].body + "</p><br>"+
          "<p>Share this blog: </p> <a class='twitter-share-button' href='https://twitter.com/share' data-url='https://piecedigital.github.io/blogpost/blogpost?blog=" + num + "' data-via='PieceDigital' data-text='New Blog Post | " + blogs[num-1].title + " -' data-related='Piece Digital Blog' data-count='vertical'> </a> <div class='fb-share-button' data-href='https://piecedigital.github.io/blogpost/blogpost?blog=" + num + "' data-layout='box_count'></div> </div><!--End social icons-->"+
          "<div id='disqus_thread'></div>"+
          "<script type='text/javascript'>"+
          "var disqus_shortname = 'pieceblog';"+
          "var disqus_url = 'http://piecedigital.github.io/blogpost/blogpost.html?blog=" + num + "';"+

          "(function() {"+
            "var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;"+
            "dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';"+
            "(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);"+
          "})();"+
          "</script>"+
          "<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>"+
          "</div> <!--end blogs wrapper-->");
        };
        function emoteReader(){
          $("p#body").html( $("p#body").html().replace(/(:\))/ig, "<span id='smile'></span>") );
          $("p#body").html( $("p#body").html().replace(/(:\-\))/ig, "<span id='smile'></span>") );
          $("p#body").html( $("p#body").html().replace(/(:\/)/ig, "<span id='indif'></span>") );
          $("p#body").html( $("p#body").html().replace(/(:\-\/)/ig, "<span id='indif'></span>") );
        };
        emoteReader();
    }
  });
});
