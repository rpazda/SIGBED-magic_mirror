	/*
		TODO:
		--Add time
		--Add temperature
		--Add date
		Add more complete weather info
			humidity
				--data
				div
			UV
				--data
				div
			chance of rain
				data
				div
			icon
				--figure out why not displaying correctly
				match icons WU->WI
		--Add sunrise, sunset
			--data
			--div
		Add 5 day forecast
		Add news
		Add google calendar days events
		Setup local config 
			lat
			lon
			api key
			time zone
		
		
		Weather icons library: https://erikflowers.github.io/weather-icons/
		Weather icons key: https://www.wunderground.com/about/icons.asp

	*/
	
	//Basis for clock function taken from:
	//http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
	
	/*var config = (function(){
		var configuration;
		$.ajax({
			'async': false,
			'global': false,
			'url': "config.json",
			'datatype': "json",
			'success': function(data){
				configuration = data;
			}
		});
		return JSON.parse(configuration);
	})();*/
	
	//Start all mirror functions once page is ready
	$(document).ready( function(){
		
		startTime(); 
		updateWeather(); 
		setDate();
		setSunriseSunset();
		
	});
	
	//Begin keeping and displaying time
	function startTime() {
		var today = new Date();
		var hour = today.getHours();
		var AMPM = "AM";
		if(hour > 11){
			AMPM = "PM";
		}
		hour = hour%12;
		var minutes = today.getMinutes();
		var seconds = today.getSeconds();
		minutes = formatTime(minutes);
		seconds = formatTime(seconds);
		document.getElementById('clock').innerHTML =
		hour + ":" + minutes + " " + AMPM;// + ":" + seconds; removed seconds
		var t = setTimeout(startTime, 500);	//restart function every 500 ms
		
	}
	
	//Helper function for timer, adds zeros for familiar formatting
	function formatTime(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	
			
	// Gets weather data, parses it, and updates elements with weather data
	function updateWeather() {
		var weatherData = getWeatherData();
		var parsedWeatherData = JSON.parse(weatherData);
		
		var actualTemp = parsedWeatherData.current_observation.temperature_string;
		var feelTemp = parsedWeatherData.current_observation.feelslike_string;
		var weatherIcon = getIcon(parsedWeatherData.current_observation.icon);
		var humidity = parsedWeatherData.current_observation.relative_humidity;
		var UV = parsedWeatherData.current_observation.UV;
		//chance of rain
		
		$("#temp-real").html(actualTemp);
		$("#temp-feel").html(feelTemp);
		//add icon to div
		$("#weather-icon").html(weatherIcon);
		//update humidity 		$("#humidity").html(humidity);
		//update UV 			$("#UV").html(UV);
		//update chance of rain $("#chance-of-rain").html();
		var tt = setTimeout(updateWeather, 1200000);
		
		//Helper function for updateWeather(), Gets weather data via json request and returns it as a JSON string
		function getWeatherData(){
		
			/*$.ajax({
				url: "http://api.wunderground.com/api/ /conditions/q/FL/Oviedo.json",
				context: document.body
			})
			.success(function(data){
				var weatherData = data;
				var parsedWeatherData =  JSON.parse(weatherData);
				return parsedWeatherData;//Doesnt seem to be returning data correctly
			});
			*/
			var connectionString = "http://api.wunderground.com/api/8f4f737948165dbd/conditions/q/FL/Oviedo.json";
			//var connectionString = "http://api.wunderground.com/api/"+config.apiKey+"/conditions/q/"+config.lat+","+config.lon+".json";
			//var weatherData = httpGet(connectionString);
				
			var Httpreq = new XMLHttpRequest();
			Httpreq.open("GET", connectionString, false);
			Httpreq.send(null);
			
			return Httpreq.responseText;
			
		}
		
		// Maps icon information from the WU API to icons from weather-icons
		function getIcon(iconName){
			
			var iconHtml = "";
			//update switch
			/*
			switch(iconName){
				//case n:
				//	code block
				//	break;
				//figure out formatting of strings
				
				case "chanceofflurries":
					iconHtml = "<i class=''></i>";
					break;
				case "chanceofrain":
					iconHtml = "<i class=''></i>";
					break;
				case "chanceofsleet":
					iconHtml = "<i class=''></i>";
					break;
				case "chanceofsnow":
					iconHtml = "<i class=''></i>";
					break;
				case "chanceofathunderstorm":
					iconHtml = "<i class=''></i>";
					break;
				case "clear":
					iconHtml = "<i class='wi wi-day-sunny'></i>";
					break;
				case "cloudy":
					iconHtml = "<i class='wi wi-day-cloudy'></i>";
					break;
				case "flurries":
					iconHtml = "<i class=''></i>";
					break;
				case "hazy":
					iconHtml = "<i class='wi wi-day-haze'></i>";
					break;
				case "mostlycloudy":
					iconHtml = "<i class=''></i>";
					break;
				case "mostlysunny":
					iconHtml = "<i class=''></i>";
					break;
				case "partlycloudy":
					iconHtml = "<i class=''></i>";
					break;
				case "partlysunny":
					iconHtml = "<i class=''></i>";
					break;
				case "rain":
					iconHtml = "<i class='wi wi-day-rain'></i>";
					break;
				case "sleet":
					iconHtml = "<i class='wi wi-day-sleet'></i>";
					break;
				case "snow":
					iconHtml = "<i class=''></i>";
					break;
				case "sunny":
					iconHtml = "<i class=''></i>";
					break;
				case "thunderstorm":
					iconHtml = "<i class='wi wi-day-thunderstorm'></i>";
					break;
				case "unknown":
					iconHtml = "<i class='fa fa-question'></i>";
					break;
				default:
					default code block
			}*/
			
			return iconHtml;
		}
	}
	
	//Displays the date in a familiar, legible format.
	function setDate(){
						
		var today = new Date();
		var weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
		var weekDay = weekDays[today.getDay()];
		var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November","December"];
		var month = monthNames[today.getMonth()];
		var day = today.getDate();
		var year = today.getFullYear();
		
		var dateString = weekDay+" "+month+" "+day+", "+year;
		$('#date').html(dateString);
		var t = setTimeout(setDate, 1000);	//Restart function every 1000 ms (1 second)
	}
	
	function setSunriseSunset(){
		sunriseSunsetData = JSON.parse(getSunriseSunset());
		var sunrise = convertUTCtoLocal("01/01/1999 "+sunriseSunsetData.results.sunrise+" UTC");
		var sunset = convertUTCtoLocal("01/01/1999 "+sunriseSunsetData.results.sunset+" UTC");
		
		$("#sunrise").html(sunrise);
		$("#sunset").html(sunset);
		
		var t = setTimeout(startTime, 500000);	//restart function 
		
		function getSunriseSunset(){
			var connectionString = "http://api.sunrise-sunset.org/json?lat=28.613474&lng=-81.200157";
			
			var Httpreq = new XMLHttpRequest();
			Httpreq.open("GET", connectionString, false);
			Httpreq.send(null);
			
			return Httpreq.responseText;
		}
	}
	
	
	function convertUTCtoLocal(time){	//Big ups to digitalbath! http://stackoverflow.com/questions/6525538/convert-utc-date-time-to-local-date-time-using-javascript
		var localTimeFull = new Date(time);
		var hour = localTimeFull.getHours();
		var AMPM = "AM";
		if(hour > 11){
			AMPM = "PM";
		}
		hour = hour%12;
		var minutes = localTimeFull.getMinutes();
		minutes = formatTime(minutes);
		
		var localTime = hour + ":" + minutes + " " + AMPM;
		
		return localTime;  
	}
	
	
	
