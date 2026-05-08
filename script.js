
async function fetchData(){
    try {
        const location = document.getElementById("location").value.toLowerCase();
        const forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c27fdce7ad84430b8fa41655262604&q=${location}&days=2`)
        const history = await fetch(`https://api.weatherapi.com/v1/history.json?key=c27fdce7ad84430b8fa41655262604&q=${location}&dt=2024-06-01`)
        
        if(!forecast.ok || !history.ok){
            throw new Error("Could not fetch resource")
        }

        const forecastData = await forecast.json();
        const historyData = await history.json();

        // get the 24-hour arrays from each response 
        const yesterdayHours = historyData.forecast.forecastday[0].hour;
        const todayHours = forecastData.forecast.forecastday[0].hour;
        const tomorrowHours = forecastData.forecast.forecastday[1].hour;

        //combine them into one giant 72-hour array
        const allTime = [...yesterdayHours, ...todayHours, ...tomorrowHours];
        const localTimeStr = forecastData.current.last_updated;
        const nowIndex = parseInt(localTimeStr.split(' ')[1].split(':')[0]) + 24; // add 24 to account for yesterday's hours being at the start of the array

        // THE PAST: 24 hours leading up to now
        const past24 = allTime.slice(nowIndex - 24, nowIndex).map(hour => {
            return {
                time: hour.time,
                temp_c: hour.temp_c,
                wind_kph: hour.wind_kph,
                humidity: hour.humidity,
                condition: { text: hour.condition.text, icon: hour.condition.icon}
            };
        });

        // THE FUTURE: 24 hours starting from now
        const future24 = allTime.slice(nowIndex, nowIndex + 24).map(hour => {
            return {
                time: hour.time,
                temp_c: hour.temp_c,
                wind_kph: hour.wind_kph,
                chance_of_rain: hour.chance_of_rain,
                condition: { text: hour.condition.text, icon: hour.condition.icon }
            };
        });
      
        // 1. Target the HTML containers
        const pastContainer = document.getElementById("past-24-container");
        const futureContainer = document.getElementById("future-24-container");

        // 2. Clear them so old searches disappear
        pastContainer.innerHTML = "";
        futureContainer.innerHTML = "";

        // 3. Loop through PAST and "return" them to the screen
        past24.forEach(hour => {
            pastContainer.innerHTML += `
                <div class="min-w-[150px] bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                    <p class="font-bold text-gray-700">${hour.time.split(' ')[1]}</p>
                    <img src="https:${hour.condition.icon}" class="mx-auto">
                    <p class="text-xl font-bold">${hour.temp_c}°C</p>
                    <p class="text-xs text-gray-500">${hour.condition.text}</p>
                    <p class="text-xs text-blue-600">Wind: ${hour.wind_kph}kph</p>
                </div>
            `;
        });

        // 4. Loop through FUTURE and "return" them to the screen
        future24.forEach(hour => {
            futureContainer.innerHTML += `
                <div class="min-w-[150px] bg-orange-50 p-4 rounded-lg text-center border border-orange-100">
                    <p class="font-bold text-gray-700">${hour.time.split(' ')[1]}</p>
                    <img src="https:${hour.condition.icon}" class="mx-auto">
                    <p class="text-xl font-bold">${hour.temp_c}°C</p>
                    <p class="text-xs text-gray-500">${hour.condition.text}</p>
                    <p class="text-xs text-orange-600">Rain: ${hour.chance_of_rain}%</p>
                </div>
            `;
        });
        console.log("Past 24 hours:", past24);
        console.log("Future 24 hours:", future24);
        
    }catch(error){
        console.error(error)
    }
}
