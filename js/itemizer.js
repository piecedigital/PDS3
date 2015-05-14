$(document).ready(function(){
  var page = $("#page").attr("class").split(" ").pop();
  //console.log("items to load: " + page);    

  function itemizer() {
    //console.log("itemizer initiated");
    for(i = itemObj.items.length-1; i > -1; i--){
      $(".portfolio-container").append("<div class='col-three center-justify'>"+
        "<div title='" + itemObj.items[i].subtitle + "' data-position='" + (i) + "' class='item-box img-contain port-img a-tag'><img src='images/small_" + itemObj.items[i].imgSrc + "' alt='" + itemObj.items[i].imgAlt + "' class='total-center' /></div>"+
        "</div>");
    };
  };
  itemizer();
  function disclaimerLister (){
    var DL = itemObj.disclaimerList || "undefined";
    //console.log("disclaimerList: " + DL);
    if(DL !== "undefined"){
      $("#disclaimer").append("<span>The CC License does not to the following</span>:");
      for (i = 0; i < DL.length; i++){
        if(i !== DL.length-1) {
          $("#disclaimer").append("<span>- " + DL[i] + "</span><br>");
        } else {
          $("#disclaimer").append("<span>- " + DL[i] + "</span>");
        }
      }
    }else{return false;}
  }
  disclaimerLister();
  var position = 0;
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
  $(document).on("click", "#port-prev-btn",
   function() {
      position--;
      if(position < 0) { position = itemObj.items.length-1;}
      openLightbox();
  });
  $(document).on("click", "#port-next-btn",
   function() {
      position++;
      if(position > itemObj.items.length-1) { position = 0;}
      openLightbox();
  });
  // lightbox
  function openLightbox() {
    console.log(position);
    console.log(itemObj.items);
    console.log(itemObj.items[position]);
    console.log(itemObj.items[position].imgSrc);
    $.ajax({
      url: "images/" + itemObj.items[position].imgDesc,
      dataType: "text",
      success: function(data2) {
        $("#lightbox").addClass("lightbox-open");
        $("#img-box").html( "<img src='images/" + itemObj.items[position].imgSrc + "' alt='" + itemObj.items[position].imgAlt + "'>" );
        $("#description").html( itemObj.items[position].imgDesc );
        $("#subtitle").text( itemObj.items[position].subtitle );
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
});