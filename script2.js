$(document).ready(function () {
  let weatherApiKey = "d76b7400abc34dffa40181822252007";
  let url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${localStorage.getItem(
    "cityName"
  )}&aqi=yes`;

  let hourUrl = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${localStorage.getItem(
    "cityName"
  )}&days=10`;

  let outputOfForecast = [];

  if (localStorage.getItem("cityName")) {
    $.getJSON(
      `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${localStorage.getItem(
        "cityName"
      )}&days=10`,
      function (result) {
        console.log("forecast");

        console.log(result.forecast.forecastday);
        result.forecast.forecastday = outputOfForecast;
      }
    );
    $.getJSON(url, function (data) {
      console.log(data); //obj->current->condition->icon
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
                    <li class="list-group-item">${data.location.localtime}</li>
                    </ul>
                    </div>
                    <div class="d-flex flex-direction justify-content-between">
                   <div>
                    <img class=" d-inline-block" src='${imageUrl}' class=" pe-3"/>   
                    <h1 id="temp-header" class="h1 d-inline-block text-center">${data.current.temp_c}°C</h1>
                   </div>
                    <table class="table table-primary w-50 table-sm align-middle " cellpadding="10">
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
                    
                    </table>
                    </div>
                    
                    </div>

                    
                    `);
    }).fail(() => {
      $("#display-weather").append(`
                            <ul class="list-group">
                            <li class="list-group-item list-group-item-danger">An Error Occurred , Please Check The Spelling.</li>
                            </ul>
                            `);
    });
  }
});

// <ul class="list-group">
//                     // <li class="list-group-item">
//                     // Location Name – ${data.location.name}</li>
//                     // <li class="list-group-item">
//                     // Date – ${data.location.localtime}</li>
//                     // <li class="list-group-item">
//                     // Weather Type – ${data.current.condition.text}
//                     // </li>

//                     // <li class="list-group-item">Temperature – ${data.current.temp_c}°C</li>

//                     // </ul>
