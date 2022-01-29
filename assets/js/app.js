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
            let oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${oneCallKey}`

            $.ajax({
                method: 'GET',
                url: oneCallUrl

            }).then(function(response){
                console.log(response);
            })
        })
    })
})
