let array = [];

$(document).ready(function(){
    const geoKey = `86063e3b946234cce4426744a6abb72f`;
   
    const searchBtn = $("#search");
    const city = $("#city");
    

    searchBtn.on('click',function(event){
        event.preventDefault();
        let citySearch = city.val();
        let geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&appid=${geoKey}`;

        $.ajax({
            method: 'GET',
            url: geoUrl
        }).then(function(response){
            city.val('');
            
            console.log(response);
            let lat = response[0].lat;
            let lon = response[0].lon;
            const cityListItem = $("<li>").attr("id", "cityListItem")
            cityListItem.attr("class", "mt-2");
            const input = $('<input>').attr("type", "button");
            input.attr("value", citySearch);
            input.attr("id", "storageItem");
            cityListItem.append(input);
            $("#cityList").append(cityListItem);
            
            array.push(citySearch);
            localStorage.setItem("Cities", JSON.stringify(array));

            const oneCallKey = `742fafd71154e9ffb3d97a50d911c2a6`
            let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${oneCallKey}`

            $.ajax({
                method: 'GET',
                url: oneCallUrl

            }).then(function(response){
                console.log(response);
                let currentDate  = moment().format("MM/DD/YYYY");
                const cityName = $("#cityName");
                cityName.text(`City: ${citySearch} ${currentDate}`);
                const temp = $("#temp");
                let temperature = response.current.temp;
                temp.text(`Temp: ${temperature}\xB0F`)
                const wind = $("#wind");
                let windSpeed = response.current.wind_speed;
                wind.text(`Wind: ${windSpeed} MPH`);
                const humidity = $("#humidity");
                let humid = response.current.humidity;
                humidity.text(`Humidity: ${humid}%`);
                const uvi = $("#uvIndex");
                let uvIndex = response.current.uvi;
                uvi.text(`UV Index: ${uvIndex}`);

                if(uvIndex <= 2){
                    uvi.css("background-color", "#ADFF2F");
                }else if(uvIndex >= 3 && uvIndex <= 5){
                    uvi.css("background-color", "yellow");
                }else if(uvIndex >= 6 && uvIndex <= 7){
                    uvi.css("background-color", "orange");
                }else if(uvIndex >= 8 && uvIndex <= 10){
                    uvi.css("background-color", "red");
                }else{
                    uvi.css("background-color", "purple");
                }
            })
        })
    })
})
