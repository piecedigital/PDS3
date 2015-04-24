$(document).ready(function(){
  $(document).on("scroll click", function() {
    $("nav").removeClass("open");
    $("#sub-nav").removeClass("open");
  });
  $("#mo-nav").on("click", function() {
    $("nav").toggleClass("open");
    console.log("nav opened: " + this)
  });
  $("#portfolio").on("click", function() {
    $("#sub-nav").toggleClass("open");
    console.log("nav opened: " + this)
  });
});
