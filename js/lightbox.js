$(document).ready(function(){
  var image;
  var counter = counter = $("#images > div#port-img").size();
  console.log(counter);
  var currentImage = 2;
  var subtitle;
  var descData;
  var lbOpened = false;
  var instructions = "~ Controls ~<br>Space/I/Clicking the image: Show/Hide description | Left/Right: Navigate through images | Esc: Close lightbox";
  
  var tempImg = $("#images").find("div#port-img").toArray();
  for (var theDivs in tempImg){
    console.log(tempImg[theDivs]);
  }

  $(".portfolio p:first-child").html(instructions);
  function opacity(){
    $("#opacity-box").animate({
      opacity: 1
    }, 300);
  };
  function preCloser(){
    $("#opacity-box").animate({
      opacity: 0
    },300,closer);
  };

  function prev(){
    currentImage = currentImage - 1;
    if( currentImage < 1 ){
      currentImage = counter;
    };
    image = $("#images #port-img:nth-child(" + currentImage + ")").html();
    $("#lightbox").html(image);
    subtitle = $("#images #port-img:nth-child(" + currentImage + ")").data("subtitle");
    $("#subtitle").html(subtitle);
    descData = $("#images #port-img:nth-child(" + currentImage + ")").data("image-desc");
    $("#description").html(descData);
    openDesc();
    console.log(image);
    console.log("current image is " + currentImage);
    console.log("Image name: " + subtitle);
    console.log(descData);
  };

  function next(){
    currentImage = currentImage + 1;
    if( currentImage > counter ){
      currentImage = 1;
    };
    image = $("#images #port-img:nth-child(" + currentImage + ")").html();
    $("#lightbox").html(image);
    subtitle = $("#images #port-img:nth-child(" + currentImage + ")").data("subtitle");
    $("#subtitle").html(subtitle);
    descData = $("#images #port-img:nth-child(" + currentImage + ")").data("image-desc");
    $("#description").html(descData);
    openDesc();
    console.log(image);
    console.log("current image is " + currentImage);
    console.log("Image name: " + subtitle);
    console.log(descData);
  };

  function imageSelection(){
    image = $(this).html();
    currentImage = $(this).data("this-image");
    descData = $(this).data("image-desc");
    subtitle = $(this).data("subtitle");
    $("#opacity-box").css({"visibility":"visible"});
    $("#backdrop").css({"visibility":"visible"});
    $("#lightbox").css({"visibility":"visible"});
    $("#subtitle").css({"visibility":"visible"});
    $("#close").css({"visibility":"visible"});
    $("#next-button").css({"visibility":"visible"});
    $("#prev-button").css({"visibility":"visible"});
    $("#header").css({"z-index":"0"});
    $("#footer").css({"z-index":"-1"});
    $("#lightbox").html(image);
    $("#subtitle").html(subtitle);
    opacity();
    openDesc();
    lbOpened = true;
    console.log(image);
    console.log("lightbox opened");
    console.log("current image is " + currentImage);
    console.log("Image name: " + subtitle);
    console.log(descData);
  };
  function openDesc() {
        $.ajax({
            url : descData,
            dataType: "text",
            success : function (data) {
              console.log("file opened");
                $("#description").html("<p>"+ data + "</p>");
                console.log(data);
            }
        });console.log("function initiated");
    };
  function showDesc(){
    function funcA(){$("#description").css({"display":"none"})};
    if( $("#description").hasClass("slide") ){
      window.setTimeout(funcA, 500)
      $("#description").removeClass("slide");
      $("#description").addClass("unslide");
    }
    else
     {
      $("#description").css({"display":"block"});
      $("#description").removeClass("unslide");
      $("#description").addClass("slide");
    }
    console.log("image clicked");
  };

  function closer(){
    $("#opacity-box").css({"visibility":"hidden"});
    $("#backdrop").css({"visibility":"hidden"});
    $("#lightbox").css({"visibility":"hidden"});
    $("#description").css({"display":"none"});
    $("#subtitle").css({"visibility":"hidden"});
    $("#close").css({"visibility":"hidden"});
    $("#next-button").css({"visibility":"hidden"});
    $("#prev-button").css({"visibility":"hidden"});
    $("#header").css({"z-index":"1"});
    $("#footer").css({"z-index":"0"});
    $("#lightbox").html("");
    $("#subtitle").html("");
    $("#description").html("");
    subtitle = "";
    image = "";
    lbOpened = false;
    console.log(image);
    console.log("lightbox closed");
  };
//on image click
  $("#images #port-img").on("click", imageSelection);
//next and previous buttons
  $("#prev-button").on("click",prev);
  $("#next-button").on("click",next);
//lighbox image on click
  $("#lightbox").on("click", showDesc);
  $("#description").on("click", showDesc);
//closer actions
  $("#close").on("click", preCloser);
  $("#backdrop").on("click", preCloser);
//key actions
  $(document).keydown(function(key){
    switch(key.keyCode){
      case 27:
        preCloser();
        console.log("escape key pressed");
      break;
      case 37:
        prev();
        console.log("left key pressed");
      break;
      case 39:
        next();
        console.log("right key pressed");
      break;
      case 32:
      case 73:
        if(lbOpened){
          showDesc();
          console.log("description opened");
        }
      break;
    };
  });
});
