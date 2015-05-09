$(document).ready(function(){
  var blogs;
  //load blogs json
  $.ajax({
    url: "./portfolio_json/items_codepens.json",
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data){
      var pens = data.items;
      //blogs json load successful, proceed
      for (i = pens.length-1; i > -1; i--) {
        $(".pens-container").append(
          "<p data-height='" + pens[i].dataHeight + "' data-theme-id='12661' data-slug-hash='" + pens[i].dataHash + "' data-default-tab='result' data-user='piecedigital' class='codepen'>See the Pen <a href='http://codepen.io/piecedigital/pen/" + pens[i].dataHash + "/'>" + pens[i].dataHash + "</a> by Darryl Dixon - Piece Digital (<a href='http://codepen.io/piecedigital'>@piecedigital</a>) on <a href='http://codepen.io'>CodePen</a>.</p>"
          )
      }
    },
    error: function(errmsg1, errmsg2, errmsg3) {
      console.log(errmsg1.status);
      console.log(errmsg2);
      console.log(errmsg3.message);
    }
  });
});