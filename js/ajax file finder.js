/*
$.ajax({
  url: "images/",
  success: function(data){
  $(data).find("td > a").each(function(){
      // will loop through 
      console.log("Found a file: " + $(this).attr("href") );
   });
	}
});
*/
//"a:contains(" + 'album' + ")"