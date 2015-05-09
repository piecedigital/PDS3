$(document).ready(function(){
  var page = $("#page").attr("class").split(" ").pop();
  console.log("items to load: " + page);
  var items, iLen;
  $.ajax({
    url: "./portfolio_json/items_" + page + ".json",
    success: function(data){
      console.log(data);
      items = data.items;
      iLen = items.length;
      function itemizer() {
        console.log("itemizer initiated");
        for(i = iLen-1; i > -1; i--){
          $(".portfolio-container").append("<div class='col-three center-justify'>"+
            "<div title='" + items[i].subtitle + "' data-position='" + i + "' class='item-box img-contain port-img a-tag'><img src='images/small_" + items[i].imgSrc + "' alt='" + items[i].imgAlt + "' class='total-center' /></div>"+
            "</div>");
            
        };
      };
      itemizer();
      function disclaimerLister (){
        var DL = data.disclaimerList || "undefined";
        console.log(typeof DL === "undefined");
        if(typeof DL !== "undefined"){
          for (i = 0; i < DL.length; i++){
            if(i !== DL.length-1) {
              $("#disclaimer").append("- " + DL[i] + "<br>")
            } else {
              $("#disclaimer").append("- " + DL[i] + " ")
            }
          }
        }else{return false;}
      }
      disclaimerLister();
    },
    error: function(errmsg1, errmsg2, errmsg3) {
      console.log(errmsg1.status);
      console.log(errmsg2);
      console.log(errmsg3.message);
      $("#loading-icon").hide();
      pageLoader("home");
      replaceState("home");
    }
  });
  // end ajax
  // lightbox
  var position = 0;
  function openLightbox() {
    console.log(position);
    $.ajax({
      url: "images/" + items[position].imgDesc,
      success: function(data) {
        $("#lightbox").addClass("lightbox-open");
        $("#img-box").html("<img src='images/" + items[position].imgSrc + "'>");
        $("#description").html(data);
        $("#subtitle").text(items[position].subtitle);
      }
    });
  }
  function closeLightbox() {
    console.log()
    $("#lightbox").removeClass("lightbox-open");
    $("#img-box").html("");
    $("#description").html("");
    $("#description").removeClass("desc-open");
    $("#subtitle").text("");
  }
  // end openLightbox
   $(document).on("click", ".port-img",
    function() {
      position = $(this).data("position");
      openLightbox();
   });
   $(document).on("click", "#close, #backdrop",
    function() {
      closeLightbox();
   });
   $(document).on("click", "#img-box img, #description",
    function() {
      $("#description").toggleClass("desc-open");
   });
   $(document).on({
      click: function(type1) {
        var navDiv = type1.target;
        if($(navDiv).attr("id") === "port-prev-btn" || $(navDiv).attr("id") === "port-next-btn"){
          if( $(navDiv).attr("id").match(/prev/gi) ) {
            position++;
            if(position > items.length-1) { position = 0;}
            openLightbox();
          } else
          if( $(navDiv).attr("id").match(/next/gi) ) {
            position--;
            if(position < 0) { position = items.length-1;}
            openLightbox();
          }
        }
      }
   });
});