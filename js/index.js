//https://api.darksky.net/forecast/0e3c8b07a9be6e6f169d10db50ce98f6/37.8267,-122.4233
var lat;
var long;
var apiKey = "0e3c8b07a9be6e6f169d10db50ce98f6";
var icons = {"clear-day": Skycons.CLEAR_DAY, "clear-night": Skycons.CLEAR_NIGHT,
             "partly-cloudy-day": Skycons.PARTLY_CLOUDY_DAY, "partly-cloudy-night": Skycons.PARTLY_CLOUDY_NIGHT,"cloudy":Skycons.CLOUDY, "rain": Skycons.RAIN, "sleet": Skycons.SLEET, "snow": Skycons.SNOW, "wind": Skycons.WIND, "fog": Skycons.FOG};
$(document).ready(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
  lat = position.coords.latitude;                                     long = position.coords.longitude
  $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + long, function(json){
      $("#data").html("Weather is " + json.currently.summary.toLowerCase()+ '.');
    var temp = json.currently.temperature;
      $("#temperature").html(Math.round(temp) + "°F");
  var skycons = new Skycons({"color": "pink"});
  skycons.add("icon", icons[json.currently.icon]);
  skycons.play();
      $("#convert").click(function(){
      var temperatureType = $("#convert").text();
      var currentTempString = JSON.stringify(json.currently.temperature);
    var currentTemp = parseInt(currentTempString);    
    if(temperatureType.indexOf("C") != -1){
      currentTemp = (currentTemp - 32) * (5/9);
      $("#temperature").html(Math.round(currentTemp) + "°C");
      $("#convert").html("° F");
    }
    else if(temperatureType.indexOf("F")!=-1){
      $("#temperature").html(Math.round(currentTemp) + "°F");
      $("#convert").html("° C");
    }
    });
    });
   });
  }
});