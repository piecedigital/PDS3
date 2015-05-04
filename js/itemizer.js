$(document).ready(function(){
  var page = $("#page").attr("class").split(" ").pop();
  console.log("items to load: " + page);
  $.ajax({
    url: "./portfolio_json/items_" + page + ".json",
    success: function(data){
      console.log(data);
      var items = data.items;
      var iLen = items.length;
      function itemizer() {
        console.log("itemizer initiated");
        for(i = iLen-1; i > -1; i--){
          $(".portfolio-container").append("<div class='col-three center-justify'>"+
            "<div alt='" + items[i].divAlt + "' id='port-img' data-this-image=" + (iLen-i) + " data-subtitle='" + items[i].subtitle + "' data-image-desc='images/" + items[i].imgDesc + "' class='item-box img-contain'><img src='images/" + items[i].imgSrc + "' alt='" + items[i].imgAlt + "' class='total-center' /></div>"+
            "</div>");
            
        };
      };
      itemizer();
      function disclaimerLister (){
        var DL = data.disclaimerList;
        console.log(typeof DL === "undefined");
        if(typeof DL !== "undefined"){
          DL = disclaimerList;
          for (i = 0; i < disclaimerList.length; i++){
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
});
/*
$("#portfolio-container").append("<div alt='" + items[i].divAlt + "' id='port-img' data-this-image=" + (iLen-i) + " data-subtitle='" + items[i].subtitle + "' data-image-desc='images/" + items[i].imgDesc + "'>"+
      "<img src='images/" + items[i].imgSrc + "' alt='" + items[i].imgAlt + "' />"+
      "</div>");
      */