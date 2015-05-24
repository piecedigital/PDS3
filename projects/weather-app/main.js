$(document).ready(function() {
  var key = "f33f8cf538a792d6e4c240619af7d726";
  
  function getWeather() {
    //console.log(arguments)
    var arg = arguments;

    var searchType;
    if(arg[0] === "coords") {
      searchType = "http://api.openweathermap.org/data/2.5/weather?lat=" + arg[1] + "&lon=" + arg[2] + "&type=accurate&APPID=" + key;
    }
    if(arg[0] === "name") {
      searchType = "http://api.openweathermap.org/data/2.5/weather?q=" + arg[1] + "&type=accurate&APPID=" + key;
    }
    if(arg[0] === "zip") {
      searchType = "http://api.openweathermap.org/data/2.5/weather?zip=" + arg[1] + "&type=accurate&APPID=" + key;
    }
    //console.log(searchType);
    $.ajax({
      url: searchType,
      success: function(data) {
        //console.log(data);
        $("#city .data").text(data.name);
        $("#cnty .data").text(data.sys.country);
        $("#cast .data").text(data.weather[0].main + ": " + data.weather[0].description);
        $("#temp .data").text( ((data.main.temp - 273.15) * 1.8 + 32).toFixed(2) );
        $("#wind .data").text(data.wind.speed + " mph");
        $("#humi .data").text(data.main.humidity);
      }
    });
  }
  if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      var lon = pos.coords.longitude,
          lat = pos.coords.latitude;
      // console.log(lat + " " + lon);
      getWeather("coords", lat, lon);
    }, function() {
      alert("failed to properly access API");
    });
  } else {
    alert("could not find any data based on your parameters");
  }
  $("form").on("submit", function() {
    var data = $(this).serializeArray();
    //console.log( data );
    if(data[data.length-1].value === "coords") {
      getWeather(data[data.length-1].value, data[0].value, data[1].value);
    } else {
      getWeather(data[data.length-1].value, data[0].value);
    }
    return false;
  });
});