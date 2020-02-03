var timezone_ = 0;
var placeholder_1 = " °F";
var placeholder_2 = " mph";

var tags = ["Chongqing", "Shanghai", "Beijing", "Chengdu", "Istanbul", "Karachi", "Guangzhou", "Dhaka", "Tokyo", "Moscow",
        "Shenzhen", "Mumbai", "Kinshasa", "Tianjin", "Lahore", "Delhi", "Jakarta", "Dongguan", "Seoul", 
        "Cairo", "Foshan", "Tehran", "Mexico City", "Lima", "London", "Bangalore", "New York", "Shenyang", "Wuhan",
        "Bogota", "Ningbo", "Ho Chi Minh City", "Hong Kong", "Nanjing", "Hanoi", "Baghdad", "Bangkok", "Singapore",
        "Saint Petersburg", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio",
        "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco",
        "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington DC", "Boston", "El Paso", "Detroit", "Nashville",
        "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque",
        "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Miami", "Raleigh",
        "Omaha", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", "New Orleans",
        "Paris", "Dubai", "Kuala Lumpur", "Barcelona", "Osaka", "Agra", "Amsterdam", "Mecca", "Prague", "Taipei", 
        "Antalya", "Rome", "Phuket"];
        
var length = tags.length;

function ac(value) { 
        document.getElementById('datalist').innerHTML = '';  
           
         l=value.length; 

     for (var i = 0; i<length; i++) { 
         if(((tags[i].toLowerCase()).indexOf(value.toLowerCase()))>-1) 
         { 
             //comparing if input string is existing in tags[i] string 
  
             var node = document.createElement("option"); 
             var val = document.createTextNode(tags[i]); 
              node.appendChild(val); 
  
               document.getElementById("datalist").appendChild(node); 
             } 
         } 
     } 
function find(val) {
        var val2 = document.querySelector('input[name="mi"]:checked').value;
        if (val2 == "metric") {
                placeholder_1 = " °C";
                placeholder_2 = " m/s";
        } else {
                placeholder_1 = " °F";
                placeholder_2 = " mph";
        }
       
       
       
        if (val.toLowerCase() == "troy") {
                val = "id=5141502";
        } else {
                val= "q=" + val;
        }
        
        var now = new Date();
        fetch("https://api.openweathermap.org/data/2.5/weather?" + val + "&appid=d4165ac5f232bf585af32a4ba1d2e0a6&units=" + val2)
        .then(response=>{
                if (response.ok) {
                        return response.json();
                } else {
                        alert("It appears we cannot find this city. Please check your spelling");
                        throw new Error("AAA");
                }
        })
        .then(data=> {
            document.getElementById("city").innerHTML=data.name
            document.getElementById("time").innerHTML=TimePrint(now.getUTCHours() + (data.timezone/3600), now.getMinutes());
            timezone_ = data.timezone;
            document.getElementById("temp").innerHTML=data.main.temp + placeholder_1;
            document.getElementById("wind").innerHTML=data.wind.speed + placeholder_2;
            document.getElementById("sunrise").innerHTML=TimeChange(data.sys.sunrise+data.timezone);
            document.getElementById("sunset").innerHTML=TimeChange(data.sys.sunset+data.timezone);
            document.getElementById("precip").innerHTML=data.weather[0].description;
            document.getElementById("image").src="https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
        })
        }
       

function forecast(val) {
        var now = new Date();
        var val2 = document.querySelector('input[name="mi"]:checked').value;
        if (val2 == "metric") {
                placeholder_1 = " °C";
                placeholder_2 = " m/s";
        } else {
                placeholder_1 = " °F";
                placeholder_2 = " mph";
        }
	
	if (val.toLowerCase() == "troy") {
                val = "id=5141502";
        } else {
                val= "q=" + val;
        }
        fetch("https://api.openweathermap.org/data/2.5/forecast?" + val + "&appid=d4165ac5f232bf585af32a4ba1d2e0a6&units=" + val2 + "&cnt=9")
        .then(response => response.json())
        .then(data => {
                var number = 0;
                for ( ; number < 9; number++) {
                        document.getElementById("time" + (number + 2).toString()).innerHTML=TimeChange(data.list[number].dt + timezone_);
                        document.getElementById("temp" + (number + 2).toString()).innerHTML=data.list[number].main.temp + placeholder_1;
                        document.getElementById("wind" + (number + 2).toString()).innerHTML=data.list[number].wind.speed + placeholder_2;
                        document.getElementById("precip" + (number + 2).toString()).innerHTML=data.list[number].weather[0].description;
                        document.getElementById("image" + (number + 2).toString()).src="https://openweathermap.org/img/wn/" + data.list[number].weather[0].icon + "@2x.png";
                        }
                
                })

}
        

function TimeChange(org) {
	var remainder = org%86400;
	var hours = Math.floor(remainder/3600);
	var minutes = Math.floor((org%3600)/60);
	var returner = "";
	var AM = "AM";
	if (hours > 12) {
		returner = (hours - 12).toString();
		AM = "PM";
	} else if (hours == 12) {
                AM = "PM";
                returner = hours.toString();
        } else if (hours == 0) {
		returner = "12";
	} else {
		returner = hours.toString();
	}
        
	if (minutes < 10) {
		returner += ":0" + minutes.toString();
	} else {
		returner += ":" + minutes.toString();
	}
	return returner + " " + AM;
}

function TimePrint(h, m) {
	var returner = "";
	var AM  = "AM";
        if (h < 0) {
                h = h + 24;
        } else if (h > 23) {
                h = h - 24;
        }
	if (h > 12) {
		returner = (h - 12).toString();
		AM = "PM";
	} else if (h == 12) {
                AM = "PM";
                returner = h.toString();
        } else if (h == 0) {
		returner = "12";
	} else {
		returner = h.toString();
	}
	if (m < 10) {
		returner += ":0" + m.toString();
	} else {
		returner += ":" + m.toString();
	}
	return returner + " " + AM;
}
