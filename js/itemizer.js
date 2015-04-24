$(document).ready(function(){
        var iLen = items.length;
        function itemizer() {
          for(i = iLen-1; i > -1; i--){
            $("#images").append("<div alt='" + items[i].divAlt + "' id='port-img' data-this-image=" + (iLen-i) + " data-subtitle='" + items[i].subtitle + "' data-image-desc='images/" + items[i].imgDesc + "'>"+
            "<img src='images/" + items[i].imgSrc + "' alt='" + items[i].imgAlt + "' />"+
            "</div>");
          };
        };
        itemizer();
        function disclaimerLister (){
          var DL;
          console.log(typeof disclaimerList === "undefined");
          if(typeof disclaimerList !== "undefined"){
            DL = disclaimerList;
            for (i = 0; i < disclaimerList.length; i++){
              if(i !== DL.length-1)$("#disclaimer").append("- " + DL[i] + "<br>")
                else
                  $("#disclaimer").append("- " + DL[i] + " ")
            }
          }else{return false;}
        }
        disclaimerLister();
      });