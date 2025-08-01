$(document).ready(function () {
  const weatherApiKey = "d76b7400abc34dffa40181822252007";
  const city = localStorage.getItem("cityName");
  const url = `http://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${encodeURIComponent(city)}&aqi=yes`;
  const next10Days = `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${encodeURIComponent(city)}&days=10`;

  let outputOfForecast = [];

  function printFutureForecast() {
    $.getJSON(next10Days, function (result) {
      outputOfForecast = result.forecast.forecastday;

      $('#display-weather').append(`
        <div id="forecast-div" class="mt-4 p-3 rounded-4 w-100">
          <div class="d-flex flex-wrap justify-content-between mb-3 gap-2">
            <div class="list-group">
              <div class="list-group-item fw-bold">Next 10 Days Forecasting</div>
            </div>
          </div>
          <div id="forecast-weather-grid" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 mt-2"></div>
        </div>
      `);

      for (let output of outputOfForecast) {
        $('#forecast-weather-grid').append(`
          <div class="col">
            <div class="bg-white p-3 rounded-3 h-100 d-flex flex-column">
              <div class="text-center mb-2 bg-warning rounded-3 p-2 inter-font fs-6">${output.date}</div>
              <div class="text-center mb-2">
                <img class="condition-img" src="${output.day.condition.icon}" alt="${output.day.condition.text}">
              </div>
              <div class="fs-6 inter-font mb-1 text-center oswad-font-medium">${output.day.condition.text}</div>
              <div class="fs-4 text-center h3 oswad-font mb-2">${output.day.avgtemp_c}°C</div>
              <div class="text-center mb-1">
                <img class="rain-chance-img" src="pngegg.png" alt="Chance of rain">
              </div>
              <div class="fs-5 text-center oswad-font-light">${output.day.daily_chance_of_rain}%</div>
            </div>
          </div>
        `);
      }
    });
  }

  function printCurrentForecast() {
    $.getJSON(url, function (data) {
      const imageUrl = data.current.condition.icon;
      const epaIndex = data.current.air_quality["us-epa-index"];
      let airQualityText = "";
      switch (epaIndex) {
        case 1:
          airQualityText = "<td class='text-success'>Good</td>";
          break;
        case 2:
          airQualityText = "<td class='text-warning'>Moderate</td>";
          break;
        case 3:
          airQualityText = "<td class='text-orange'>Unhealthy for Sensitive Groups</td>";
          break;
        case 4:
          airQualityText = "<td class='text-danger'>Unhealthy</td>";
          break;
        case 5:
          airQualityText = "<td class='text-danger fw-bold'>Very Unhealthy</td>";
          break;
        case 6:
          airQualityText = "<td class='bg-warning text-dark fw-bold'>Hazardous</td>";
          break;
        default:
          airQualityText = "<td class='text-muted'>Unknown</td>";
      }

      $("#display-weather").append(`
        <div class="d-flex flex-column flex-lg-row gap-3 mb-3">
          <div class="d-flex flex-column flex-grow-1 gap-2">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-2">
              <div class="list-group">
                <div class="list-group-item fw-bold">CURRENT WEATHER</div>
              </div>
              <div>
                <a href="index.html" class="btn btn-warning btn-sm">Back</a>
              </div>
              <div class="list-group">
                <div class="list-group-item">${data.location.localtime}</div>
              </div>
            </div>
            <div class="d-flex flex-column flex-md-row gap-4 align-items-start">
              <div class="d-flex align-items-center gap-3 flex-shrink-0">
                <div class="text-center">
                  <img class="condition-img" src="${imageUrl}" alt="condition icon">
                </div>
                <div>
                  <h1 id="temp-header" class="mb-0">${data.current.temp_c}°C</h1>
                  <div class="small text-muted">RealFeel: ${data.current.feelslike_c}°C</div>
                </div>
              </div>
              <div class="table-responsive flex-grow-1">
                <table class="table table-primary w-100 table-sm align-middle mb-0">
                  <tbody>
                    <tr>
                      <th>Wind</th>
                      <td>WSW ${data.current.wind_kph} km/h</td>
                    </tr>
                    <tr>
                      <th>Wind Gusts</th>
                      <td>${data.current.gust_kph} km/h</td>
                    </tr>
                    <tr>
                      <th>Air Quality</th>
                      ${airQualityText}
                    </tr>
                    <tr>
                      <th>Humidity</th>
                      <td>${data.current.humidity}%</td>
                    </tr>
                    <tr>
                      <th>City</th>
                      <td>${localStorage.getItem('cityName')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      `);
    }).fail(() => {
      $("#display-weather").append(`
        <div class="alert alert-danger">
          <div>An Error Occurred, Please Check The Spelling.</div>
          <div class="mt-2"><a href="index.html" class="btn btn-warning btn-sm">Back</a></div>
        </div>
      `);
    });
  }

  if (city) {
    printCurrentForecast();
    printFutureForecast();
  } else {
    $("#display-weather").append(`
      <div class="alert alert-warning d-flex flex-column align-items-start">
        <div class="mb-2">No city set.</div>
        <div><a href="index.html" class="btn btn-sm btn-warning">Go Back</a></div>
      </div>
    `);
  }
});
