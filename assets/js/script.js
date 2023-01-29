
const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '4ca9ff52ffd17a2162dae823c2bccb43';
// 1. TODO: Style the current HTML

// .val() => get if no parameter passed e.g. val()
//        => set if 1 parameter passed e.g. val('input')
$('#search-form').on('submit', function(event) {
    event.preventDefault();

    const userInput = $('#search-input').val();
    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey;
    // 1.5 put the search value on the history list
    // TODO: prepend the value to the list container

    // 5. Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    // 2. Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({ url: queryUrl })
        .then(function(response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

            // 3. Call 5 day weather forecast API after we have city lat and long value
            $.ajax({ url: weatherQueryUrl })
                .then(function(weatherResponse) {
                    // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"
                    // 4. Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Now forecast
                    const today = weatherList[0];
                    console.log(today);
                     // a. TODO: put today's weather in container for today's weather

                    // 5 days forecast
                    for (let i = 1; i < weatherList.length; i += 8) {
                        const weather = weatherList[i];
                        console.log(weather);
                        // b. TODO: put 5 day's forecast weather in container for the forecast
                    }
                });
        });
});