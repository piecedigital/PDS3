var populatePortfolioPage = function(page){
  console.log("page", page);
  var items;
  page = page || $("#page").attr("class").split(" ").pop();
  //console.log("items to load: " + page);
  $.ajax({
    url: "./portfolio_json/items_" + page + ".json",
    success: function(data){
      items = null;
      items = data.items;
      // populates items in DOM
      ~function() {
        //console.log("itemizer initiated");
        for(i = items.length-1; i > -1; i--){
          $(".portfolio-container").append("<div class='col-three center-justify'>"+
            "<div title='" + items[i].subtitle + "' data-position='" + (i) + "' class='item-box img-contain port-img a-tag'><img src='images/small_" + items[i].imgSrc + "' alt='" + items[i].imgAlt + "' class='total-center' /></div>"+
            "</div>");
        };
      }();
      //itemizer();
      // gathers dislaimer list data
      ~function(){
        var DL = data.disclaimerList || "undefined";
        //console.log("disclaimerList: " + DL);
        if(DL !== "undefined"){
          for (i = 0; i < DL.length; i++){
            if(i !== DL.length-1) {
              $("#disclaimer").append("- " + DL[i] + "<br>");
            } else {
              $("#disclaimer").append("- " + DL[i] + " ");
            }
          }
        } else {
          return false;
        }
        data = null
      }();
      //disclaimerLister();
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
          position++;
          if(position > items.length-1) { position = 0;}
          openLightbox();
      });
      $(document).on("click", "#port-next-btn",
       function() {
          position--;
          if(position < 0) { position = items.length-1;}
          openLightbox();
      });
      // lightbox
      function openLightbox() {
         console.log(position);
        // console.log(items);
        // console.log(items[position]);
        // console.log(items[position].imgSrc);
        $.ajax({
          url: "images/" + items[position].imgDesc,
          dataType: "text",
          success: function(data2) {
            $("#lightbox").addClass("lightbox-open");
            $("#img-box").html( "<img src='images/" + items[position].imgSrc + "' alt='" + items[position].imgAlt + "'>" );
            $("#description").html( data2 );
            $("#subtitle").text( items[position].subtitle );
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
      $(document).on("click", ".nav-item.a-tag", function() {
        data = null;
      });
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
};