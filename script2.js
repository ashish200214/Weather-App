$(document).ready(function () {
  let weatherApiKey = "d76b7400abc34dffa40181822252007";
  let url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${localStorage.getItem(
    "cityName"
  )}&aqi=yes`;

  let next10Days = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${localStorage.getItem(
    "cityName"
  )}&days=10`;

  
  //actual impl

  let outputOfForecast = [];
  function printFutureForecast(){
    $.getJSON(next10Days,
      function (result) {
        console.log("forecast");

        console.log(result.forecast.forecastday);
        outputOfForecast = result.forecast.forecastday;
        $(document.body).append(`
         <div id="forecast-div" class="mt-3 p-2 rounded-4 w-100 mx-auto">
                     <div class="d-flex justify-content-between mb-3">
                    <ul class="list-group">
                    <li class="list-group-item">Next 10 Days Forecasting</li>
                    
                    </ul>
                    </div>
                    <div id="forecast-weather-grid" class=" d-flex gap-5 flex-wrap justify-content-center align-items-center" ></div>

         </div>
          `);
        for(let output of outputOfForecast ){
          $('#forecast-weather-grid').append(`
            
            
            <div class="bg-white p-3 rounded-3 d-inline-flex mb-3 flex-column mx-auto w-25">
              <div class=" text-center mb-3 flex-column bg-warning rounded-3 p-3 inter-font fs-5">${output.date}</div>
              <div class=" d-inline-block">
              <img class="mx-auto d-flex condition-img" src="${output.day.condition.icon}">
            </div>
            <div class="fs-5 inter-font mb-3 text-center oswad-font-medium">${output.day.condition.text}</div>
            <div class="fs-3 text-center h3 oswad-font mb-3">${output.day.avgtemp_c}°C</div>
             <div class=" d-inline-block mb-3">
              <img class="mx-auto d-flex rain-chance-img" src="pngegg.png">
            </div>
                        <div class="fs-3 text-center  oswad-font-light">${output.day.daily_chance_of_rain}%</div>

            `);
        }
      }
    );
  }

  function printCurrentForecast(){
    $.getJSON(url, function (data) {
      // console.log(data); //obj->current->condition->icon
      let imageUrl = data.current.condition.icon;
      let epaIndex = data.current.air_quality["us-epa-index"];
      let airQualityText = "";
      switch (epaIndex) {
        case 1:
          airQualityText = "<td class='text-success'>Good</td>"; // green
          break;
        case 2:
          airQualityText = "<td class='text-warning'>Moderate</td>"; // yellow
          break;
        case 3:
          airQualityText =
            "<td class='text-orange'>Unhealthy for Sensitive   Groups</td>"; // orange (custom)
          break;
        case 4:
          airQualityText = "<td class='text-danger'>Unhealthy</td>"; // red
          break;
        case 5:
          airQualityText =
            "< class='text-danger fw-bold'>Very Unhealthy</  td>"; // dark red/bold
          break;
        case 6:
          airQualityText =
            "< class='text-dark bg-warning fw-bold'>Hazardous</  td>"; // black/yellow background
          break;
        default:
          airQualityText = "<td class='text-muted'>Unknown</td>";
      }

      $("#display-weather").append(`
                    <div class="d-flex justify-content-between mb-3">
                    <ul class="list-group">
                    <li class="list-group-item">CURRENT WEATHER</li>
                    
                    </ul>
                      <ul class="list-group">
                    <a href="index.html" class="btn btn-warning">Back</a>
                    </ul>

                    <ul class="list-group">
                    <li class="list-group-item">${data.location.localtime}</li>
                    </ul>
                  
                    </div>
                    <div class="d-flex flex-direction justify-content-between">
                   <div>
                    <img class=" d-inline-block" src='${imageUrl}' class=" pe-3"/>   
                    <h1 id="temp-header" class="h1 d-inline-block text-center">${data.current.temp_c}°C</h1>
                   </div>
                    <table class="table table-primary w-50 table-sm align-middle " >
                    <tr class="table-primary">

                    <th>RealFeel Shade</th>
                    <td>${data.current.feelslike_c}</td>

                    </tr>

                    

                    

                    <tr>
                    <th>Wind</th>
                    <td>WSW${data.current.wind_kph}</td>
                    </tr>
                    <tr>
                    <th>Wind Gusts</th>
                    <td>${data.current.gust_kph}</td>
                    </tr>
                    <tr>
                    <th>Air Quality</th>
                    ${airQualityText}

                    </tr>
                   <tr>
                    <th>Humidity</th>
                    <td>  ${data.current.humidity}</td>

                    </tr>
                      <tr>
                    <th>City</th>
                    <td>  ${localStorage.getItem('cityName')}</td>

                    </tr>

                   
                    
                    </table>
                    </div>
                    
                    </div>

                    
                    `);
    }).fail(() => {
      $("#display-weather").append(`
                            <ul class="list-group">
                            <li class="list-group-item list-group-item-danger">An Error Occurred , Please Check The Spelling.</li>
                            </ul>
                               <ul class="list-group">
                    <a href="index.html" class="btn btn-warning">Back</a>
                    </ul>

                            `);
    });
  }

  
  if (localStorage.getItem("cityName")) { 
    printCurrentForecast();
     printFutureForecast();
  }
});
