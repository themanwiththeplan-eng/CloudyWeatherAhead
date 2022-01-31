let array = [];
// const div = $("<div>").attr("class", "card-body");
// const p = $("<p>");
// const p1 = $("<p>");
// const p2 = $("<p>");
// const cardOne = $("#cardOne")
// const cardTwo = $("#cardTwo")
// const cardThree = $("#cardThree")
// const cardFour = $("#cardFour")
// const cardFive = $("#cardFive")

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
            input.attr("class", "storageItem");
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
                let icon = response.current.weather[0].icon;
                cityName.text(`City: ${citySearch} ${currentDate} ${icon}`);
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
                // fix logic of for loop tomorrow
                // for(let i = 0; i < 5; i++){
                //     p;
                //     p1;
                //     p2;
                //     let dailyTemp = response.daily[i].temp.day;
                //     let dailyWind = response.daily[i].wind_speed;
                //     let dailyHumid = response.daily[i].humidity;
                //     p.text(`Temp: ${dailyTemp}\xB0F`);
                //     p1.text(`Wind: ${dailyWind}`);
                //     p2.text(`Humidity: ${dailyHumid}`);
                //     div;
                //     div.append(p);
                //     div.append(p1);
                //     div.append(p2);
                    
                // }

                function cardOne(){
                    let oneDayForward = new moment().add(1, "day");
                    const dateOne = $("<p>")
                    const cardOne = $("#cardOne")
                    cardOne.empty();
                    cardOne.append(dateOne);
                    dateOne.text(oneDayForward.format("MM/DD/YYYY"))
                    const p = $("<p>");
                    const p1 = $("<p>");
                    const p2 = $("<p>");
                    let tempOne = response.daily[0].temp.day;
                    let windOne = response.daily[0].wind_speed;
                    let humidOne = response.daily[0].humidity;
                    p.text(`Temp: ${tempOne}\xB0F`)
                    p1.text(`Wind: ${windOne} MPH`)
                    p2.text(`Humidity: ${humidOne}%`)
                    cardOne.append(p)
                    cardOne.append(p1)
                    cardOne.append(p2)
                    }
                    function cardTwo(){
                        const cardTwo = $("#cardTwo")
                        cardTwo.empty();
                        let twoDayForward = new moment().add(2, "day");
                        const dateTwo = $("<p>")
                        dateTwo.text(twoDayForward.format("MM/DD/YYYY"))
                        cardTwo.append(dateTwo);
                        const p = $("<p>");
                        const p1 = $("<p>");
                        const p2 = $("<p>");
                        let tempTwo = response.daily[1].temp.day;
                        let windTwo = response.daily[1].wind_speed;
                        let humidTwo = response.daily[1].humidity;
                        p.text(`Temp: ${tempTwo}\xB0F`)
                        p1.text(`Wind: ${windTwo} MPH`)
                        p2.text(`Humidity: ${humidTwo}%`)
                        cardTwo.append(p)
                        cardTwo.append(p1)
                        cardTwo.append(p2)
                        }
                        function cardThree(){
                            const cardThree = $("#cardThree")
                            cardThree.empty();
                            let threeDayForward = new moment().add(3, "day");
                            const dateThree = $("<p>")
                            dateThree.text(threeDayForward.format("MM/DD/YYYY"))
                            cardThree.append(dateThree);
                            const p = $("<p>");
                            const p1 = $("<p>");
                            const p2 = $("<p>");
                            let tempTwo = response.daily[2].temp.day;
                            let windTwo = response.daily[2].wind_speed;
                            let humidTwo = response.daily[2].humidity;
                            p.text(`Temp: ${tempTwo}\xB0F`)
                            p1.text(`Wind: ${windTwo} MPH`)
                            p2.text(`Humidity: ${humidTwo}%`)
                            cardThree.append(p)
                            cardThree.append(p1)
                            cardThree.append(p2)
                            }
                            function cardFour(){
                                const cardFour = $("#cardFour")
                                cardFour.empty();
                                let fourDayForward = new moment().add(4, "day");
                                const dateFour = $("<p>")
                                dateFour.text(fourDayForward.format("MM/DD/YYYY"))
                                cardFour.append(dateFour);
                                const p = $("<p>");
                                const p1 = $("<p>");
                                const p2 = $("<p>");
                                let tempTwo = response.daily[3].temp.day;
                                let windTwo = response.daily[3].wind_speed;
                                let humidTwo = response.daily[3].humidity;
                                p.text(`Temp: ${tempTwo}\xB0F`)
                                p1.text(`Wind: ${windTwo} MPH`)
                                p2.text(`Humidity: ${humidTwo}%`)
                                cardFour.append(p)
                                cardFour.append(p1)
                                cardFour.append(p2)
                                }
                                function cardFive(){
                                    const cardFive = $("#cardFive")
                                    cardFive.empty();
                                    let fiveDayForward = new moment().add(5, "day");
                                    const dateFive = $("<p>")
                                    dateFive.text(fiveDayForward.format("MM/DD/YYYY"))
                                    cardFive.append(dateFive);
                                    const p = $("<p>");
                                    const p1 = $("<p>");
                                    const p2 = $("<p>");
                                    let tempTwo = response.daily[4].temp.day;
                                    let windTwo = response.daily[4].wind_speed;
                                    let humidTwo = response.daily[4].humidity;
                                    p.text(`Temp: ${tempTwo}\xB0F`)
                                    p1.text(`Wind: ${windTwo} MPH`)
                                    p2.text(`Humidity: ${humidTwo}%`)
                                    cardFive.append(p)
                                    cardFive.append(p1)
                                    cardFive.append(p2)
                                    }
                            
                   searchBtn.on('click', cardOne());
                   searchBtn.on('click', cardTwo());
                   searchBtn.on('click', cardThree());
                   searchBtn.on('click', cardFour());
                   searchBtn.on('click', cardFive());
                
            
                
            })
        })
    })
    
    function getItem(){
        let cities = JSON.parse(localStorage.getItem("Cities"));
        
        if(localStorage.length == 0){
            return;
        }else{
            for(let i = 0; i < cities.length; i++){
                console.log(cities[i]);
                const cityListItem = $("<li>");
                var input = $("<input>").attr("type", "button");
                input.attr("value", cities[i]);
                cityListItem.append(input);
                cityListItem.attr("class", "mt-2");
                input.attr("class", "clickable")
                $("#cityList").append(cityListItem);
        }
        }
        $(".clickable").on('click', function(){
            city.val(input.val());
            searchBtn.click();
        })
    }
    $().ready(getItem);
})
